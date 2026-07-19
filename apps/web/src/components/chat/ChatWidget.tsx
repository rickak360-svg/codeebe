"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MaterialIcon } from '@/components/home/MaterialIcon';
import { useChatbot } from './useChatbot';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { CalendlyEmbed } from './CalendlyEmbed';

export function ChatWidget() {
  const {
    isOpen,
    messages,
    isTyping,
    unreadCount,
    showCalendly,
    extractedData,
    error,
    sendMessage,
    toggleChat,
    triggerEstimate,
    setShowCalendly,
  } = useChatbot();

  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-[200] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b00] to-[#ff9a00] text-white shadow-[0_8px_32px_-8px_rgba(255,107,0,0.6)] transition-transform hover:scale-110 lg:bottom-8 lg:right-8"
            aria-label="Open chat"
          >
            <MaterialIcon name="chat" className="!text-[28px]" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-lg"
              >
                {unreadCount}
              </motion.span>
            )}
            <span className="absolute inset-0 animate-ping rounded-full bg-[#ff6b00] opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[199] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={toggleChat}
            />

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed z-[200] flex flex-col overflow-hidden bg-[#0a0a0a] ${
                isExpanded 
                  ? 'inset-4 sm:inset-8' 
                  : 'inset-0 sm:inset-auto sm:bottom-8 sm:right-8 sm:top-8 sm:h-[calc(100vh-4rem)] sm:w-[420px] sm:max-h-[650px]'
              } sm:rounded-2xl sm:border sm:border-white/[0.08] sm:shadow-[0_12px_48px_rgba(0,0,0,0.6)]`}
            >
              {/* Header */}
              <div className="relative shrink-0 border-b border-white/[0.06] bg-gradient-to-r from-[#1a0d03] to-[#0d0d0d] p-3 sm:p-4">
                {/* Terminal chrome */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                  </span>
                  <span className="font-mono text-[9px] text-white/20">~/chat</span>
                </div>

                  <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff6b00]/15">
                      <MaterialIcon name="support_agent" className="!text-[18px] text-[#ff6b00]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-white">Chat with Codeebe</p>
                      <p className="truncate text-[10px] text-white/40">We typically reply instantly</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
                      aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
                    >
                      <MaterialIcon name={isExpanded ? "close_fullscreen" : "open_in_full"} className="!text-[18px]" />
                    </button>
                    <button
                      onClick={toggleChat}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
                      aria-label="Close chat"
                    >
                      <MaterialIcon name="close" className="!text-[20px]" />
                    </button>
                  </div>
                </div>

                {/* Error banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] text-red-400"
                  >
                    {error}
                  </motion.div>
                )}
              </div>

              {/* Messages area or Calendly */}
              {showCalendly ? (
                <CalendlyEmbed
                  onClose={() => setShowCalendly(false)}
                  prefillData={{
                    name: extractedData?.fullName,
                    email: extractedData?.email,
                  }}
                />
              ) : (
                <>
                  <div
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto scroll-smooth py-4"
                    style={{ scrollbarWidth: 'thin' }}
                  >
                    <div className="space-y-3">
                      {messages.map((message, i) => (
                        <ChatMessage
                          key={message.id}
                          message={message}
                          isLast={i === messages.length - 1}
                          onSelectOption={sendMessage}
                          onSubmitContact={(data) => {
                            const formattedMessage = `Full Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}${data.companyName ? `\nCompany: ${data.companyName}` : ''}`;
                            sendMessage(formattedMessage);
                          }}
                          isTyping={isTyping}
                        />
                      ))}
                      {isTyping && <TypingIndicator />}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Quick actions */}
                  {extractedData?.email && extractedData?.fullName && extractedData?.phone && (
                    <div className="shrink-0 border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-3">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                        Quick actions
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={triggerEstimate}
                          disabled={isTyping}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#ff6b00] px-3 py-2 text-[12px] font-semibold text-[#1a0a00] transition-colors hover:bg-[#ff8533] disabled:opacity-50"
                        >
                          <MaterialIcon name="calculate" className="!text-[14px]" />
                          Get Estimate
                        </button>
                        <button
                          onClick={() => setShowCalendly(true)}
                          disabled={isTyping}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[12px] font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
                        >
                          <MaterialIcon name="calendar_today" className="!text-[14px]" />
                          Schedule Call
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <ChatInput onSend={sendMessage} disabled={isTyping} />
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
