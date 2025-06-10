'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import { ArrowLeft, Code, BarChart3, Route, Search } from 'lucide-react';
import ExperienceCard from '@/components/ExperienceCard';
import TechStackAnalytics from '@/components/TechStackAnalytics';
import TechLearningRoadmap from '@/components/TechLearningRoadmap';
import TechStackSearch from '@/components/TechStackSearch';

// Sample tech data for the search component
const sampleTechData = [
  { name: 'JavaScript', img: 'https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E', level: 'Advanced' as const, category: 'Programming Languages', yearsOfExperience: 3, projectsUsed: 15, lastUsed: 'Currently' },
  { name: 'TypeScript', img: 'https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white', level: 'Advanced' as const, category: 'Programming Languages', yearsOfExperience: 2, projectsUsed: 12, lastUsed: 'Currently' },
  { name: 'React', img: 'https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white', level: 'Advanced' as const, category: 'Frontend Development', yearsOfExperience: 3, projectsUsed: 18, lastUsed: 'Currently' },
  { name: 'Next.js', img: 'https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white', level: 'Advanced' as const, category: 'Frontend Development', yearsOfExperience: 2, projectsUsed: 8, lastUsed: 'Currently' },
  { name: 'Python', img: 'https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54', level: 'Intermediate' as const, category: 'Programming Languages', yearsOfExperience: 2, projectsUsed: 10, lastUsed: '1 week ago' },
  { name: 'MongoDB', img: 'https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white', level: 'Beginner' as const, category: 'Backend Development', yearsOfExperience: 0.5, projectsUsed: 2, lastUsed: 'Currently' },
  { name: 'TailwindCSS', img: 'https://img.shields.io/badge/TailwindCSS-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white', level: 'Advanced' as const, category: 'Frontend Development', yearsOfExperience: 2, projectsUsed: 14, lastUsed: 'Currently' },
  { name: 'Node.js', img: 'https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white', level: 'Beginner' as const, category: 'Backend Development', yearsOfExperience: 1, projectsUsed: 3, lastUsed: 'Currently' },
  { name: 'MySQL', img: 'https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white', level: 'Beginner' as const, category: 'Backend Development', yearsOfExperience: 0.5, projectsUsed: 2, lastUsed: '2 weeks ago' },
  { name: 'SQL', img: 'https://img.shields.io/badge/SQL-%2300C4CC.svg?style=for-the-badge&logo=sqlite&logoColor=white', level: 'Intermediate' as const, category: 'Backend Development', yearsOfExperience: 1, projectsUsed: 4, lastUsed: '1 week ago' },
];

export default function TechStackDashboard() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'roadmap' | 'explorer'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Tech Stack Overview', icon: Code },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Route },
    { id: 'explorer', label: 'Tech Explorer', icon: Search },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--accent-green)]/20 border-t-[var(--accent-green)] mx-auto mb-4"></div>
          <p className="text-[var(--muted)]">Loading Tech Stack Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <motion.header 
        className="bg-[var(--card-background)] border-b border-[var(--border)] sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Portfolio</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-purple)] text-white">
                <Code size={20} />
              </div>
              <h1 className="text-xl font-moranga text-[var(--foreground)]">
                Tech Stack Dashboard
              </h1>
            </div>

            <div className="w-32"> {/* Spacer for centering */}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <motion.div 
        className="bg-[var(--card-background)] border-b border-[var(--border)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'analytics' | 'roadmap' | 'explorer')}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-[var(--accent-green)] text-[var(--accent-green)]'
                      : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border)]'
                  }`}
                >
                  <IconComponent size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <motion.div variants={itemVariants}>
              <div className="mb-8">
                <h2 className="text-2xl font-moranga text-[var(--foreground)] mb-2">
                  Technology Stack Overview
                </h2>
                <p className="text-[var(--muted)]">
                  A comprehensive view of my technical skills and expertise across different domains
                </p>
              </div>
              <div className="flex justify-center">
                <ExperienceCard />
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div variants={itemVariants}>
              <TechStackAnalytics />
            </motion.div>
          )}

          {activeTab === 'roadmap' && (
            <motion.div variants={itemVariants}>
              <TechLearningRoadmap />
            </motion.div>
          )}

          {activeTab === 'explorer' && (
            <motion.div variants={itemVariants}>
              <TechStackSearch techData={sampleTechData} />
            </motion.div>
          )}
        </motion.div>
      </motion.main>

      {/* Footer */}
      <motion.footer 
        className="bg-[var(--card-background)] border-t border-[var(--border)] mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-[var(--muted)] text-sm">
              Built with Next.js, TypeScript, and TailwindCSS • Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
