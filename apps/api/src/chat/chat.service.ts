import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { randomUUID } from 'crypto';
import { LeadsService } from '../leads/leads.service';
import { MailService } from '../mail/mail.service';
import type { ChatMessage, ExtractedLeadData } from './dto/chat.dto';
import type { CreateLeadInput } from '../leads/types/lead.types';

interface ConversationSession {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
  extractedData?: Partial<ExtractedLeadData>;
  leadSubmitted?: boolean;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly client: OpenAI | null;
  private readonly model: string;
  private readonly enabled: boolean;
  private readonly sessions: Map<string, ConversationSession> = new Map();
  private readonly sessionTTL: number;

  constructor(
    private readonly leadsService: LeadsService,
    private readonly mailService: MailService,
  ) {
    const apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini';
    this.enabled = process.env.CHAT_ENABLED !== 'false' && !!apiKey;
    this.client = apiKey ? new OpenAI({ apiKey }) : null;
    this.sessionTTL = Number(process.env.CHAT_SESSION_TTL ?? 3600) * 1000;

    if (!this.enabled) {
      this.logger.warn('Chat disabled (set OPENAI_API_KEY and CHAT_ENABLED!=false to enable)');
    }

    // Cleanup expired sessions every 10 minutes
    setInterval(() => this.cleanupExpiredSessions(), 10 * 60 * 1000);
  }

  get isEnabled(): boolean {
    return this.enabled;
  }

  createSession(): string {
    const sessionId = randomUUID();
    const session: ConversationSession = {
      sessionId,
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date(),
    };
    this.sessions.set(sessionId, session);
    this.logger.log(`Created chat session: ${sessionId}`);
    return sessionId;
  }

  getSession(sessionId: string): ConversationSession | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const age = Date.now() - session.lastActivity.getTime();
    if (age > this.sessionTTL) {
      this.sessions.delete(sessionId);
      return null;
    }

    return session;
  }

  async sendMessage(
    sessionId: string,
    userMessage: string,
    conversationHistory?: ChatMessage[],
  ): Promise<{
    message: string;
    sessionId: string;
    shouldShowCalendly: boolean;
    shouldCollectLead: boolean;
    estimateSent?: boolean;
    extractedData?: Partial<ExtractedLeadData>;
  }> {
    if (!this.enabled || !this.client) {
      return {
        message: 'Chat is currently unavailable. Please use our contact form or call us directly.',
        sessionId,
        shouldShowCalendly: false,
        shouldCollectLead: false,
      };
    }

    let session = this.getSession(sessionId);
    if (!session) {
      sessionId = this.createSession();
      session = this.getSession(sessionId)!;
    }

    // Add user message to history
    session.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });
    session.lastActivity = new Date();

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        temperature: 0.7,
        messages: [
          { role: 'system', content: this.getSystemPrompt() },
          ...session.messages.map(m => ({ role: m.role, content: m.content })),
        ],
      });

      let assistantMessage = completion.choices[0]?.message?.content ?? 
        'I apologize, but I encountered an issue. Please try again.';

      session.messages.push({
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date().toISOString(),
      });

      // Check if we should extract data or show Calendly
      const shouldShowCalendly = this.shouldShowCalendly(assistantMessage, userMessage);
      const { shouldCollect, extractedData } = await this.tryExtractLeadData(session);

      if (extractedData) {
        session.extractedData = { ...session.extractedData, ...extractedData };
      }

      // Auto-submit lead + notify admin when customer wants an estimate and we have enough data
      let estimateSent = false;
      const wantsEstimate = this.wantsEstimate(userMessage, assistantMessage, session);
      const merged = session.extractedData ?? {};
      const canSubmit =
        !session.leadSubmitted &&
        wantsEstimate &&
        !!merged.email &&
        !!merged.projectType;

      if (canSubmit) {
        const result = await this.completeChat(sessionId, this.normalizeLeadData(merged, session));
        estimateSent = result.success;
        if (estimateSent) {
          assistantMessage =
            `Thank you! I've sent your requirements to our team and a detailed estimate to ${merged.email}. ` +
            `You'll hear from us shortly. If you'd like to schedule a call instead, just say the word.`;
          return {
            message: assistantMessage,
            sessionId,
            shouldShowCalendly: false,
            shouldCollectLead: false,
            estimateSent: true,
            extractedData: merged,
          };
        }
      }

      return {
        message: assistantMessage,
        sessionId,
        shouldShowCalendly,
        shouldCollectLead: shouldCollect,
        estimateSent,
        extractedData: session.extractedData,
      };
    } catch (err) {
      this.logger.error(`Chat error: ${(err as Error).message}`);
      return {
        message: 'I encountered a technical issue. Please refresh and try again, or contact us directly.',
        sessionId,
        shouldShowCalendly: false,
        shouldCollectLead: false,
      };
    }
  }

  async completeChat(sessionId: string, extractedData: ExtractedLeadData): Promise<{ success: boolean; leadId?: string }> {
    const session = this.getSession(sessionId);
    if (!session) {
      this.logger.warn(`Attempted to complete non-existent session: ${sessionId}`);
      return { success: false };
    }

    if (session.leadSubmitted) {
      return { success: true };
    }

    try {
      const normalized = this.normalizeLeadData(extractedData, session);

      const leadInput: CreateLeadInput = {
        fullName: normalized.fullName,
        email: normalized.email,
        phone: normalized.phone,
        companyName: normalized.companyName,
        projectType: normalized.projectType,
        description: normalized.description,
        features: normalized.features ?? [],
        timeline: normalized.timeline ?? 'Standard: 3-5 weeks',
        budgetRange: normalized.budgetRange,
        source: 'chat',
      };

      const { lead } = await this.leadsService.create(leadInput);
      session.leadSubmitted = true;

      // Email admin a clear requirements summary from the chat
      const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;
      if (adminEmail) {
        const conversationSummary = this.buildConversationSummary(session);
        void this.mailService
          .sendChatLeadSummary({
            adminEmail,
            clientName: leadInput.fullName,
            clientEmail: leadInput.email,
            clientPhone: leadInput.phone,
            companyName: leadInput.companyName,
            projectType: leadInput.projectType,
            description: leadInput.description,
            features: leadInput.features,
            timeline: leadInput.timeline,
            budgetRange: leadInput.budgetRange,
            conversationSummary,
            leadId: lead.id,
          })
          .catch((err) =>
            this.logger.error(`Failed to send chat lead summary: ${(err as Error).message}`),
          );
      }

      this.logger.log(`Lead created from chat session ${sessionId}: ${lead.id}`);
      this.sessions.delete(sessionId);

      return { success: true, leadId: lead.id };
    } catch (err) {
      this.logger.error(`Failed to complete chat: ${(err as Error).message}`);
      return { success: false };
    }
  }

  private wantsEstimate(
    userMessage: string,
    assistantMessage: string,
    session: ConversationSession,
  ): boolean {
    const user = userMessage.toLowerCase();
    const assistant = assistantMessage.toLowerCase();
    const recentText = session.messages
      .slice(-6)
      .map((m) => m.content.toLowerCase())
      .join(' ');

    const userAsksEstimate =
      user.includes('estimate') ||
      user.includes('quotation') ||
      user.includes('quote') ||
      /[c]\)\s*just send/i.test(user) ||
      user.includes('send me a detailed') ||
      (user.includes('via email') && recentText.includes('estimate'));

    const estimateDiscussed =
      recentText.includes('estimate') ||
      recentText.includes('quotation') ||
      (assistant.includes('estimate') &&
        (assistant.includes('email') || assistant.includes('send')));

    // Trigger when user just provided an email after estimate was discussed
    const looksLikeEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(userMessage);

    return userAsksEstimate || (looksLikeEmail && estimateDiscussed);
  }

  private normalizeLeadData(
    data: Partial<ExtractedLeadData>,
    session: ConversationSession,
  ): ExtractedLeadData {
    const email = (data.email ?? '').trim();
    const nameFromEmail = email.includes('@') ? email.split('@')[0] : 'Chat Visitor';

    // Build a description from chat if AI didn't extract one
    const userBits = session.messages
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .join(' | ');

    return {
      fullName: (data.fullName ?? nameFromEmail).trim() || 'Chat Visitor',
      email,
      phone: (data.phone ?? 'Not provided').trim() || 'Not provided',
      projectType: (data.projectType ?? 'Custom Software').trim(),
      description: (data.description ?? userBits).trim() || 'Requirements gathered via chat',
      features: data.features ?? [],
      timeline: data.timeline ?? 'Standard: 3-5 weeks',
      budgetRange: data.budgetRange,
      companyName: data.companyName,
    };
  }

  private buildConversationSummary(session: ConversationSession): string {
    return session.messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-16)
      .map((m) => `${m.role === 'user' ? 'Customer' : 'Codeebe'}: ${m.content}`)
      .join('\n\n');
  }

  private async tryExtractLeadData(
    session: ConversationSession,
  ): Promise<{ shouldCollect: boolean; extractedData?: Partial<ExtractedLeadData> }> {
    if (!this.client) return { shouldCollect: false };

    // Pull email out of the latest user message even on short chats
    const lastUser = [...session.messages].reverse().find((m) => m.role === 'user');
    const emailMatch = lastUser?.content.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
    const heuristic: Partial<ExtractedLeadData> = {};
    if (emailMatch) {
      heuristic.email = emailMatch[0];
      const local = emailMatch[0].split('@')[0];
      if (local) heuristic.fullName = local.replace(/[._0-9]+/g, ' ').trim() || local;
    }

    // Only try AI extraction if we have enough conversation
    if (session.messages.length < 4) {
      const merged = { ...session.extractedData, ...heuristic };
      return {
        shouldCollect: !!(merged.email && merged.projectType),
        extractedData: Object.keys(heuristic).length ? merged : undefined,
      };
    }

    try {
      const extractionPrompt = `Based on this conversation, extract the following information as JSON if available:
{
  "fullName": string or null,
  "email": string or null,
  "phone": string or null,
  "projectType": string or null,
  "description": string or null,
  "features": string[] or null,
  "timeline": string or null,
  "budgetRange": string or null,
  "companyName": string or null
}

Infer projectType from context (e.g. clothing store -> E-Commerce). Return ONLY the JSON object. Use null for missing information.`;

      const completion = await this.client.chat.completions.create({
        model: this.model,
        temperature: 0.3,
        response_format: { type: 'json_object' },
        messages: [
          ...session.messages.slice(-12).map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: extractionPrompt },
        ],
      });

      const extracted = JSON.parse(completion.choices[0]?.message?.content ?? '{}') as Partial<ExtractedLeadData>;
      const merged = {
        ...session.extractedData,
        ...Object.fromEntries(
          Object.entries(extracted).filter(([, v]) => v != null && v !== ''),
        ),
        ...heuristic,
      } as Partial<ExtractedLeadData>;

      // Enough to notify the team: email + project type
      const hasMinimumData = !!(merged.email && merged.projectType);

      return {
        shouldCollect: hasMinimumData,
        extractedData: merged,
      };
    } catch (err) {
      this.logger.error(`Data extraction failed: ${(err as Error).message}`);
      const merged = { ...session.extractedData, ...heuristic };
      return {
        shouldCollect: !!(merged.email && merged.projectType),
        extractedData: Object.keys(merged).length ? merged : undefined,
      };
    }
  }

  private shouldShowCalendly(assistantMessage: string, userMessage: string): boolean {
    // Only show Calendly if user explicitly confirms they want to schedule
    const userLower = userMessage.toLowerCase();
    const explicitScheduleIntent = 
      (userLower.includes('yes') || userLower.includes('sure') || userLower.includes('ok')) &&
      (userLower.includes('schedule') || userLower.includes('call') || userLower.includes('meeting'));
    
    // Or if assistant explicitly asks and provides the option
    const assistantOffersScheduling = 
      assistantMessage.toLowerCase().includes('schedule a') &&
      assistantMessage.toLowerCase().includes('discovery call');
    
    return explicitScheduleIntent || (assistantOffersScheduling && userLower.includes('yes'));
  }

  private getSystemPrompt(): string {
    return `You are a friendly sales consultant for Codeebe, a premium product engineering studio in India.

Your goal: Qualify leads and gather project requirements conversationally through a structured approach.

CONVERSATION FLOW (follow this order):

**Phase 1: Initial Discovery (2-3 messages)**
- Start with a warm greeting
- Ask what type of project they're building (offer multiple choice if helpful)
- Get a brief overview of their vision

**Phase 2: Requirements Gathering (3-5 messages)**
Ask project-specific questions based on their type:

For E-Commerce:
- Platform preference? (a) Custom-built (b) Shopify (c) WooCommerce (d) Other
- Approximate number of products?
- Payment gateways needed? (Razorpay, Stripe, PayPal)
- Multi-vendor marketplace or single seller?

For SaaS/Web Apps:
- Main features needed? (present as options if possible)
- User authentication required?
- Admin dashboard needed?
- Any third-party integrations?

For WordPress:
- New site or redesign?
- Page builder preference? (a) Elementor (b) Custom theme (c) Other
- WooCommerce needed?

For Mobile Apps:
- Platform? (a) iOS only (b) Android only (c) Both
- Key features? (list 3-4 common ones as options)
- Push notifications needed?

**Phase 3: Timeline & Budget**
- Timeline: (a) Urgent: 1-2 weeks (b) Standard: 3-5 weeks (c) Flexible: 6+ weeks
- Budget range (optional): Below ₹25k, ₹25k-₹50k, ₹50k-₹1L, ₹1L-₹3L, ₹3L+

**Phase 4: Contact Details**
- Full name
- Email address
- Phone number
- Company name (optional)

**Phase 5: Meeting Type Selection**
After gathering all info, ask:
"Perfect! I have everything I need. Would you prefer:
a) A developer consultation (technical discussion about your project)
b) A team meeting (discuss scope, pricing, and timeline)
c) Just send me a detailed estimate via email"

ONLY if they choose option (a) or (b), mention scheduling a discovery call.

Conversation guidelines:
- Warm, professional, consultative tone
- When presenting multiple choice options, ALWAYS format them on SEPARATE LINES exactly like this:
  a) First option
  b) Second option
  c) Third option
  d) Fourth option
  IMPORTANT: Use lowercase letter + closing parenthesis + space, then the option text. Each option on a new line.
- Ask 1-2 questions at a time (max 2 questions per message)
- Show genuine interest
- Use their name once you know it
- Suggest relevant packages: Web Development (₹45k+), E-Commerce (₹95k+), All Services (₹2.5L+)

CRITICAL: Do NOT mention scheduling or Calendly until Phase 5, and ONLY if they choose a meeting option.

Be natural and conversational while following this structure. The goal is to understand their needs before jumping to next steps.`;
  }

  private cleanupExpiredSessions(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [sessionId, session] of this.sessions.entries()) {
      const age = now - session.lastActivity.getTime();
      if (age > this.sessionTTL) {
        this.sessions.delete(sessionId);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.logger.log(`Cleaned up ${cleaned} expired chat sessions`);
    }
  }
}
