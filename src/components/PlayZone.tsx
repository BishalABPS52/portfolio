'use client';

import { motion } from 'framer-motion';
import GameCard from './GameCard';

const PlayZone = () => {
  const games = [
    {
      title: 'Alien Invasion',
      description: 'A classic arcade-style game where you defend Earth from alien invaders. Features multiple levels, power-ups, and increasing difficulty.',
      imageUrl: '/assets/images/alien_invasion.png',
      status: 'coming-soon' as const,
      tech: ['Python', 'Pygame', 'OOP']
    },
    {
      title: 'Connect 4',
      description: 'A strategic two-player connection game with AI opponent. Implemented using minimax algorithm with alpha-beta pruning for efficient AI moves.',
      imageUrl: '/assets/images/Connect4.png',
      status: 'coming-soon' as const,
      tech: ['C++', 'SFML', 'AI']
    },
    {
      title: 'QuizTime',
      description: 'An interactive quiz application that tests your knowledge across various topics. Features multiple choice questions, lifelines, and score tracking.',
      imageUrl: '/assets/images/QuizTime.png',
      status: 'coming-soon' as const,
      tech: ['React', 'TypeScript', 'Next.js'],
      githubUrl: 'https://github.com/BishalABPS/QuizTime'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {games.map((game, index) => (
          <motion.div
            key={game.title}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlayZone;
