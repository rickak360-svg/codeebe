"use client";

export function LiveChatButton() {
  const handleOpenChat = () => {
    const chatBubble = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
    if (chatBubble) {
      chatBubble.click();
    }
  };

  return (
    <button
      onClick={handleOpenChat}
      type="button"
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-[#ff6b00]/25 hover:bg-[#ff6b00]/[0.03] sm:p-5"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ff6b00]/[0.06] blur-[25px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/[0.06] transition-all duration-300 group-hover:border-[#ff6b00]/40 group-hover:shadow-[0_0_16px_-4px_rgba(255,107,0,0.4)]">
        <span className="material-symbols-outlined !text-[22px] text-[#ff6b00]">support_agent</span>
      </div>
      <h3 className="font-semibold text-white">Live Chat</h3>
      <p className="mt-1.5 text-[13px] text-white/45">Chat with AI assistant instantly</p>
      <span className="mt-3 inline-flex items-center gap-1 rounded-lg border border-[#ff6b00]/30 bg-[#ff6b00]/[0.08] px-3 py-1.5 text-[12px] font-semibold text-[#ff6b00] transition-all duration-200 group-hover:bg-[#ff6b00]/15">
        Open Live Chat
      </span>
    </button>
  );
}
