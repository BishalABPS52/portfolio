'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export default function PortfolioJourney() {
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
          Building My Portfolio: A Journey in Modern Web Development
        </h1>
        
        <p className="text-[var(--muted)] text-lg">
          Published on August 29, 2023 • Web Development
        </p>
      </header>

      <div className="space-y-16 text-[var(--foreground)]">
        <section className="relative">
          <div className="lg:float-right lg:ml-8 lg:mb-4 mb-6">
            <Image
              src="/assets/blogs/pdesign1.png"
              alt="Portfolio Design Process"
              width={400}
              height={300}
              className="rounded-lg shadow-lg mb-6"
              priority
            />
            <Image
              src="/assets/blogs/pdesign2.png"
              alt="Portfolio Implementation"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            The Vision
          </h2>
          <p className="text-lg leading-relaxed">
            When I set out to build my portfolio website, I had a clear vision: create a dynamic, 
            modern platform that not only showcases my work but also reflects my personality and 
            technical capabilities. The goal was to build something that stands out while maintaining 
            clean, professional aesthetics.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Technology Stack
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            I chose Next.js 13 with its new App Router for its powerful features and optimization 
            capabilities. The stack includes:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Next.js 13 with TypeScript</li>
            <li>TailwindCSS for styling</li>
            <li>Framer Motion for animations</li>
            <li>Custom React hooks for theme management</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Design Decisions
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The design process was iterative, focusing on:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Clean, card-based layout for easy content organization</li>
            <li>Responsive design that works seamlessly across devices</li>
            <li>Dark/light theme with smooth transitions</li>
            <li>Subtle animations that enhance user experience without being distracting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Key Features
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Some of the notable features implemented include:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Dynamic theme switching with persisted user preference</li>
            <li>Responsive grid layout using CSS Grid and Flexbox</li>
            <li>Optimized images with Next.js Image component</li>
            <li>Smooth page transitions and hover effects</li>
            <li>SEO optimization with metadata</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Learning Experience
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            This project has been an incredible learning experience. Key takeaways include:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Practical experience with Next.js 13 features</li>
            <li>Deep understanding of React hooks and context</li>
            <li>Advanced TailwindCSS techniques</li>
            <li>Performance optimization strategies</li>
            <li>Project architecture and code organization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Future Improvements
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The portfolio is an ongoing project, and I plan to:
          </p>
          <ul className="list-disc ml-8 space-y-3 text-lg leading-relaxed">
            <li>Add more interactive features</li>
            <li>Implement a blog system</li>
            <li>Add more project showcases</li>
            <li>Enhance accessibility</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Conclusion
          </h2>
          <p className="text-lg leading-relaxed">
            Building this portfolio has been more than just creating a website—it's been a journey of 
            learning, problem-solving, and creative expression. I'm proud of what I've built and 
            excited to continue improving it.
          </p>
        </section>
      </div>
    </article>
  );
}
