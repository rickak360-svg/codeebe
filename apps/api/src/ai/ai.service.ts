import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import type { CreateLeadInput, EstimateResult } from '../leads/types/lead.types';
import type { MarketComparison, SRSDocument } from '../leads/srs.generator';

export interface AiQuotationResult {
  srs: SRSDocument;
  marketComparison: MarketComparison;
  estimate: EstimateResult;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: OpenAI | null;
  private readonly model: string;
  private readonly enabled: boolean;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
    this.enabled = process.env.AI_ENABLED !== 'false' && !!apiKey;
    this.client = apiKey ? new OpenAI({ apiKey }) : null;

    if (!this.enabled) {
      this.logger.log(
        'AI generation disabled (set OPENAI_API_KEY and AI_ENABLED!=false to enable). Using template fallback.',
      );
    }
  }

  get isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Generate an AI-tailored SRS, market comparison, and enriched estimate copy.
   * Price range (min/max) is kept from the rule-based base estimate so the
   * emailed figures and the quotation page never disagree. Returns null on any
   * failure so the caller can fall back to the template generators.
   */
  async generateQuotation(
    input: CreateLeadInput,
    base: EstimateResult,
  ): Promise<AiQuotationResult | null> {
    if (!this.enabled || !this.client) {
      return null;
    }

    const cleanDescription = input.description
      .replace(/\[Tech:[^\]]+\]\n?/, '')
      .replace(/\[Other feature:[^\]]+\]\n?/, '')
      .trim();
    const techHint =
      input.description.match(/\[Tech: ([^\]]+)\]/)?.[1] ?? 'No preference';

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        temperature: 0.5,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: this.systemPrompt() },
          {
            role: 'user',
            content: JSON.stringify({
              projectType: input.projectType,
              description: cleanDescription,
              features: input.features ?? [],
              timeline: input.timeline,
              techPreference: techHint,
              budgetRange: input.budgetRange ?? 'Not specified',
              priceRangeInr: { min: base.minPrice, max: base.maxPrice },
            }),
          },
        ],
      });

      const raw = completion.choices[0]?.message?.content;
      if (!raw) return null;

      const parsed = JSON.parse(raw) as {
        srs?: Partial<SRSDocument>;
        marketComparison?: MarketComparison;
        estimate?: Pick<
          EstimateResult,
          'summary' | 'notes' | 'marketComparisonNote'
        >;
      };

      if (!parsed.srs || !parsed.marketComparison || !parsed.estimate) {
        this.logger.warn('AI response missing required sections — falling back.');
        return null;
      }

      const srs: SRSDocument = {
        title: `Software Requirements Specification — ${input.projectType}`,
        version: '1.0',
        generatedAt: new Date().toISOString(),
        client: {
          name: input.fullName,
          email: input.email,
          phone: input.phone,
        },
        overview: parsed.srs.overview ?? cleanDescription,
        scope: parsed.srs.scope ?? { included: [], outOfScope: [] },
        functionalRequirements: parsed.srs.functionalRequirements ?? [],
        nonFunctionalRequirements: parsed.srs.nonFunctionalRequirements ?? [],
        techStack:
          parsed.srs.techStack ?? {
            frontend: 'Next.js + Tailwind CSS',
            backend: 'Node.js / NestJS',
            database: 'PostgreSQL',
            hosting: 'Vercel + Railway',
          },
        phases: parsed.srs.phases ?? [],
        deliverables: parsed.srs.deliverables ?? [],
        assumptions: parsed.srs.assumptions ?? [],
      };

      const estimate: EstimateResult = {
        ...base,
        summary: parsed.estimate.summary || base.summary,
        notes:
          Array.isArray(parsed.estimate.notes) && parsed.estimate.notes.length
            ? parsed.estimate.notes
            : base.notes,
        marketComparisonNote:
          parsed.estimate.marketComparisonNote || base.marketComparisonNote,
      };

      this.logger.log(`AI quotation generated for ${input.projectType}`);
      return { srs, marketComparison: parsed.marketComparison, estimate };
    } catch (err) {
      this.logger.error(
        `AI quotation generation failed — using template fallback: ${(err as Error).message}`,
      );
      return null;
    }
  }

  private systemPrompt(): string {
    return [
      'You are a senior solutions architect at Codeebe, a premium product-engineering studio in India.',
      'Given a client project brief (JSON), produce a tailored, professional quotation as STRICT JSON.',
      'All prices are in Indian Rupees (INR). Use the provided priceRangeInr as the cost basis — do NOT invent different totals.',
      'Be specific to the client description and selected features; avoid generic filler.',
      '',
      'Return a JSON object with EXACTLY these top-level keys: "srs", "marketComparison", "estimate".',
      '',
      '"srs": {',
      '  "overview": string (2-4 sentences tailored to the brief),',
      '  "scope": { "included": string[], "outOfScope": string[] },',
      '  "functionalRequirements": [{ "id": "FR-01", "title": string, "description": string, "priority": "High"|"Medium"|"Low" }],',
      '  "nonFunctionalRequirements": [{ "category": string, "requirement": string }],',
      '  "techStack": { "frontend": string, "backend": string, "database": string, "hosting": string },',
      '  "phases": [{ "phase": number, "name": string, "duration": string, "deliverables": string[] }],',
      '  "deliverables": string[],',
      '  "assumptions": string[]',
      '}',
      '',
      '"marketComparison": {',
      '  "summary": string,',
      '  "competitors": [{ "name": string, "priceRange": string, "timeline": string, "highlights": string[], "gaps": string[] }],',
      '  "codeebe": { "priceRange": string, "timeline": string, "highlights": string[] },',
      '  "whyCodeebe": string[]',
      '}',
      'Include at least two competitor archetypes (e.g. freelancer marketplace and large IT agency). Codeebe.priceRange must reflect priceRangeInr.',
      '',
      '"estimate": {',
      '  "summary": string (one tailored sentence),',
      '  "notes": string[] (3-5 concise, relevant notes),',
      '  "marketComparisonNote": string',
      '}',
      '',
      'Output ONLY the JSON object, no markdown, no commentary.',
    ].join('\n');
  }
}
