'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const PALETTE = {
  deepRed: '#a4113c',
  brightRed: '#c1121f',
  cream: '#f8f9fa',
  navy: '#003049',
  blue: '#a4113c',
};

// Enhanced LocationCard with interactivity, animation, and dark mode support
const LocationCard = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: `0 8px 32px 0 ${PALETTE.navy}33` }}
      className="rounded-3xl p-3 sm:p-4 h-full relative overflow-hidden grid-item group"
      style={{
        background: `linear-gradient(135deg, ${PALETTE.cream} 60%, ${PALETTE.blue} 100%)`,
        border: `3px solid ${PALETTE.navy}`,
      }}
    >
      {/* Drag Handle */}
      <div className="drag-handle absolute top-4 right-4 w-6 h-6 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div className="grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2 h-2" style={{ background: PALETTE.navy, borderRadius: '50%' }}></div>
          ))}
        </div>
      </div>

      {/* Animated Map Background Pattern */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPositionX: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.12 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 280 280" className="w-full h-full">
          <defs>
            <pattern id="mapPattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <rect width="40" height="40" fill="none" stroke={PALETTE.brightRed} strokeWidth="0.5" />
              <circle cx="20" cy="20" r="2" fill={PALETTE.deepRed} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapPattern)" />
        </svg>
      </motion.div>

      {/* Location Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Location Labels */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ background: PALETTE.cream, color: PALETTE.navy }} className="backdrop-blur-sm rounded-lg px-3 py-1 mb-2 shadow">
            <span className="text-xs sm:text-sm font-silka-medium">KATHMANDU</span>
          </div>
          <div style={{ background: PALETTE.cream, color: PALETTE.navy }} className="backdrop-blur-sm rounded-lg px-3 py-1 shadow">
            <span className="text-xs sm:text-sm font-silka-medium">NEPAL</span>
          </div>
        </motion.div>

        {/* Avatar Marker with animated ring and tooltip */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
          >
            {/* Animated Glowing Ring */}
            <motion.div
              className="absolute left-1/2 top-1/2"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${PALETTE.brightRed}33 60%, transparent 100%)`,
                zIndex: 0,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Marker Pin */}
            <motion.div
              className="w-8 h-8 bg-white rounded-full border-4 flex items-center justify-center relative z-10"
              style={{ borderColor: PALETTE.brightRed }}
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              onClick={() => setShowTooltip((v) => !v)}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: PALETTE.deepRed }} />
            </motion.div>
            {/* Tooltip */}
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-1/2 transform -translate-x-1/2 top-12 z-20 whitespace-nowrap"
              >
                <div
                  style={{ background: PALETTE.cream, color: PALETTE.navy, border: `1px solid ${PALETTE.navy}`, zIndex: 20 }}
                  className="px-3 py-2 rounded-lg shadow-lg text-xs sm:text-sm font-silka-medium"
                >
                  Kathmandu: City of Temples & Tech!
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div
            style={{ background: PALETTE.cream, color: PALETTE.navy, border: `1px solid ${PALETTE.navy}` }}
            className="backdrop-blur-sm rounded-lg px-3 py-2 shadow text-center"
          >
            <p className="text-xs sm:text-sm font-silka-medium mb-1">📍 Based in Kathmandu</p>
            <p className="text-[10px] sm:text-xs" style={{ color: PALETTE.brightRed }}>Available for remote work</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
