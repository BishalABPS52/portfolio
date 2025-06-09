'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

interface Props {
  className?: string;
}

const GitHubProjects = ({ className }: Props) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/BishalABPS52/repos?sort=updated&per_page=20');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-green-500',
      'React': 'bg-cyan-500',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-purple-500',
      'PHP': 'bg-indigo-500',
    };
    return colors[language || ''] || 'bg-gray-500';
  };  // Create a balanced color distribution with at least 3 of each color
  const [colorDistribution] = useState(() => {
    const colors = ['bg-[var(--accent-green)]', 'bg-[var(--accent-blue)]', 'bg-[#f4e8db]', 'bg-[#fde2e2]'];
    // Create an array with 3 of each color
    const distribution = colors.flatMap(color => Array(3).fill(color));
    // Add remaining slots with random colors
    const remainingSlots = 20 - distribution.length; // 20 is per_page from API
    for (let i = 0; i < remainingSlots; i++) {
      distribution.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    // Shuffle the array
    for (let i = distribution.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distribution[i], distribution[j]] = [distribution[j], distribution[i]];
    }
    return distribution;
  });

  const getCardColor = (index: number) => {
    return colorDistribution[index] || colorDistribution[0];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[var(--card-background)] rounded-3xl p-6 animate-pulse border border-[var(--border)]">
            <div className="h-4 bg-[var(--muted)]/20 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-[var(--muted)]/20 rounded w-full mb-2"></div>
            <div className="h-3 bg-[var(--muted)]/20 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className || ''}`}>
      {repos.map((repo, index) => (
        <motion.div
          key={repo.id}
          onClick={() => window.open(repo.html_url, '_blank')}
          className={`${getCardColor(index)} rounded-3xl p-6 h-full relative overflow-hidden text-white group cursor-pointer`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Drag Handle */}
          <div className="drag-handle absolute top-4 right-4 w-6 h-6 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
          </div>

          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Github size={24} />
              </div>

              {/* Action Links */}
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={16} />
                </motion.a>
                {repo.homepage && (
                  <motion.a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 github-project-content">              <h3 className="text-xl font-moranga text-[#003049] dark:text-[#003049] mb-3">
                {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h3>
              <p className="text-[#003049] dark:text-[#003049] font-silka text-sm mb-4 leading-relaxed line-clamp-3">
                {repo.description}
              </p>
            </div>

            {/* Stats and Language */}
            <div className="flex items-center justify-between mt-4 github-project-content">              <div className="flex space-x-4 text-sm text-[#003049] dark:text-[#003049]">
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-[#003049] dark:text-[#003049]" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork size={14} className="text-[#003049] dark:text-[#003049]" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>

              {repo.language && (
                <div className="flex items-center space-x-2">                <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                  <span className="text-sm font-silka-medium text-[#003049] dark:text-[#003049]">{repo.language}</span>
                </div>
              )}
            </div>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-silka-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GitHubProjects;
