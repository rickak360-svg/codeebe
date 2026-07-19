import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from './useChatbot';
import { McqOptions, parseMcqOptions } from './McqOptions';
import { ContactDetailsForm, isAskingForContactDetails } from './ContactDetailsForm';

interface ChatMessageProps {
  message: ChatMessageType;
  isLast: boolean;
  onSelectOption?: (option: string) => void;
  onSubmitContact?: (data: any) => void;
  isTyping?: boolean;
}

export function ChatMessage({ message, isLast, onSelectOption, onSubmitContact, isTyping }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  // Parse MCQ options from assistant messages
  const mcqOptions = !isUser && !isSystem ? parseMcqOptions(message.content) : null;
  
  // Debug logging
  if (!isUser && !isSystem && mcqOptions) {
    console.log('MCQ Options detected:', mcqOptions);
    console.log('isLast:', isLast, 'onSelectOption:', !!onSelectOption);
  }
  
  // Check if asking for contact details
  const showContactForm = !isUser && !isSystem && isLast && isAskingForContactDetails(message.content);

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center px-4 py-2"
      >
        <span className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-center text-[11px] text-white/40">
          {message.content}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex px-4 py-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[80%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? 'bg-[#ff6b00]/[0.12] text-white shadow-sm'
              : 'border border-white/[0.06] bg-[#111] text-white/90'
          }`}
        >
          <MessageContent content={message.content} mcqOptions={mcqOptions} />
        </div>
        
        {/* Show contact form if asking for contact details */}
        {showContactForm && onSubmitContact && (
          <div className="mt-2 w-full">
            <ContactDetailsForm 
              onSubmit={onSubmitContact}
              disabled={isTyping}
            />
          </div>
        )}
        
        {/* Show MCQ options below the message if present and not showing contact form */}
        {!showContactForm && mcqOptions && mcqOptions.length > 0 && onSelectOption && isLast && (
          <div className="mt-2 w-full">
            <McqOptions 
              options={mcqOptions} 
              onSelect={onSelectOption}
              disabled={isTyping}
            />
          </div>
        )}
        
        <span className="mt-1 px-1 text-[9px] text-white/25">
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
}

function MessageContent({ content, mcqOptions }: { content: string; mcqOptions?: any }) {
  // Remove MCQ options from content if they exist (they'll be rendered separately)
  let displayContent = content;
  if (mcqOptions && mcqOptions.length > 0) {
    // Remove MCQ options on separate lines: "a. Text\n" or "a) Text\n"
    displayContent = content.replace(/^[a-e][\.\)]\s*.*$/gim, '').trim();
    // Remove inline MCQ options: "(a) Text (b) Text"
    displayContent = displayContent.replace(/\([a-e]\)[^(]+/gi, '').trim();
    // Clean up extra whitespace and trailing punctuation
    displayContent = displayContent.replace(/\n\s*\n/g, '\n').replace(/[:\?]*\s*$/, '').trim();
  }
  
  // Simple markdown-style rendering
  const renderContent = (text: string) => {
    // Split by newlines
    const lines = text.split('\n');
    
    return lines.map((line, i) => {
      // Handle bold **text**
      let parts = line.split(/(\*\*[^*]+\*\*)/g);
      parts = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${i}-${j}`} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // Handle bullet points
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return (
          <div key={i} className="flex items-start gap-2 text-[13px] leading-relaxed">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ff6b00]" />
            <span>{parts.slice(0)}</span>
          </div>
        );
      }

      // Handle numbered lists
      const numberedMatch = line.trim().match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        return (
          <div key={i} className="flex items-start gap-2 text-[13px] leading-relaxed">
            <span className="font-mono text-[11px] text-[#ff6b00]">{numberedMatch[1]}.</span>
            <span>{numberedMatch[2]}</span>
          </div>
        );
      }

      // Regular paragraph
      return (
        <p key={i} className="text-[13px] leading-relaxed">
          {parts}
        </p>
      );
    });
  };

  return <div className="space-y-1.5">{renderContent(displayContent)}</div>;
}
