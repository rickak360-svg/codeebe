"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MaterialIcon } from '@/components/home/MaterialIcon';

interface ContactDetailsFormProps {
  onSubmit: (data: {
    fullName: string;
    email: string;
    phone: string;
    companyName?: string;
  }) => void;
  disabled?: boolean;
}

export function ContactDetailsForm({ onSubmit, disabled }: ContactDetailsFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\d\s\+\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate() && !disabled) {
      onSubmit({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        companyName: formData.companyName.trim() || undefined,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3 rounded-xl border border-[#ff6b00]/20 bg-gradient-to-br from-[#ff6b00]/[0.08] to-transparent p-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff6b00]/20">
          <MaterialIcon name="person" className="!text-[16px] text-[#ff6b00]" />
        </div>
        <p className="text-[12px] font-semibold text-white/80">Quick Contact Form</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name */}
        <div>
          <label className="mb-1 block text-[11px] font-medium text-white/50">
            Full Name <span className="text-[#ff6b00]">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            disabled={disabled}
            className={`w-full rounded-lg border ${
              errors.fullName ? 'border-red-500/50' : 'border-white/[0.08]'
            } bg-white/[0.02] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-[#ff6b00]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 disabled:opacity-50`}
          />
          {errors.fullName && (
            <p className="mt-1 text-[10px] text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-[11px] font-medium text-white/50">
            Email Address <span className="text-[#ff6b00]">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            disabled={disabled}
            className={`w-full rounded-lg border ${
              errors.email ? 'border-red-500/50' : 'border-white/[0.08]'
            } bg-white/[0.02] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-[#ff6b00]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 disabled:opacity-50`}
          />
          {errors.email && (
            <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-[11px] font-medium text-white/50">
            Phone Number <span className="text-[#ff6b00]">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            disabled={disabled}
            className={`w-full rounded-lg border ${
              errors.phone ? 'border-red-500/50' : 'border-white/[0.08]'
            } bg-white/[0.02] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-[#ff6b00]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 disabled:opacity-50`}
          />
          {errors.phone && (
            <p className="mt-1 text-[10px] text-red-400">{errors.phone}</p>
          )}
        </div>

        {/* Company Name (Optional) */}
        <div>
          <label className="mb-1 block text-[11px] font-medium text-white/50">
            Company Name <span className="text-[10px] text-white/30">(Optional)</span>
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            placeholder="Your Company Ltd."
            disabled={disabled}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-[#ff6b00]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6b00] px-4 py-2.5 text-[13px] font-semibold text-[#1a0a00] transition-colors hover:bg-[#ff8533] disabled:opacity-50 disabled:hover:bg-[#ff6b00]"
        >
          <MaterialIcon name="send" className="!text-[16px]" />
          Submit Details
        </button>
      </form>

      <p className="mt-2 text-center text-[10px] text-white/30">
        Your information is secure and will only be used for this project
      </p>
    </motion.div>
  );
}

// Helper function to detect if AI is asking for contact details
export function isAskingForContactDetails(message: string): boolean {
  const contactKeywords = [
    'full name',
    'email address',
    'phone number',
    'contact details',
    'share your',
    'company name',
  ];

  const messageLower = message.toLowerCase();
  
  // Check if message contains multiple contact-related keywords
  const matchCount = contactKeywords.filter(keyword => 
    messageLower.includes(keyword)
  ).length;

  return matchCount >= 2;
}
