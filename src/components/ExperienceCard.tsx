'use client';

import { useTheme } from '@/contexts/ThemeContext';

const ExperienceCard = () => {
  const { theme } = useTheme();
  return (
    <div
      className="rounded-3xl p-6 h-[calc(100%)] w-[calc(210%)] relative overflow-hidden grid-item border-[3px] border-[#003049] transition-colors duration-300"
      style={{ background: theme === 'dark' ? '#1c2128' : '#f8f9fa' }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-moranga text-black mb-2 text-center">Tech Stack</h3>
      </div>

      {/* Tech Stack Logos */}
      <div className="flex flex-wrap justify-center gap-4">
        <img src="https://img.shields.io/badge/C-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white" alt="C" className="h-8" />
        <img src="https://img.shields.io/badge/C++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" className="h-8" />
        <img src="https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" className="h-8" />
        <img src="https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" className="h-8" />
        <img src="https://img.shields.io/badge/NumPy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy" className="h-8" />
        <img src="https://img.shields.io/badge/Matplotlib-%23D55B5B.svg?style=for-the-badge&logo=matplotlib&logoColor=white" alt="Matplotlib" className="h-8" />
        <img src="https://img.shields.io/badge/Seaborn-%2307B7A7.svg?style=for-the-badge&logo=seaborn&logoColor=white" alt="Seaborn" className="h-8" />
        <img src="https://img.shields.io/badge/Pygame-%23A3A3A3.svg?style=for-the-badge&logo=pygame&logoColor=white" alt="Pygame" className="h-8" />
        <img src="https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white" alt="React" className="h-8" />
        <img src="https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" className="h-8" />
        <img src="https://img.shields.io/badge/Git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git" className="h-8" />
        <img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" className="h-8" />
        <img src="https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" className="h-8" />
        <img src="https://img.shields.io/badge/CSS-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" className="h-8" />
        <img src="https://img.shields.io/badge/TailwindCSS-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" className="h-8" />
        <img src="https://img.shields.io/badge/SQL-%2300C4CC.svg?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQL" className="h-8" />
        <img src="https://img.shields.io/badge/Adobe-%23FF0000.svg?style=for-the-badge&logo=adobe&logoColor=white" alt="Adobe" className="h-8" />
        <img src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white" alt="Canva" className="h-8" />
        <img src="https://img.shields.io/badge/PHP-%2378B9EB.svg?style=for-the-badge&logo=php&logoColor=white" alt="PHP" className="h-8" />
        <img src="https://img.shields.io/badge/Jupyter-%23F37626.svg?style=for-the-badge&logo=jupyter&logoColor=white" alt="Jupyter" className="h-8" />
        <img src="https://img.shields.io/badge/Blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white" alt="Blender" className="h-8" />
        <img src="https://img.shields.io/badge/XAMPP-%23F3701F.svg?style=for-the-badge&logo=xampp&logoColor=white" alt="XAMPP" className="h-8" />
        <img src="https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" className="h-8" />
      </div>
    </div>
  );
};

export default ExperienceCard;
