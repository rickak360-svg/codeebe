import { useEffect } from 'react';
import { MaterialIcon } from '@/components/home/MaterialIcon';

interface CalendlyEmbedProps {
  onClose: () => void;
  prefillData?: {
    name?: string;
    email?: string;
  };
}

export function CalendlyEmbed({ onClose, prefillData }: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/codeebe';
  
  // Build URL with prefill params
  const buildCalendlyUrl = () => {
    const url = new URL(calendlyUrl);
    if (prefillData?.name) {
      url.searchParams.set('name', prefillData.name);
    }
    if (prefillData?.email) {
      url.searchParams.set('email', prefillData.email);
    }
    return url.toString();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <MaterialIcon name="calendar_today" className="!text-[18px] text-[#ff6b00]" />
          <span className="text-[13px] font-semibold text-white">Schedule a Discovery Call</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
        >
          <MaterialIcon name="close" className="!text-[18px]" />
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div
          className="calendly-inline-widget h-full w-full"
          data-url={buildCalendlyUrl()}
        />
      </div>
    </div>
  );
}
