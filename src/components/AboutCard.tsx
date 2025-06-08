'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';

export default function AboutCard() {
  const { theme } = useTheme();

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl bg-[var(--card-background)] border-[3px] border-[#003049] h-full transition-colors duration-300">
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-teal-400/30 via-teal-200/20 to-blue-300/20 blur-2xl opacity-80" style={{ pointerEvents: 'none' }} />
      <div className="relative z-10 p-4 sm:p-6">
        <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-moranga mb-2 sm:mb-4" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                BISHAL SHRESTHA
              </h2>
              <p className="text-[var(--muted)] text-xs sm:text-sm mb-2 sm:mb-4">
                Computer Engineering Student at IOE, THAPATHALI | Web Developer | Software Engineering Enthusiast
              </p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-bold">About me</h3>
              <span className="text-xs text-[var(--muted)] bg-[var(--foreground)]/5 px-2 py-1 rounded-full mt-1 sm:mt-0 inline-block sm:inline w-fit">
                Personal Portfolio
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted)] mb-2 sm:mb-4">
              A Personal introduction and overview of my journey
            </p>
          </div>
          <p className="text-sm sm:text-base mb-3 sm:mb-4">
            "Versatile and results-driven developer specializing in web and software development and game testing. 
            Proficient in C++, Python, JavaScript, React, and Node.js, I craft dynamic and responsive websites, 
            build efficient software, games and ensure seamless game performance. Passionate about innovation and problem-solving."
          </p>

          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">📚 Current Focus:</h3>
          <p className="text-sm sm:text-base mb-3 sm:mb-4">
            I am currently focusing on learning Data Science, Software Development, Game Development, 
            and Backend Technologies. Through personal projects, I continue to build my portfolio and 
            contribute to the open-source community.
          </p>

          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">🔝 Key Areas:</h3>
          <ul className="list-disc pl-4 sm:pl-5 mb-3 sm:mb-4 text-sm sm:text-base">
            <li><strong>Web Development:</strong> HTML5, CSS, JavaScript, React, Next.js, TailwindCSS</li>
            <li><strong>Programming:</strong> C++, Python, PHP</li>
            <li><strong>Data Science:</strong> NumPy, Matplotlib, Seaborn</li>
            <li><strong>Game Development:</strong> SFML, Game Testing</li>
            <li><strong>Backend:</strong> Node.js, MySQL, XAMPP</li>
          </ul>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-[var(--muted)] italic">
              "Building digital experiences, one line of code at a time."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
