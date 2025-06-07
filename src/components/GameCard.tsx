'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

interface Game {
  title: string;
  description: string;
  imageUrl: string;
  status: 'available' | 'coming-soon';
  tech: string[];
  githubUrl?: string;
  playUrl?: string;
}

const GameCard = ({ game }: { game: Game }) => {
  const isAvailable = game.status === 'available';
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-3xl p-6 bg-[var(--card-background)] relative overflow-hidden ${
        !isAvailable ? 'opacity-75' : ''
      }`}
    >
      <div className="relative z-10">
        {/* Game Image */}
        <div className="w-full h-48 mb-4 relative rounded-2xl overflow-hidden">
          <Image
            src={game.imageUrl}
            alt={game.title}
            fill
            className="object-cover"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-[var(--background)]/80 flex items-center justify-center">
              <span className="text-[var(--foreground)] font-silka-medium">Coming Soon</span>
            </div>
          )}
        </div>

        {/* Game Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-moranga" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            {game.title}
          </h3>
          <p className="text-sm text-[var(--muted)] font-silka">
            {game.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {game.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[var(--foreground)]/10 rounded-full text-xs font-silka-medium text-[var(--foreground)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {game.githubUrl && (
              <motion.a
                href={game.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 mt-4 rounded-full font-silka-medium text-sm flex items-center justify-center gap-2 bg-[var(--foreground)]/10 text-[var(--foreground)] hover:bg-[var(--foreground)]/20"
              >
                View Source
              </motion.a>
            )}
            {isAvailable && game.playUrl ? (
              <Link href={game.playUrl} passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 mt-4 rounded-full font-silka-medium text-sm flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                >
                  <PlayCircle size={18} />
                  Play Now
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 mt-4 rounded-full font-silka-medium text-sm flex items-center justify-center gap-2 bg-[var(--foreground)]/20 text-[var(--muted)] cursor-not-allowed"
                disabled
              >
                <PlayCircle size={18} />
                Coming Soon
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
