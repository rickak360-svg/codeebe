"use client";

import { motion } from 'framer-motion';

interface McqOption {
  letter: string;
  text: string;
}

interface McqOptionsProps {
  options: McqOption[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

export function McqOptions({ options, onSelect, disabled }: McqOptionsProps) {
  return (
    <div className="mt-3 space-y-2">
      {options.map((option, index) => (
        <motion.button
          key={option.letter}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          onClick={() => !disabled && onSelect(`${option.letter}) ${option.text}`)}
          disabled={disabled}
          className="group flex w-full items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-left transition-all hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/[0.06] disabled:opacity-50 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02]"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] font-mono text-[12px] font-semibold text-white/60 transition-all group-hover:border-[#ff6b00]/50 group-hover:bg-[#ff6b00]/15 group-hover:text-[#ff6b00]">
            {option.letter}
          </span>
          <span className="flex-1 pt-0.5 text-[13px] leading-relaxed text-white/70 group-hover:text-white">
            {option.text}
          </span>
          <span className="shrink-0 text-white/0 transition-all group-hover:translate-x-0.5 group-hover:text-[#ff6b00]">
            →
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Helper function to parse MCQ options from text
export function parseMcqOptions(text: string): McqOption[] | null {
  // Try multiple patterns to match different MCQ formats
  const patterns = [
    // Pattern 1: a. text with line breaks - e.g., "a. E-Commerce\nb. SaaS"
    /^([a-e])\.?\s+(.+)$/gim,
    // Pattern 2: a) text with line breaks - e.g., "a) E-Commerce\nb) SaaS"  
    /^([a-e])\)\s*(.+)$/gim,
    // Pattern 3: (a) text with line breaks - e.g., "(a) E-Commerce\n(b) SaaS"
    /\(([a-e])\)\s*([^\n(]+)/gi,
    // Pattern 4: inline (a) text (b) text
    /\(([a-e])\)\s*([^(]+?)(?=\s*\([a-e]\)|$)/gi,
    // Pattern 5: inline a) text b) text
    /([a-e])\)\s*([^a-e)]+?)(?=\s*[a-e]\)|$)/gi,
  ];

  for (const pattern of patterns) {
    const matches = Array.from(text.matchAll(pattern));
    if (matches.length >= 2) {
      const options = matches.map(match => ({
        letter: match[1].toLowerCase(),
        text: match[2].trim().replace(/\s+/g, ' '),
      }));
      
      // Validate that we got valid options
      if (options.every(opt => opt.text.length > 0 && opt.text.length < 200)) {
        console.log('Parsed MCQ options:', options);
        return options;
      }
    }
  }

  return null;
}
