'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

const getLanguageColor = (language: string) => {
  const colors: { [key: string]: string } = {
    Python: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-600',
    'C++': 'bg-pink-500',
    C: 'bg-gray-600',
    HTML: 'bg-orange-500',
    CSS: 'bg-purple-500',
    PHP: 'bg-indigo-500',
    Java: 'bg-red-500'
  };
  return colors[language] || 'bg-gray-400';
};

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/BishalABPS52/repos?sort=updated&per_page=8');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (isLoading) {
    return <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse bg-[var(--card-background)] rounded-3xl h-64"></div>
      ))}
    </div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {repos.map((repo) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-[3px] border-[#003049] overflow-hidden group relative"
        >
          <div className="p-6 h-full bg-[var(--card-background)] transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full" />
              <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">{repo.name}</h3>
                <p className="text-[var(--muted)] text-sm line-clamp-2 mb-4">
                  {repo.description || 'No description available'}
                </p>
              </div>

              <div className="space-y-4">
                {repo.language && (
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                    <span className="text-sm text-[var(--muted)]">{repo.language}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star size={16} />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork size={16} />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors duration-300"
                  >
                    View →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;