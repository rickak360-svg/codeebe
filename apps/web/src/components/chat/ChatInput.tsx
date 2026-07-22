import { useState, KeyboardEvent } from 'react';
import { MaterialIcon } from '@/components/home/MaterialIcon';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Type your message..." }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/[0.06] bg-[#0a0a0a] p-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#ff6b00]/30 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff6b00] text-[#1a0a00] transition-colors hover:bg-[#ff8533] disabled:opacity-50 disabled:hover:bg-[#ff6b00]"
        >
          <MaterialIcon name="send" className="!text-[18px]" />
        </button>
      </div>
    </div>
  );
}
