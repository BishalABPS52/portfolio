'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Code2, BookOpen, BrainCircuit } from 'lucide-react';

const LearnCard = () => {
  const { theme } = useTheme();
  
  return (
    <div
      className="rounded-3xl p-6 h-[calc(100%)] w-[calc(100%)] relative overflow-hidden grid-item border-[3px] border-[#003049] transition-colors duration-300"
      style={{ background: theme === 'dark' ? '#1c2128' : '#f8f9fa' }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-2xl font-moranga text-black mb-2 text-center">📚 Ongoing Learning</h3>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <p className="text-[var(--muted)] text-sm leading-relaxed">
          I am currently focusing on learning Data Science, Software Development, Game Development, and Backend Technologies deploying websites efficiently. I also work on personal projects that challenge my creativity and technical skills. Through these, I hope to further build my portfolio and contribute to the open-source community.
        </p>

        <div className="space-y-4">
          <h4 className="text-lg font-moranga flex items-center gap-2">
            <BrainCircuit className="w-5 h-5" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }} />
            <span style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>Here's What I'm Learning:</span>
          </h4>
          
          <ul className="list-none space-y-3">
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }} />
              <span className="text-[var(--muted)] text-sm">Python for data analysis and machine learning</span>
            </li>
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }} />
              <span className="text-[var(--muted)] text-sm">NumPy, Matplotlib, and Seaborn for statistical computing, data visualization, and analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }} />
              <span className="text-[var(--muted)] text-sm">Jupyter Notebooks for creating interactive data science workflows</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearnCard;