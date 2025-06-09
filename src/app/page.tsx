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
  }, []);
  const getFilteredComponents = () => {
    const allComponents = [      { component: <BioCard key="bio" />, category: 'About', size: 'col-span-1 md:col-span-2 row-span-1' },
      { component: <LocationCard key="location" />, category: 'About', size: 'col-span-1 md:col-span-1 row-span-1' },
      { component: <SkillsCard key="skills" />, category: 'About', size: 'col-span-1 md:col-span-1 row-span-1' },
      { component: <ExperienceCard key="experience" />, category: 'Skills', size: 'col-span-1 md:col-span-2 row-span-1' },
    ];

    if (activeFilter === 'PlayZone') {
      return (
        <div className="w-full">
          <PlayZone />
        </div>
      );
    }

    if (activeFilter === 'CV') {
      return (
        <div className="flex justify-center items-center w-full">
          <div className="relative max-w-2xl w-full">
            <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-teal-400/30 via-teal-200/20 to-blue-300/20 blur-2xl opacity-80" style={{ pointerEvents: 'none' }} />
            <div className={`relative z-10 rounded-2xl shadow-xl w-full p-8 bg-gradient-to-br from-teal-400/40 via-teal-200/30 to-blue-300/30 backdrop-blur-md ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <h1 className={`text-4xl font-moranga text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-teal-700'}`}>Curriculum Vitae</h1>
              <div className="prose max-w-none mx-auto">
                <h2 className="text-2xl font-bold mb-2">Bishal Shrestha</h2>
                <p><strong>Location:</strong> Kathmandu, Nepal</p>
                <p><strong>Phone:</strong> +9779765532314</p>
                <p><strong>Email:</strong> bs426808@gmail.com</p>
                <hr className="my-4" />
                <h3 className="text-xl font-bold mb-1">Profile</h3>
                <p>
                  Versatile and results-driven developer specializing in web and software development, game testing, and backend solutions. Proficient in C++, Python, JavaScript, React, and Node.js. Passionate about innovation and problem-solving.
                </p>
                <hr className="my-4" />
                <h3 className="text-xl font-bold mb-1">Experience</h3>
                <ul className="list-disc pl-5">
                  <li><strong>Freelancer (2023 - Present):</strong> Upwork, Fiverr, PeoplePerHour<br />- Developed websites using HTML, CSS, JavaScript, PHP<br />- Backend solutions with SQL and PHP<br />- Data entry, typing, content writing</li>
                  <li><strong>Game Tester (2023 - Present):</strong> Tested mechanics, UI, performance, reported bugs and suggested improvements</li>
                  <li><strong>Part-Time Tuition Teacher (2022 - 2023):</strong> Taught Math, Science, Additional Math, Computer Science</li>
                </ul>
                <hr className="my-4" />
                <h3 className="text-xl font-bold mb-1">Education</h3>
                <ul className="list-disc pl-5">
                  <li>SEE (2009–2021), Rastriya Vibhuti Samudayik Shiksha Sadan – GPA: 4.0</li>
                  <li>NEB +2 Science (2021–2023), Capital College and Research Center – GPA: 3.65</li>
                  <li>Bachelor in Computer Engineering (2023–Present), IOE Thapathali</li>
                </ul>
                <hr className="my-4" />
                <h3 className="text-xl font-bold mb-1">Skills</h3>
                <ul className="list-disc pl-5">
                  <li>Web Development: HTML, CSS, JavaScript, PHP, React, Node.js</li>
                  <li>Game Testing: Bug reporting, gameplay analysis, debugging tools</li>
                  <li>Software: C, C++, Python</li>
                  <li>Database & Backend: SQL, PHP</li>
                  <li>Version Control: Git, GitHub</li>
                  <li>Freelancing: Data entry, typing, copywriting</li>
                </ul>
                <hr className="my-4" />
                <h3 className="text-xl font-bold mb-1">Hobbies</h3>
                <ul className="list-disc pl-5">
                  <li>Writing & Reading Books</li>
                  <li>Programming/Coding</li>
                  <li>Game Testing & Debugging</li>
                </ul>
              </div>
              <div className="w-full flex justify-center mt-8">
                <a
                  href="https://drive.google.com/uc?export=download&id=1daAdfqAaQiI96vRhH5XqgyOit654SY1w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--card-background)] border border-[var(--border)] rounded-full font-silka-medium text-sm text-[var(--foreground)] shadow-lg hover:opacity-80 transition-all duration-300"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
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
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Message: only show on Home */}
        {activeFilter === 'Home' && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
              Welcome to my portfolio
            </h1>
            <p className="text-[var(--muted)] font-silka"></p>
          </motion.div>
        )}        {/* About Me Heading: only show on About */}
        {activeFilter === 'About' && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
              About me
            </h1>
          </motion.div>
        )}

        {/* Skills Heading: only show on Skills */}
        {activeFilter === 'Skills' && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
              My Skills
            </h1>
            <p className="text-[var(--muted)] font-silka">Technical expertise and proficiencies</p>
          </motion.div>
        )}

        {/* Main Grid Layout: Home, Skills, or About */}
        {(activeFilter === 'Home' || activeFilter === 'Skills' || activeFilter === 'About') && (
          <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl w-full px-4">              {getFilteredComponents()}
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
        )}

        {/* Featured Projects Section - Only show on Home */}
        {activeFilter === 'Home' && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-moranga" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                  Featured Projects
                </h2>
                <p className="text-[var(--muted)] text-sm">Highlighted works and achievements</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProjectsShowcase />
            </div>
          </motion.div>
        )}        {/* PlayZone Section */}
        {activeFilter === 'PlayZone' && (
          <>
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                Play Zone
              </h1>
              <p className="text-[var(--muted)]">Interactive games and applications</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)]">
              <div className="max-w-7xl w-full px-4">
                <PlayZone />
              </div>
            </div>
          </>
        )}        {/* Projects Section */}
        {activeFilter === 'Projects' && (
          <>
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                My Projects
              </h1>
              <p className="text-[var(--muted)]">All repositories from my GitHub profile</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)]">
              <div className="max-w-5xl w-full px-4">
                <GitHubProjects />
              </div>
            </div>
          </>
        )}

        {/* Certificates Section */}
        {activeFilter === 'Certificates' && (
          <>
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                My Certificates
              </h1>
              <p className="text-[var(--muted)]">Achievements and qualifications</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)]">
              <div className="max-w-5xl w-full px-4">
                <CertificatesCard />
              </div>
            </div>
          </>
        )}

        {/* Creative Section */}
        {activeFilter === 'Creative' && (
          <>
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                Creative Corner
              </h1>
              <p className="text-[var(--muted)]">My creative works and expressions</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)]">
              <div className="max-w-7xl w-full px-4">
                <CreativeCard />
              </div>
            </div>
          </>
        )}        {/* Blogs Section */}
        {activeFilter === 'Blogs' && (
          <>
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                My Blogs
              </h1>
              <p className="text-[var(--muted)]">Sharing thoughts and experiences</p>
            </motion.div>
            <div className="flex justify-center items-start min-h-[calc(100vh-280px)] bg-[var(--background)]">
              <div className="max-w-7xl w-full px-4">
                <BlogsCard />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <motion.p
          className="text-[var(--muted)] font-silka text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Built by Bishal Shrestha 
        </motion.p>
      </footer>
    </div>
  );
}
