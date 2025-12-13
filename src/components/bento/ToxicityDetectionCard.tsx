'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isWarning?: boolean;
}

const INITIAL_BOT_MESSAGE: Message = {
  id: 'initial',
  sender: 'bot',
  text: 'Send a message to determine if its toxic/gendered!',
};

const PREFILLED_TEXT = 'arbitrary hateful text';

export function ToxicityDetectionCard() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_MESSAGE]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    if (hasSubmitted) return;

    setHasSubmitted(true);

    // Add user message
    const userMessage: Message = {
      id: 'user-1',
      sender: 'user',
      text: PREFILLED_TEXT,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Add bot warning after a short delay
    setTimeout(() => {
      const warningMessage: Message = {
        id: 'warning-1',
        sender: 'bot',
        text: 'Warning! This comment is potentially misogynistic. Please be more mindful of your language.',
        isWarning: true,
      };
      setMessages((prev) => [...prev, warningMessage]);
    }, 800);
  };

  return (
    <div className="h-full w-full max-h-full bg-gradient-to-br from-teal-900 via-green-900 to-teal-800 p-3 pb-12 flex flex-col overflow-hidden relative">
      {/* Chat Window */}
      <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col min-h-0 overflow-hidden">
        {/* Chat Header */}
        <div className="flex-shrink-0 border-b border-gray-200 py-2 px-3">
          <p className="text-center text-gray-900 font-semibold text-sm">
            Miso
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col gap-2 min-h-0 p-3">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                layout={false}
                className={`flex items-start gap-1.5 flex-shrink-0 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <img
                  src={message.sender === 'bot' ? '/miso/miso.jpg' : '/miso/ne.png'}
                  alt={message.sender === 'bot' ? 'Miso' : 'You'}
                  className="w-6 h-6 rounded-full flex-shrink-0 object-cover"
                />

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] rounded-md px-2 py-1.5 ${
                    message.isWarning
                      ? 'bg-red-700 text-white'
                      : message.sender === 'user'
                      ? 'bg-[#a8c7b5] text-gray-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                  style={{ fontSize: '10px', lineHeight: '1.4' }}
                >
                  <p className="break-words">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Field */}
        <div className="flex-shrink-0 border-t border-gray-200 p-2 flex items-center gap-1.5">
          <div
            className={`flex-1 bg-gray-100 rounded-md px-2 py-1.5 ${
              hasSubmitted ? 'text-gray-400' : 'text-gray-700'
            }`}
            style={{ fontSize: '10px' }}
          >
            {hasSubmitted ? '' : PREFILLED_TEXT}
          </div>
          <button
            onClick={handleSubmit}
            disabled={hasSubmitted}
            className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
              hasSubmitted
                ? 'bg-gray-400 cursor-default'
                : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
            }`}
          >
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Trophy Badge */}
      <a
        href="https://devpost.com/software/miso"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 z-10 group flex items-center justify-center px-2 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 transition-all duration-300"
      >
        <span className="text-amber-400 text-sm">🏆</span>
        <span className="text-amber-400 text-xs font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] group-hover:ml-1.5 transition-all duration-300 whitespace-nowrap">
          UofTHacks
        </span>
      </a>
    </div>
  );
}
