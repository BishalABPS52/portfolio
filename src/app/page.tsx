'use client';

import PlayZone from '@/components/PlayZone';
import Header from '@/components/Header';
import BioCard from '@/components/BioCard';
import LocationCard from '@/components/LocationCard';
import SkillsCard from '@/components/SkillsCard';
import GitHubProjects from '@/components/GitHubProjects';
import ExperienceCard from '@/components/ExperienceCard';
import LearnCard from '@/components/LearnCard';
import ContactCard from '@/components/ContactCard';
import AboutCard from '@/components/AboutCard';
import ProjectsShowcase from '@/components/ProjectCard';
import CertificatesCard from '@/components/CertificatesCard';
import CreativeCard from '@/components/CreativeCard';
import BlogsCard from '@/components/BlogsCard';
import CVCard from '@/components/CVCard';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Home');
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      setActiveFilter(event.detail === 'All' ? 'Home' : event.detail);
      toast.success(`Showing: ${event.detail === 'All' ? 'Home' : event.detail}`);
    };

    window.addEventListener('portfolioFilter', handleFilterChange as EventListener);
    return () => window.removeEventListener('portfolioFilter', handleFilterChange as EventListener);
  }, []);  const getFilteredComponents = () => {
    const allComponents = [      { component: <BioCard key="bio" />, category: 'About', size: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1' },
      { component: <LocationCard key="location" />, category: 'About', size: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1' },
      { component: <SkillsCard key="skills" />, category: 'About', size: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1' },
      { component: <ExperienceCard key="experience" />, category: 'Skills', size: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1' },
    ];

    if (activeFilter === 'PlayZone') {
      return (
        <div className="w-full">
          <PlayZone />
        </div>
      );
    }    if (activeFilter === 'CV') {
      return (
        <div className="w-full">
          <CVCard />
        </div>
      );
    }

    if (activeFilter === 'Home') {
      return allComponents.map(item => (
        <div className={`grid-item ${item.size} p-2`} key={item.component.key}>
          {item.component}
        </div>
      ));
    }

    if (activeFilter === 'About') {
      return [
        ...allComponents
          .filter(item => ['BioCard', 'LocationCard', 'SkillsCard'].includes(item.component.type.name))
          .map(item => (
            <div className={`grid-item ${item.size} p-2`} key={item.component.key}>
              {item.component}
            </div>
          )),
        <div className="grid-item col-span-1 md:col-span-4 p-2" key="about">
          <AboutCard />
        </div>
      ];
    }

    // For Skills filter
    return allComponents
      .filter(item => item.category === activeFilter)
      .map(item => (
        <div className={`grid-item ${item.size} p-2`} key={item.component.key}>
          {item.component}
        </div>
      ));
  };
  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-300 relative overflow-hidden">      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#780000]/10 to-[#c1121f]/10 rounded-full mix-blend-multiply filter blur-xl animate-float dark:from-[#c1121f]/10 dark:to-[#780000]/10"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-[#c1121f]/10 to-[#780000]/10 rounded-full mix-blend-multiply filter blur-xl animate-float-delay dark:from-[#780000]/10 dark:to-[#c1121f]/10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-[#780000]/10 to-[#c1121f]/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow dark:from-[#c1121f]/10 dark:to-[#780000]/10"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-gradient-to-r from-[#c1121f]/10 to-[#780000]/10 rounded-full mix-blend-multiply filter blur-xl animate-bounce-slow dark:from-[#780000]/10 dark:to-[#c1121f]/10"></div>
      </div>
      
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">        {/* Welcome Message: only show on Home */}
        {activeFilter === 'Home' && (
          <motion.div
            className="text-center mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>            <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
              Welcome to my portfolio
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
            <p className="text-[var(--muted)] font-silka mt-2"></p>
          </motion.div>
        )}        {/* About Me Heading: only show on About */}
        {activeFilter === 'About' && (
          <motion.div
            className="text-center mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>            <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
              About me
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
          </motion.div>
        )}        {/* Skills Heading: only show on Skills */}
        {activeFilter === 'Skills' && (
          <motion.div
            className="text-center mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>            <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
              My Skills
            </h1>
            <div className="w-28 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
            <p className="text-[var(--muted)] font-silka mt-2">Technical expertise and proficiencies</p>
          </motion.div>
        )}        {/* Main Grid Layout: Home, Skills, or About */}
        {(activeFilter === 'Home' || activeFilter === 'Skills' || activeFilter === 'About') && (
          <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)] relative">            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-1/4 w-2 h-2 bg-[#780000] rounded-full animate-ping opacity-60 dark:bg-[#c1121f]"></div>
              <div className="absolute top-32 right-1/3 w-1 h-1 bg-[#c1121f] rounded-full animate-pulse opacity-40 dark:bg-[#780000]"></div>
              <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-[#780000] rounded-full animate-bounce opacity-30 dark:bg-[#c1121f]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl w-full px-4 relative z-10">{getFilteredComponents()}
              {activeFilter === 'Skills' && (
                <div className="grid-item col-span-1 md:col-span-4">
                  <LearnCard />
                </div>
              )}
              {activeFilter !== 'About' && (
                <div className="grid-item col-span-1 md:col-span-4">
                  <ContactCard />
                </div>
              )}
            </div>
          </div>
        )}

        {/* CV Section */}
        {activeFilter === 'CV' && (
          <div className="flex justify-center items-center min-h-screen bg-[var(--background)]">
            {getFilteredComponents()}
          </div>
        )}        {/* Featured Projects Section - Only show on Home */}
        {activeFilter === 'Home' && (
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#780000]/10 via-[#c1121f]/10 to-[#780000]/10 rounded-3xl blur-xl dark:from-[#c1121f]/10 dark:via-[#780000]/10 dark:to-[#c1121f]/10"></div>
            <div className="relative z-10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>                  <h2 className="text-2xl font-moranga text-[#780000] dark:text-[#c1121f]">
                    Featured Projects
                  </h2>
                  <p className="text-[var(--muted)] text-sm mt-1">Highlighted works and achievements</p>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#780000] to-[#c1121f] mt-2 rounded-full dark:from-[#c1121f] dark:to-[#780000]"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProjectsShowcase />
              </div>
            </div>
          </motion.div>
        )}        {/* PlayZone Section */}
        {activeFilter === 'PlayZone' && (
          <>
            <motion.div
              className="text-center mb-8 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>
              <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
                Play Zone
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
              <p className="text-[var(--muted)] mt-2">Interactive games and applications</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)] relative">
              {/* Decorative Gaming Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-40"></div>
                <div className="absolute top-32 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-50"></div>
                <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-16 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-spin opacity-30"></div>
              </div>
              <div className="max-w-7xl w-full px-4 relative z-10">
                <PlayZone />
              </div>
            </div>
          </>
        )}        {/* Projects Section */}
        {activeFilter === 'Projects' && (
          <>
            <motion.div
              className="text-center mb-8 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>
              <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
                My Projects
              </h1>
              <div className="w-28 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
              <p className="text-[var(--muted)] mt-2">All repositories from my GitHub profile</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)] relative">
              {/* Code-themed decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 text-2xl text-green-400/20 animate-pulse font-mono">&lt;/&gt;</div>
                <div className="absolute top-40 right-1/4 text-xl text-blue-400/20 animate-bounce font-mono">{}</div>
                <div className="absolute bottom-32 left-1/3 text-lg text-purple-400/20 animate-spin font-mono">[]</div>
              </div>
              <div className="max-w-5xl w-full px-4 relative z-10">
                <GitHubProjects />
              </div>
            </div>
          </>
        )}        {/* Certificates Section */}
        {activeFilter === 'Certificates' && (
          <>
            <motion.div
              className="text-center mb-8 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>
              <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
                My Certificates
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
              <p className="text-[var(--muted)] mt-2">Achievements and qualifications</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)] relative">
              {/* Achievement-themed decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-1/4 text-2xl text-yellow-400/30 animate-bounce">🏆</div>
                <div className="absolute top-32 right-1/4 text-xl text-orange-400/30 animate-pulse">🎖️</div>
                <div className="absolute bottom-32 left-1/3 text-lg text-green-400/30 animate-spin">⭐</div>
              </div>
              <div className="max-w-5xl w-full px-4 relative z-10">
                <CertificatesCard />
              </div>
            </div>
          </>
        )}        {/* Creative Section */}
        {activeFilter === 'Creative' && (
          <>
            <motion.div
              className="text-center mb-8 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>
              <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
                Creative Corner
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
              <p className="text-[var(--muted)] mt-2">My creative works and expressions</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)] relative">
              {/* Creative-themed decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-1/4 text-2xl text-pink-400/30 animate-spin">🎨</div>
                <div className="absolute top-32 right-1/4 text-xl text-purple-400/30 animate-bounce">✨</div>
                <div className="absolute bottom-32 left-1/3 text-lg text-indigo-400/30 animate-pulse">🌟</div>
                <div className="absolute bottom-16 right-1/3 text-sm text-cyan-400/30 animate-ping">💫</div>
              </div>
              <div className="max-w-7xl w-full px-4 relative z-10">
                <CreativeCard />
              </div>
            </div>
          </>
        )}        {/* Blogs Section */}
        {activeFilter === 'Blogs' && (
          <>
            <motion.div
              className="text-center mb-8 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#780000]/5 to-transparent blur-sm dark:via-[#c1121f]/5"></div>
              <h1 className="text-4xl font-moranga mb-2 relative text-[#780000] dark:text-[#c1121f]">
                My Blogs
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#780000] to-[#c1121f] mx-auto rounded-full animate-pulse dark:from-[#c1121f] dark:to-[#780000]"></div>
              <p className="text-[var(--muted)] mt-2">Sharing thoughts and experiences</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)] relative">
              {/* Blog-themed decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-1/4 text-2xl text-teal-400/30 animate-pulse">📝</div>
                <div className="absolute top-32 right-1/4 text-xl text-blue-400/30 animate-bounce">💭</div>
                <div className="absolute bottom-32 left-1/3 text-lg text-cyan-400/30 animate-spin">📚</div>
              </div>
              <div className="max-w-7xl w-full px-4 relative z-10">
                <BlogsCard />
              </div>
            </div>
          </>
        )}
      </main>      {/* Footer */}
      <footer className="text-center py-8 px-4 relative">
        {/* Decorative footer background */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        
        <motion.p
          className="text-[var(--muted)] font-silka text-sm relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Built by{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-medium">
            Bishal Shrestha
          </span>
          {' '}
        </motion.p>
        
        {/* Decorative sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-4 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute bottom-6 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
        </div>
      </footer>
    </div>
  );
}
