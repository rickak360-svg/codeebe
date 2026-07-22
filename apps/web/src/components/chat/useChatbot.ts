import { useState, useEffect, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

interface ExtractedLeadData {
  fullName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  description?: string;
  features?: string[];
  timeline?: string;
  budgetRange?: string;
  companyName?: string;
}

interface ChatResponse {
  message: string;
  sessionId: string;
  shouldShowCalendly?: boolean;
  shouldCollectLead?: boolean;
  extractedData?: ExtractedLeadData;
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showCalendly, setShowCalendly] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedLeadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const isOpenRef = useRef(isOpen);
  
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/chat/session`, {
        method: 'GET',
      });
      
      if (!response.ok) throw new Error('Failed to create session');
      
      const data = await response.json();
      setSessionId(data.sessionId);
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hi! 👋 I'm here to help you bring your project to life. What are you looking to build?",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    } catch (err) {
      console.error('Failed to initialize chat:', err);
      setError('Chat is currently unavailable. Please try again later.');
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !sessionId) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: text.trim(),
          conversationHistory: messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data: ChatResponse = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (data.shouldShowCalendly) {
        setShowCalendly(true);
      }

      if (data.extractedData) {
        setExtractedData(data.extractedData);
      }

      // Increment unread if chat is closed
      if (!isOpenRef.current) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again.');
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an issue. Please try again or contact us directly at support@codeebe.com',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [sessionId, messages]);

  const triggerEstimate = useCallback(async () => {
    if (!extractedData || !sessionId) {
      setError('Please provide your contact details first.');
      return;
    }

    // Validate required fields
    if (!extractedData.fullName || !extractedData.email || !extractedData.phone || !extractedData.projectType) {
      setError('Missing required information. Please continue the conversation to provide all details.');
      return;
    }

    setIsTyping(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/chat/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          extractedData,
        }),
      });

      if (!response.ok) throw new Error('Failed to create estimate');

      const data = await response.json();

      const successMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.message || 'Perfect! Check your email for a detailed estimate.',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, successMessage]);
    } catch (err) {
      console.error('Failed to create estimate:', err);
      setError('Failed to send estimate. Please try our contact form.');
      
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I had trouble sending your estimate. Please use our contact form or email support@codeebe.com',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [extractedData, sessionId]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setShowCalendly(false);
    setExtractedData(null);
    setError(null);
    initializeSession();
  }, []);

  return {
    isOpen,
    messages,
    isTyping,
    sessionId,
    unreadCount,
    showCalendly,
    extractedData,
    error,
    sendMessage,
    toggleChat,
    resetChat,
    triggerEstimate,
    setShowCalendly,
  };
}
