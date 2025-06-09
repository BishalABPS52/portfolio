'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useScreenSize } from '@/lib/ResponsiveUtils';

// Group tech stack by category for better organization
const TECH_STACK = {
  languages: [
    { name: 'C', img: 'https://img.shields.io/badge/C-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white' },
    { name: 'C++', img: 'https://img.shields.io/badge/C++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white' },
    { name: 'JavaScript', img: 'https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' },
    { name: 'Python', img: 'https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54' },
    { name: 'PHP', img: 'https://img.shields.io/badge/PHP-%2378B9EB.svg?style=for-the-badge&logo=php&logoColor=white' },
  ],
  frontend: [
    { name: 'React', img: 'https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white' },
    { name: 'Next.js', img: 'https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white' },
    { name: 'HTML', img: 'https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white' },
    { name: 'CSS', img: 'https://img.shields.io/badge/CSS-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white' },
    { name: 'TailwindCSS', img: 'https://img.shields.io/badge/TailwindCSS-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white' },
  ],
  backend: [
    { name: 'SQL', img: 'https://img.shields.io/badge/SQL-%2300C4CC.svg?style=for-the-badge&logo=sqlite&logoColor=white' },
    { name: 'MySQL', img: 'https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white' },
    { name: 'XAMPP', img: 'https://img.shields.io/badge/XAMPP-%23F3701F.svg?style=for-the-badge&logo=xampp&logoColor=white' },
  ],
  dataSci: [
    { name: 'NumPy', img: 'https://img.shields.io/badge/NumPy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white' },
    { name: 'Matplotlib', img: 'https://img.shields.io/badge/Matplotlib-%23D55B5B.svg?style=for-the-badge&logo=matplotlib&logoColor=white' },
    { name: 'Seaborn', img: 'https://img.shields.io/badge/Seaborn-%2307B7A7.svg?style=for-the-badge&logo=seaborn&logoColor=white' },
    { name: 'Jupyter', img: 'https://img.shields.io/badge/Jupyter-%23F37626.svg?style=for-the-badge&logo=jupyter&logoColor=white' },
  ],
  tools: [
    { name: 'Git', img: 'https://img.shields.io/badge/Git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white' },
    { name: 'GitHub', img: 'https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white' },
    { name: 'Adobe', img: 'https://img.shields.io/badge/Adobe-%23FF0000.svg?style=for-the-badge&logo=adobe&logoColor=white' },
    { name: 'Canva', img: 'https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white' },
    { name: 'Blender', img: 'https://img.shields.io/badge/Blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white' },
  ],
  gaming: [
    { name: 'Pygame', img: 'https://img.shields.io/badge/Pygame-%23A3A3A3.svg?style=for-the-badge&logo=pygame&logoColor=white' },
  ]
};

const ExperienceCard = () => {
  const { theme } = useTheme();
  const { isMobile } = useScreenSize();
  
  const renderTechGroup = (title: string, techs: typeof TECH_STACK['languages']) => (
    <div key={title} className="mb-4">
      <h4 className="text-xs sm:text-sm font-medium mb-2 text-[var(--muted)]">{title}</h4>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {techs.map((tech) => (
          <img 
            key={tech.name}
            src={tech.img}
            alt={tech.name}
            className="h-5 sm:h-6"
            loading="lazy"
            title={tech.name}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="rounded-3xl p-3 sm:p-6 h-full w-full sm:w-[calc(210%)] relative overflow-hidden grid-item border-[3px] border-[#003049] transition-colors duration-300"
      style={{ background: theme === 'dark' ? '#1c2128' : '#f8f9fa' }}
    >
      {/* Header */}
      <div className="mb-3 sm:mb-6">
        <h3 className="text-lg sm:text-2xl font-moranga text-black mb-1 sm:mb-2 text-center">Tech Stack</h3>
      </div>

      {/* Tech Stack Groups */}
      <div className="space-y-2 sm:space-y-4 overflow-y-auto max-h-[calc(100%-70px)] px-2">
        {renderTechGroup('Programming Languages', TECH_STACK.languages)}
        {renderTechGroup('Frontend Development', TECH_STACK.frontend)}
        {renderTechGroup('Backend & Database', TECH_STACK.backend)}
        {renderTechGroup('Data Science', TECH_STACK.dataSci)}
        {renderTechGroup('Tools & Design', TECH_STACK.tools)}
        {renderTechGroup('Game Development', TECH_STACK.gaming)}
      </div>
    </div>
  );
};

export default ExperienceCard;
