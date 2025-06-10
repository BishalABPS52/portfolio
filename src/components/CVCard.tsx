'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, User, MapPin, Phone, Mail, Briefcase, GraduationCap, Code, Heart, Star, Sparkles, Award } from 'lucide-react';
import { useState } from 'react';

const CVCard = () => {
  const { theme } = useTheme();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center h-full overflow-hidden rounded-3xl ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-red-50 via-white to-red-100' 
        : 'bg-gradient-to-br from-gray-900 via-black to-red-950'
    }`}>
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating particles */}
        <motion.div
          className={`absolute top-10 left-10 w-32 h-32 rounded-full blur-xl opacity-20 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-red-300 to-red-500' 
              : 'bg-gradient-to-r from-red-800 to-red-600'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-10 right-10 w-24 h-24 rounded-full blur-xl opacity-15 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-red-400 to-red-600' 
              : 'bg-gradient-to-r from-red-700 to-red-900'
          }`}
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -90, 0],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Additional decorative elements */}
        <motion.div
          className={`absolute top-1/2 left-1/4 w-4 h-4 rounded-full ${
            theme === 'light' ? 'bg-red-300' : 'bg-red-700'
          }`}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div
          className={`absolute top-1/4 right-1/3 w-6 h-6 rounded-full ${
            theme === 'light' ? 'bg-red-200' : 'bg-red-800'
          }`}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        
        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 opacity-5 ${
          theme === 'light' ? 'bg-red-900' : 'bg-red-300'
        }`} style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={`rounded-3xl shadow-2xl overflow-hidden border-2 ${
          theme === 'light' 
            ? 'bg-gradient-to-br from-white via-red-50 to-white backdrop-blur-lg border-red-200/30' 
            : 'bg-gradient-to-br from-black via-red-950 to-black backdrop-blur-lg border-red-800/30'
        }`}>
          {/* Header Section with Enhanced Design */}
          <div className={`relative px-6 py-8 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-red-600 to-red-800' 
              : 'bg-gradient-to-r from-red-900 to-black'
          }`}>
            {/* Header decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-full animate-pulse" />
              <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white/20 rounded-full animate-bounce" />
              <div className="absolute bottom-4 left-1/3 w-4 h-4 border border-white/20 rounded-full animate-ping" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <motion.div 
              className="relative z-10 text-center"
              variants={itemVariants}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 border-2 border-white/30"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <User size={36} className="text-white" />
              </motion.div>
              <motion.h1 
                className="text-3xl md:text-4xl font-moranga text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Curriculum Vitae
              </motion.h1>
              <motion.p 
                className="text-white/90 text-lg flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Star size={16} className="text-yellow-300" />
                Bishal Shrestha
                <Star size={16} className="text-yellow-300" />
              </motion.p>
            </motion.div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Contact Information with Enhanced Animation */}
            <motion.section 
              className="grid md:grid-cols-3 gap-4"
              variants={sectionVariants}
              onHoverStart={() => setHoveredSection('contact')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover="hover"
            >
              {[
                { icon: MapPin, text: 'Kathmandu, Nepal' },
                { icon: Phone, text: '+9779765532314' },
                { icon: Mail, text: 'bs426808@gmail.com' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <motion.div 
                    className={`p-2 rounded-lg ${
                      theme === 'light' ? 'bg-red-100' : 'bg-red-900/30'
                    }`}
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                  >
                    <item.icon size={16} className={theme === 'light' ? 'text-red-600' : 'text-red-400'} />
                  </motion.div>
                  <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.section>

            {/* Profile Section with Enhanced Styling */}
            <motion.section 
              variants={sectionVariants}
              onHoverStart={() => setHoveredSection('profile')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover="hover"
              className={`relative p-4 rounded-lg transition-all duration-300 ${
                hoveredSection === 'profile' 
                  ? theme === 'light' 
                    ? 'bg-red-50 shadow-md' 
                    : 'bg-red-950/30 shadow-lg'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className={`p-2 rounded-lg ${
                    theme === 'light' ? 'bg-red-100' : 'bg-red-900/30'
                  }`}
                  variants={iconVariants}
                  initial="idle"
                  whileHover="hover"
                >
                  <User size={20} className={theme === 'light' ? 'text-red-600' : 'text-red-400'} />
                </motion.div>
                <motion.h2 
                  className={`text-xl font-bold ${
                    theme === 'light' ? 'text-red-700' : 'text-red-400'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  Profile
                </motion.h2>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles size={16} className={theme === 'light' ? 'text-red-500' : 'text-red-300'} />
                </motion.div>
              </div>
              <motion.p 
                className={`leading-relaxed pl-11 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                Versatile and results-driven developer specializing in web and software development, backend solutions, and innovative problem-solving. Proficient in C++, Python, JavaScript, React, and Node.js with a passion for creating impactful digital experiences.
              </motion.p>
            </motion.section>

            {/* Experience Section with Enhanced Animation */}
            <motion.section 
              variants={sectionVariants}
              onHoverStart={() => setHoveredSection('experience')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover="hover"
              className={`relative p-4 rounded-lg transition-all duration-300 ${
                hoveredSection === 'experience' 
                  ? theme === 'light' 
                    ? 'bg-red-50 shadow-md' 
                    : 'bg-red-950/30 shadow-lg'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className={`p-2 rounded-lg ${
                    theme === 'light' ? 'bg-red-100' : 'bg-red-900/30'
                  }`}
                  variants={iconVariants}
                  initial="idle"
                  whileHover="hover"
                >
                  <Briefcase size={20} className={theme === 'light' ? 'text-red-600' : 'text-red-400'} />
                </motion.div>
                <motion.h2 
                  className={`text-xl font-bold ${
                    theme === 'light' ? 'text-red-700' : 'text-red-400'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  Experience
                </motion.h2>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Award size={16} className={theme === 'light' ? 'text-red-500' : 'text-red-300'} />
                </motion.div>
              </div>
              <div className="pl-11 space-y-4">
                <motion.div 
                  className={`p-4 rounded-lg border-l-4 relative overflow-hidden ${
                    theme === 'light' 
                      ? 'bg-red-50 border-red-500 shadow-sm' 
                      : 'bg-red-950/20 border-red-500 shadow-md'
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className={`absolute inset-0 ${
                      theme === 'light' ? 'bg-red-100' : 'bg-red-900/20'
                    }`}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <motion.h3 
                      className={`font-semibold mb-2 ${
                        theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Freelancer (2023 - Present)
                    </motion.h3>
                    <p className={`text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Upwork, Fiverr, PeoplePerHour
                    </p>
                    <ul className={`text-sm space-y-1 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      <motion.li whileHover={{ x: 5 }}>• Developed responsive websites using HTML, CSS, JavaScript, PHP</motion.li>
                      <motion.li whileHover={{ x: 5 }}>• Built robust backend solutions with SQL and PHP</motion.li>
                      <motion.li whileHover={{ x: 5 }}>• Provided data entry, typing, and content writing services</motion.li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Education Section with Enhanced Design */}
            <motion.section 
              variants={sectionVariants}
              onHoverStart={() => setHoveredSection('education')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover="hover"
              className={`relative p-4 rounded-lg transition-all duration-300 ${
                hoveredSection === 'education' 
                  ? theme === 'light' 
                    ? 'bg-red-50 shadow-md' 
                    : 'bg-red-950/30 shadow-lg'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className={`p-2 rounded-lg ${
                    theme === 'light' ? 'bg-red-100' : 'bg-red-900/30'
                  }`}
                  variants={iconVariants}
                  initial="idle"
                  whileHover="hover"
                >
                  <GraduationCap size={20} className={theme === 'light' ? 'text-red-600' : 'text-red-400'} />
                </motion.div>
                <motion.h2 
                  className={`text-xl font-bold ${
                    theme === 'light' ? 'text-red-700' : 'text-red-400'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  Education
                </motion.h2>
              </div>
              <div className="pl-11 space-y-3">
                {[
                  {
                    title: 'Bachelor in Computer Engineering',
                    institution: 'IOE Thapathali',
                    period: '2023 – Present'
                  },
                  {
                    title: 'NEB +2 Science',
                    institution: 'Capital College and Research Center – GPA: 3.65',
                    period: '2021 – 2023'
                  },
                  {
                    title: 'SEE',
                    institution: 'Rastriya Vibhuti Samudayik Shiksha Sadan – GPA: 4.0',
                    period: '2009 – 2021'
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col md:flex-row md:justify-between md:items-center p-2 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      x: 5, 
                      backgroundColor: theme === 'light' ? '#fef2f2' : '#7f1d1d20'
                    }}
                  >
                    <div>
                      <motion.h3 
                        className={`font-semibold ${
                          theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {item.title}
                      </motion.h3>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {item.institution}
                      </p>
                    </div>
                    <span className={`text-sm ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {item.period}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Skills Section with Enhanced Animations */}
            <motion.section 
              variants={sectionVariants}
              onHoverStart={() => setHoveredSection('skills')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover="hover"
              className={`relative p-4 rounded-lg transition-all duration-300 ${
                hoveredSection === 'skills' 
                  ? theme === 'light' 
                    ? 'bg-red-50 shadow-md' 
                    : 'bg-red-950/30 shadow-lg'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className={`p-2 rounded-lg ${
                    theme === 'light' ? 'bg-red-100' : 'bg-red-900/30'
                  }`}
                  variants={iconVariants}
                  initial="idle"
                  whileHover="hover"
                >
                  <Code size={20} className={theme === 'light' ? 'text-red-600' : 'text-red-400'} />
                </motion.div>
                <motion.h2 
                  className={`text-xl font-bold ${
                    theme === 'light' ? 'text-red-700' : 'text-red-400'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  Skills
                </motion.h2>
              </div>
              <div className="pl-11 grid md:grid-cols-2 gap-3">
                {[
                  { title: 'Web Development', skills: 'HTML, CSS, JavaScript, PHP, React, Node.js' },
                  { title: 'Programming', skills: 'C, C++, Python' },
                  { title: 'Database & Backend', skills: 'SQL, PHP' },
                  { title: 'Tools & Services', skills: 'Git, GitHub, Data entry, Content writing' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="space-y-2 p-3 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: theme === 'light' ? '#fef2f2' : '#7f1d1d20'
                    }}
                  >
                    <motion.h4 
                      className={`font-semibold text-sm ${
                        theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                      }`}
                      whileHover={{ x: 3 }}
                    >
                      {item.title}
                    </motion.h4>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {item.skills}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Hobbies Section with Enhanced Animation */}
            <motion.section 
              variants={sectionVariants}
              onHoverStart={() => setHoveredSection('hobbies')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover="hover"
              className={`relative p-4 rounded-lg transition-all duration-300 ${
                hoveredSection === 'hobbies' 
                  ? theme === 'light' 
                    ? 'bg-red-50 shadow-md' 
                    : 'bg-red-950/30 shadow-lg'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className={`p-2 rounded-lg ${
                    theme === 'light' ? 'bg-red-100' : 'bg-red-900/30'
                  }`}
                  variants={iconVariants}
                  initial="idle"
                  whileHover="hover"
                >
                  <Heart size={20} className={theme === 'light' ? 'text-red-600' : 'text-red-400'} />
                </motion.div>
                <motion.h2 
                  className={`text-xl font-bold ${
                    theme === 'light' ? 'text-red-700' : 'text-red-400'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  Hobbies
                </motion.h2>
              </div>
              <div className="pl-11 flex flex-wrap gap-2">
                {['Writing & Reading Books', 'Programming/Coding', 'Problem Solving'].map((hobby, index) => (
                  <motion.span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      theme === 'light' 
                        ? 'bg-red-100 text-red-700 border-red-200' 
                        : 'bg-red-900/30 text-red-300 border-red-700'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      boxShadow: theme === 'light' 
                        ? '0 4px 12px rgba(220, 38, 38, 0.3)' 
                        : '0 4px 12px rgba(220, 38, 38, 0.4)'
                    }}
                  >
                    {hobby}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Enhanced Download Button */}
            <motion.div 
              className="flex justify-center pt-6"
              variants={itemVariants}
            >
              <motion.a
                href="https://drive.google.com/uc?export=download&id=1daAdfqAaQiI96vRhH5XqgyOit654SY1w"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-silka-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden ${
                  theme === 'light' 
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900' 
                    : 'bg-gradient-to-r from-red-800 to-red-900 text-white hover:from-red-700 hover:to-red-800'
                }`}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsDownloading(true)}
                onHoverEnd={() => setIsDownloading(false)}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600"
                  initial={{ x: '-100%' }}
                  animate={isDownloading ? { x: '0%' } : { x: '-100%' }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  animate={isDownloading ? { translateX: '200%' } : {}}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Button content */}
                <motion.div
                  className="relative z-10 flex items-center gap-3"
                  animate={isDownloading ? { scale: 1.05 } : { scale: 1 }}
                >
                  <motion.div
                    animate={isDownloading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Download size={18} />
                  </motion.div>
                  <span>Download CV</span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⭐
                  </motion.div>
                </motion.div>
                
                {/* Floating decoration */}
                <AnimatePresence>
                  {isDownloading && (
                    <motion.div
                      className="absolute -top-2 -right-2 text-yellow-300"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✨
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CVCard;
