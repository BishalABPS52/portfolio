'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScreenSize } from '@/lib/ResponsiveUtils';

const BioCard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const { isMobile } = useScreenSize();

  return (
    <div className="bg-[var(--card-background)] rounded-3xl p-3 sm:p-4 h-[calc(100%)] relative overflow-hidden grid-item border-[3px] border-[#003049] transition-colors duration-300">
      {/* Drag Handle */}
      <div className="drag-handle absolute top-4 right-4 w-6 h-6 cursor-move opacity-0 hover:opacity-100 transition-opacity">
        <div className="grid grid-cols-2 gap-1">
          <div className="w-2 h-2 bg-[var(--muted)] rounded-full"></div>
          <div className="w-2 h-2 bg-[var(--muted)] rounded-full"></div>
          <div className="w-2 h-2 bg-[var(--muted)] rounded-full"></div>
          <div className="w-2 h-2 bg-[var(--muted)] rounded-full"></div>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="relative mb-4 sm:mb-6 flex justify-center sm:justify-start">
        <div className="relative inline-block">
          {/* Pulse Animation */}
          <motion.div
            className={`absolute inset-0 rounded-full ${isOnline ? 'bg-[var(--accent-green)]' : 'bg-[var(--muted)]'} opacity-30`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className={`absolute inset-0 rounded-full ${isOnline ? 'bg-[var(--accent-green)]' : 'bg-[var(--muted)]'} opacity-20`} />

          {/* Profile Image */}
          <motion.div
            className="relative w-20 h-20 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[var(--accent-green)] shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/assets/images/profile.png"
              alt="Bishal Shrestha"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
              sizes="(max-width: 640px) 80px, 64px"
            />
          </motion.div>
        </div>
      </div>

      {/* Bio Text */}
      <div className="mb-4 sm:mb-8">
        <motion.p
          className="text-[var(--foreground)] text-sm sm:text-lg leading-relaxed font-silka"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Namaste, I'm{' '}
          <span className="font-moranga text-2xl sm:text-4xl text-[var(--accent-purple)]">
            bishal
          </span>
          , a Computer Engineering student from Nepal and a passionate software engineering enthusiast skilled in React, Node.js, Python, and C++, building real-world tech solutions.
        </motion.p>
      </div>

      {/* Interactive Status Toggle Button */}
      <div className="flex justify-center sm:justify-start">
        <motion.button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full font-silka-medium text-xs sm:text-sm transition-all duration-300 shadow-lg touch-target ${
            isOnline
              ? 'bg-[var(--accent-green)] text-white hover:opacity-80'
              : 'bg-[var(--muted)] text-white hover:opacity-80'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isOnline ? '🟢 Available for Work' : '🔴 Currently Busy'}
        </motion.button>
      </div>
    </div>
  );
};

export default BioCard;
