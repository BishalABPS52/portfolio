'use client';

import { useTheme } from '@/contexts/ThemeContext';

const CVCard = () => {
  const { theme } = useTheme();
  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-teal-400/30 via-teal-200/20 to-blue-300/20 blur-2xl opacity-80" style={{ pointerEvents: 'none' }} />
      <div className={`relative z-10 w-full flex flex-col items-center justify-center`}>
        <div className={`rounded-2xl shadow-xl max-w-2xl w-full p-4 sm:p-8 bg-gradient-to-br from-teal-400/40 via-teal-200/30 to-blue-300/30 backdrop-blur-md ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <h1 className={`text-2xl sm:text-4xl font-moranga text-center mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-teal-700'}`}>Curriculum Vitae</h1>
          <div className="prose prose-sm sm:prose max-w-none mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#fff' : '#780000' }}>Bishal Shrestha</h2>
            <p><strong>Location:</strong> Kathmandu, Nepal</p>
            <p><strong>Phone:</strong> +9779765532314</p>
            <p><strong>Email:</strong> bs426808@gmail.com</p>
            <hr className="my-3 sm:my-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: theme === 'dark' ? '#fff' : '#780000' }}>Profile</h3>
            <p className="text-sm sm:text-base">
              Versatile and results-driven developer specializing in web and software development, game testing, and backend solutions. Proficient in C++, Python, JavaScript, React, and Node.js. Passionate about innovation and problem-solving.
            </p>
            <hr className="my-3 sm:my-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: theme === 'dark' ? '#fff' : '#780000' }}>Experience</h3>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
              <li><strong>Freelancer (2023 - Present):</strong> Upwork, Fiverr, PeoplePerHour<br />- Developed websites using HTML, CSS, JavaScript, PHP<br />- Backend solutions with SQL and PHP<br />- Data entry, typing, content writing</li>
              <li><strong>Game Tester (2023 - Present):</strong> Tested mechanics, UI, performance, reported bugs and suggested improvements</li>
              <li><strong>Part-Time Tuition Teacher (2022 - 2023):</strong> Taught Math, Science, Additional Math, Computer Science</li>
            </ul>
            <hr className="my-3 sm:my-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: theme === 'dark' ? '#fff' : '#780000' }}>Education</h3>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
              <li>SEE (2009–2021), Rastriya Vibhuti Samudayik Shiksha Sadan – GPA: 4.0</li>
              <li>NEB +2 Science (2021–2023), Capital College and Research Center – GPA: 3.65</li>
              <li>Bachelor in Computer Engineering (2023–Present), IOE Thapathali</li>
            </ul>
            <hr className="my-3 sm:my-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: theme === 'dark' ? '#fff' : '#780000' }}>Skills</h3>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
              <li>Web Development: HTML, CSS, JavaScript, PHP, React, Node.js</li>
              <li>Game Testing: Bug reporting, gameplay analysis, debugging tools</li>
              <li>Software: C, C++, Python</li>
              <li>Database & Backend: SQL, PHP</li>
              <li>Version Control: Git, GitHub</li>
              <li>Freelancing: Data entry, typing, copywriting</li>
            </ul>
            <hr className="my-3 sm:my-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: theme === 'dark' ? '#fff' : '#780000' }}>Hobbies</h3>
            <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
              <li>Writing & Reading Books</li>
              <li>Programming/Coding</li>
              <li>Game Testing & Debugging</li>
            </ul>
          </div>
          <div className="w-full flex justify-center mt-4 sm:mt-8">
            <a
              href="https://drive.google.com/uc?export=download&id=1daAdfqAaQiI96vRhH5XqgyOit654SY1w"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[var(--card-background)] border border-[var(--border)] rounded-full font-silka-medium text-sm text-[var(--foreground)] shadow-lg hover:opacity-80 transition-all duration-300 touch-target"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVCard;
