'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreenSize } from '@/lib/ResponsiveUtils';
import { ChevronDown, ChevronUp, Code, Database, Palette, Gamepad2, Wrench, Brain } from 'lucide-react';

// Enhanced tech stack with better organization and icons
import { LucideIcon } from 'lucide-react';

interface TechItem {
  name: string;
  img: string;
  level: 'Advanced' | 'Intermediate' | 'Beginner';
}

interface TechCategory {
  icon: LucideIcon;
  color: string;
  techs: TechItem[];
}

interface TechStackType {
  [key: string]: TechCategory;
}

const TECH_STACK: TechStackType = {  languages: {
    icon: Code,
    color: '#4F46E5',
    techs: [
      { name: 'C', img: 'https://img.shields.io/badge/C-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white', level: 'Advanced' },
      { name: 'C++', img: 'https://img.shields.io/badge/C++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white', level: 'Advanced' },
      { name: 'JavaScript', img: 'https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E', level: 'Intermediate' },
      { name: 'TypeScript', img: 'https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white', level: 'Intermediate' },
      { name: 'Python', img: 'https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54', level: 'Intermediate' },
      { name: 'PHP', img: 'https://img.shields.io/badge/PHP-%2378B9EB.svg?style=for-the-badge&logo=php&logoColor=white', level: 'Beginner' },
    ]
  },
  frontend: {
    icon: Palette,
    color: '#06B6D4',
    techs: [
      { name: 'React', img: 'https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white', level: 'Intermediate' },
      { name: 'Next.js', img: 'https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white', level: 'Beginner' },
      { name: 'TailwindCSS', img: 'https://img.shields.io/badge/TailwindCSS-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white', level: 'Beginner' },
      { name: 'HTML5', img: 'https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white', level: 'Advanced' },
      { name: 'CSS3', img: 'https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white', level: 'Intermediate' },
      { name: 'Framer Motion', img: 'https://img.shields.io/badge/Framer%20Motion-%23000000.svg?style=for-the-badge&logo=framer&logoColor=white', level: 'Intermediate' },
    ]
  },  backend: {
    icon: Database,
    color: '#16A34A',
    techs: [
      { name: 'Node.js', img: 'https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white', level: 'Beginner' },
      { name: 'MongoDB', img: 'https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white', level: 'Beginner' },
      { name: 'MySQL', img: 'https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white', level: 'Beginner' },
      { name: 'SQL', img: 'https://img.shields.io/badge/SQL-%2300C4CC.svg?style=for-the-badge&logo=sqlite&logoColor=white', level: 'Intermediate' },
      { name: 'XAMPP', img: 'https://img.shields.io/badge/XAMPP-%23F3701F.svg?style=for-the-badge&logo=xampp&logoColor=white', level: 'Beginner' },
    ]
  },
  dataSci: {
    icon: Brain,
    color: '#DC2626',
    techs: [
      { name: 'NumPy', img: 'https://img.shields.io/badge/NumPy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white', level: 'Intermediate' },
      { name: 'Pandas', img: 'https://img.shields.io/badge/Pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white', level: 'Intermediate' },
      { name: 'Matplotlib', img: 'https://img.shields.io/badge/Matplotlib-%23D55B5B.svg?style=for-the-badge&logo=matplotlib&logoColor=white', level: 'Intermediate' },
      { name: 'Seaborn', img: 'https://img.shields.io/badge/Seaborn-%2307B7A7.svg?style=for-the-badge&logo=seaborn&logoColor=white', level: 'Beginner' },
      { name: 'Jupyter', img: 'https://img.shields.io/badge/Jupyter-%23F37626.svg?style=for-the-badge&logo=jupyter&logoColor=white', level: 'Intermediate' },
    ]
  },  tools: {
    icon: Wrench,
    color: '#7C3AED',
    techs: [
      { name: 'Git', img: 'https://img.shields.io/badge/Git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white', level: 'Beginner' },
      { name: 'GitHub', img: 'https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white', level: 'Beginner' },
      { name: 'VS Code', img: 'https://img.shields.io/badge/VS%20Code-%23007ACC.svg?style=for-the-badge&logo=visualstudiocode&logoColor=white', level: 'Intermediate' },
      { name: 'Adobe CC', img: 'https://img.shields.io/badge/Adobe%20CC-%23FF0000.svg?style=for-the-badge&logo=adobe&logoColor=white', level: 'Intermediate' },
      { name: 'Figma', img: 'https://img.shields.io/badge/Figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white', level: 'Intermediate' },
      { name: 'Canva', img: 'https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white', level: 'Intermediate' },
      { name: 'Blender', img: 'https://img.shields.io/badge/Blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white', level: 'Beginner' },
    ]
  },
  gaming: {
    icon: Gamepad2,
    color: '#EA580C',
    techs: [
      { name: 'Pygame', img: 'https://img.shields.io/badge/Pygame-%23A3A3A3.svg?style=for-the-badge&logo=pygame&logoColor=white', level: 'Intermediate' },
      { name: 'SFML', img: 'https://img.shields.io/badge/SFML-%2300C4CC.svg?style=for-the-badge&logo=sfml&logoColor=white', level: 'Beginner' },
      { name: 'Game Testing', img: 'https://img.shields.io/badge/Game%20Testing-%23FF6B6B.svg?style=for-the-badge&logo=game&logoColor=white', level: 'Intermediate' },
    ]
  }
};

const ExperienceCard = () => {
  const { theme } = useTheme();
  const { isMobile } = useScreenSize();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced': return theme === 'dark' ? '#10B981' : '#059669';
      case 'Intermediate': return theme === 'dark' ? '#F59E0B' : '#D97706';
      case 'Beginner': return theme === 'dark' ? '#EF4444' : '#DC2626';
      default: return theme === 'dark' ? '#6B7280' : '#374151';
    }
  };

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
  const renderTechGroup = (key: string, category: TechCategory) => {
    const isExpanded = expandedSection === key;
    const IconComponent = category.icon;
    
    return (
      <motion.div
        key={key}
        variants={itemVariants}
        className="mb-6 last:mb-0"
      >
        {/* Category Header */}
        <motion.button
          onClick={() => setExpandedSection(isExpanded ? null : key)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[var(--card-background)] to-[var(--background)] border border-[var(--border)] hover:shadow-md transition-all duration-300 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              <IconComponent size={isMobile ? 16 : 20} />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-[var(--foreground)] capitalize">
                {key === 'dataSci' ? 'Data Science' : key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-xs text-[var(--muted)]">
                {category.techs.length} technologies
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
          </motion.div>
        </motion.button>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.techs.map((tech: TechItem, index: number) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="group relative"
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent-green)]/30 transition-all duration-300 hover:shadow-sm">
                    <img 
                      src={tech.img}
                      alt={tech.name}
                      className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate">
                        {tech.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div 
                          className="h-1.5 w-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
                        >
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              backgroundColor: getLevelColor(tech.level),
                              width: tech.level === 'Advanced' ? '100%' : tech.level === 'Intermediate' ? '70%' : '40%'
                            }}
                          />
                        </div>
                        <span 
                          className="text-xs font-medium"
                          style={{ color: getLevelColor(tech.level) }}
                        >
                          {tech.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[var(--foreground)] text-[var(--background)] text-xs rounded-lg whitespace-nowrap z-10"
                    >
                      {tech.level} proficiency in {tech.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[var(--foreground)]" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div
      className="rounded-3xl p-4 sm:p-6 h-full w-full sm:w-[calc(210%)] relative overflow-hidden grid-item border-[3px] border-[#003049] transition-colors duration-300"
      style={{ 
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1c2128 0%, #161b22 100%)' 
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[var(--accent-green)]/10 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[var(--accent-blue)]/10 to-transparent rounded-full blur-xl" />
      </div>

      {/* Header */}
      <motion.div 
        className="relative z-10 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-purple)] text-white">
            <Code size={isMobile ? 20 : 24} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-moranga text-[var(--foreground)]">
              Tech Stack
            </h3>
            <p className="text-sm text-[var(--muted)]">
              My technical expertise & tools
            </p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--accent-green)]">
              {Object.values(TECH_STACK).reduce((total, category) => total + category.techs.length, 0)}
            </div>
            <div className="text-xs text-[var(--muted)]">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--accent-blue)]">
              {Object.keys(TECH_STACK).length}
            </div>
            <div className="text-xs text-[var(--muted)]">Categories</div>
          </div>          <div className="text-center">
            <div className="text-lg font-bold text-[var(--accent-purple)]">
              {Object.values(TECH_STACK).reduce((total: number, category: TechCategory) => 
                total + category.techs.filter((tech: TechItem) => tech.level === 'Advanced').length, 0
              )}
            </div>
            <div className="text-xs text-[var(--muted)]">Advanced</div>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Groups */}
      <motion.div 
        className="relative z-10 space-y-2 overflow-y-auto max-h-[calc(100%-180px)] pr-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(TECH_STACK).map(([key, category]) => 
          renderTechGroup(key, category)
        )}
      </motion.div>

      {/* Floating Action Hint */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-4 right-4 text-xs text-[var(--muted)] flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Click to expand</span>
          <ChevronDown size={12} />
        </motion.div>
      )}
    </div>
  );
};

export default ExperienceCard;
