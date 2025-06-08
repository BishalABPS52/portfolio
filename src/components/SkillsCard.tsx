'use client';

import { motion } from 'framer-motion';

const SkillsCard = () => {  return (
    <div className="rounded-3xl p-3 sm:p-4 h-full relative overflow-hidden grid-item border-[3px] border-[#003049] transition-colors duration-300">
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="mb-3 sm:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg sm:text-xl font-moranga text-[var(--foreground)] mb-1 sm:mb-2">Expertise</h3>
        </motion.div>

        {/* New Skills List */}
        <div className="flex-1 space-y-3">
          <motion.div
            className="group/skill"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-silka-medium text-sm text-[var(--foreground)]">1. Game Development</span>
            </div>
          </motion.div>
          <motion.div
            className="group/skill"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-silka-medium text-sm text-[var(--foreground)]">2. Web Development</span>
            </div>
          </motion.div>
          <motion.div
            className="group/skill"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-silka-medium text-sm text-[var(--foreground)]">3. Web Design</span>
            </div>
          </motion.div>
        </div>        {/* Footer */}
        <motion.div
          className="mt-3 sm:mt-4 p-2 sm:p-3 bg-[var(--background)] rounded-2xl border border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-[10px] sm:text-xs text-[var(--muted)] font-silka text-center">
            💡 Always learning and exploring new technologies
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-16 sm:w-20 h-16 sm:h-20 border border-[var(--accent-green)]/10 rounded-full opacity-50"></div>
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-12 sm:w-16 h-12 sm:h-16 border border-[var(--accent-blue)]/10 rounded-full opacity-30"></div>
    </div>
  );
};

export default SkillsCard;
