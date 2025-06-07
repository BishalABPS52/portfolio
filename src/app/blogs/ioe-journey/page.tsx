'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export default function IoeJourney() {
  const { theme } = useTheme();

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link
          href="/"
          className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </div>
      
      <header className="mb-12">
        <h1 className="text-5xl font-moranga mb-4 leading-tight" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
          Life as a Computer Engineering Student at IOE Thapathali
        </h1>
        
        <p className="text-[var(--muted)] text-lg">
          Published on August 29, 2023 • Education
        </p>
      </header>

      <div className="space-y-16 text-[var(--foreground)]">
        <section className="relative">
          <div className="lg:float-right lg:ml-8 lg:mb-4 mb-6">
            <Image
              src="/assets/blogs/ioe-journey.jpg"
              alt="IOE Thapathali Campus"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            The Beginning
          </h2>
          <p className="text-lg leading-relaxed">
            Stepping into IOE Thapathali Campus as a computer engineering student was the beginning of 
            an exciting journey. The campus, known for its rigorous academic programs and technical 
            excellence, presented both challenges and opportunities for growth.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Academic Experience
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The computer engineering program at IOE Thapathali is comprehensive and demanding. 
            Here's what makes it unique:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Balanced theoretical and practical approach</li>
            <li>Industry-relevant curriculum</li>
            <li>Focus on problem-solving skills</li>
            <li>Exposure to various programming languages and technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Key Learning Areas
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Throughout the program, I've gained expertise in:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Data Structures and Algorithms</li>
            <li>Object-Oriented Programming</li>
            <li>Database Management Systems</li>
            <li>Web Development Technologies</li>
            <li>Software Engineering Principles</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Projects and Practical Experience
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The program emphasizes hands-on learning through:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Semester projects</li>
            <li>Laboratory work</li>
            <li>Mini-projects</li>
            <li>Group assignments</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Campus Life
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Beyond academics, campus life at IOE Thapathali offers:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Technical clubs and societies</li>
            <li>Workshops and seminars</li>
            <li>Cultural events</li>
            <li>Sports activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Challenges and Growth
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The journey hasn't been without challenges:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Balancing academics with practical learning</li>
            <li>Meeting project deadlines</li>
            <li>Keeping up with rapidly evolving technologies</li>
            <li>Managing time effectively</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Skills Development
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Beyond technical skills, I've developed:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Problem-solving abilities</li>
            <li>Team collaboration</li>
            <li>Time management</li>
            <li>Technical communication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Future Prospects
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The education and experience at IOE Thapathali have prepared me for:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Software development roles</li>
            <li>Further studies in specialized fields</li>
            <li>Research opportunities</li>
            <li>Entrepreneurial ventures</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Conclusion
          </h2>
          <p className="text-lg leading-relaxed">
            Being a computer engineering student at IOE Thapathali has been a transformative experience. 
            It's not just about earning a degree—it's about becoming a well-rounded engineer ready 
            to tackle real-world challenges.
          </p>
        </section>
      </div>
    </article>
  );
}
