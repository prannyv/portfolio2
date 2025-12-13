'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type WalletType = 'apple' | 'google';

export function HackWesternLoyalty() {
  const [showWalletPreview, setShowWalletPreview] = useState(false);
  const [showAddedPill, setShowAddedPill] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>('apple');

  const handleOpenWallet = (type: WalletType) => {
    setWalletType(type);
    setShowWalletPreview(true);
  };

  const handleAddToWallet = () => {
    // Close modal immediately
    setShowWalletPreview(false);
    // Show pill on main screen after modal closes
    setTimeout(() => {
      setShowAddedPill(true);
      // Auto-hide the pill after 2.5 seconds
      setTimeout(() => {
        setShowAddedPill(false);
      }, 2500);
    }, 150);
  };

  const handleClose = () => {
    setShowWalletPreview(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#fbfbfb] overflow-hidden">
        {/* Background Image for Transaction History */}
        <div className="absolute -top-[44px] left-0 right-0 h-[100px] overflow-hidden pointer-events-none">
          <Image
            src="/wallet/walletBackground.png"
            alt=""
            width={400}
            height={200}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col gap-4 p-5">
          {/* Points Section */}
          <div className="rounded-2xl bg-purple-100 p-5 mt-16">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Your Points
            </h2>
            <div className="rounded-xl bg-purple-50 p-4">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-gray-600">
                    Current Balance:
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    6
                  </p>
                </div>
                <div className="flex items-baseline justify-between border-t border-purple-200 pt-2">
                  <p className="text-xs text-gray-600">
                    Total Earned:
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    13 pts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="rounded-2xl bg-purple-100 p-5 flex-1 flex items-center justify-center">
            {/* QR Code Display */}
            <div className="rounded-2xl bg-white p-4 shadow-md">
              <Image
                src="/wallet/qrCode.png"
                alt="Your Hacker Pass QR Code"
                width={176}
                height={176}
                className="w-44 h-44 rounded-lg"
              />
            </div>
          </div>

          {/* Wallet Buttons */}
          <div className="flex flex-col items-center gap-2">
            {/* Apple Wallet Button */}
            <button 
              className="transition-transform hover:scale-105 active:scale-95"
              onClick={() => handleOpenWallet('apple')}
            >
              <Image
                src="/wallet/AppleWallet.svg"
                alt="Add to Apple Wallet"
                width={112}
                height={35}
                className="h-9 w-auto"
              />
            </button>

            {/* Google Wallet Button */}
            <button 
              className="transition-transform hover:scale-105 active:scale-95"
              onClick={() => handleOpenWallet('google')}
            >
              <Image
                src="/wallet/GoogleWallet.svg"
                alt="Add to Google Wallet"
                width={109}
                height={36}
                className="h-9 w-[120px]"
              />
            </button>
          </div>
        </div>

      {/* Apple Wallet Preview Modal - Contained within card */}
      <AnimatePresence>
        {showWalletPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 bg-black flex flex-col rounded-[7px] overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-3 py-2">
              {/* X Button - Liquid Glass */}
              <motion.button
                onClick={handleClose}
                className="relative w-8 h-8 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>

              {/* Title */}
              <h1 className="text-white font-semibold text-sm">
                Hack Western 12 Pass
              </h1>

              {/* Add Button - Blue Liquid Glass */}
              <motion.button
                onClick={handleAddToWallet}
                className="relative px-3 py-1.5 rounded-full flex items-center justify-center bg-blue-500/80 backdrop-blur-xl border border-blue-400/30 shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                <span className="text-white font-semibold text-sm relative z-10">Add</span>
              </motion.button>
            </div>

            {/* Wallet Card */}
            <div className="flex-1 flex items-start justify-center px-4 pt-4">
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-[85%]"
              >
                <Image
                  src="/wallet/AppleWalletBadge.png"
                  alt="Hack Western 12 Pass"
                  width={300}
                  height={450}
                  className="w-full h-auto shadow-2xl"
                  priority
                />
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Added to Wallet Pill - Shows on main screen after adding */}
      <AnimatePresence>
        {showAddedPill && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#4ade80" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-white font-medium text-sm">
                Added to {walletType === 'apple' ? 'Apple' : 'Google'} Wallet!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
