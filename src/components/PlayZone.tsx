'use client';

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
      title: 'Quiz Time',
      description: 'An interactive quiz application that tests your knowledge across various topics. Features multiple choice questions, score tracking, and instant feedback.',
      imageUrl: '/assets/images/QuizTime.png',
      status: 'available' as const,
      tech: ['Python', 'Pygame', 'JSON'],
      githubUrl: 'https://github.com/BishalABPS/QuizTime',
      playUrl: '/games/quiztime'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.title} game={game} />
        ))}
      </div>
    </div>
  );
};

export default PlayZone;
