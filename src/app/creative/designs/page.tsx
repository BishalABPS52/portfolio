'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface Design {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export default function DesignsPage() {
  const { theme } = useTheme();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        // This array would normally come from a database or API
        // For now, we're hardcoding based on the files in the public directory
        const designsData: Design[] = [
          {
            title: 'Google Landing Page Redesign',
            description: 'A modern and minimalist redesign concept for Google\'s landing page, focusing on improving user experience while maintaining the recognizable brand elements.',
            imageUrl: '/assets/designs/Google.jpg',
            tags: ['UI/UX', 'Web Design']
          },
          {
            title: 'Jeff Bezos AI Portrait',
            description: 'An AI-generated artistic portrait of Jeff Bezos, exploring the intersection of technology and humanity in corporate leadership.',
            imageUrl: '/assets/designs/Jeffbezos ai.jpg',
            tags: ['AI Art', 'Portrait']
          },
          {
            title: 'Elon Musk Employee Portrait',
            description: 'Conceptual design exploring Elon Musk\'s relationship with his workforce, visualized through digital art techniques.',
            imageUrl: '/assets/designs/elon employee1.jpg',
            tags: ['Digital Art', 'Conceptual']
          },
          {
            title: 'Elon Musk Patent Design',
            description: 'A creative visualization of Elon Musk\'s innovations presented in a patent-style design format, highlighting the technical aspects of his vision.',
            imageUrl: '/assets/designs/elon musk patent.jpg',
            tags: ['Technical Design', 'Patent Art']
          },
          {
            title: 'Moon Exploration',
            description: 'An artistic interpretation of lunar exploration, blending science and aesthetics to capture the beauty and mystery of Earth\'s satellite.',
            imageUrl: '/assets/designs/moon.jpeg',
            tags: ['Space Art', 'Photography']
          }
        ];
        
        setDesigns(designsData);
        if (designsData.length > 0) {
          setSelectedDesign(designsData[0]);
        }
      } catch (error) {
        console.error('Error setting up designs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDesigns();
  }, []);
  
  // Extract all unique tags
  const allTags = Array.from(new Set(designs.flatMap(design => design.tags)));
  
  // Filter designs by selected tag
  const filteredDesigns = selectedTag 
    ? designs.filter(design => design.tags.includes(selectedTag))
    : designs;
  
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Link 
            href="/" 
            className="inline-block mb-8 px-4 py-2 rounded-full bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--card-background-hover)] transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-moranga mb-4" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
            Design Portfolio
          </h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            A showcase of my digital and graphic design work, including UI/UX concepts, digital art, and creative visualizations.
          </p>
          
          {/* Tags filter */}
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === null 
                  ? 'bg-[var(--foreground)] text-[var(--background)] font-medium' 
                  : 'bg-[var(--foreground)]/10 text-[var(--foreground)] hover:bg-[var(--foreground)]/20'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag 
                    ? 'bg-[var(--foreground)] text-[var(--background)] font-medium' 
                    : 'bg-[var(--foreground)]/10 text-[var(--foreground)] hover:bg-[var(--foreground)]/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--foreground)]"></div>
          </div>
        ) : (
          <div>
            {/* Gallery grid view */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDesigns.map((design, index) => (
                <motion.div
                  key={design.title}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-[var(--card-background)] rounded-xl overflow-hidden shadow-lg border border-[var(--border)]"
                  onClick={() => setSelectedDesign(design)}
                >
                  <div className="relative h-56 w-full cursor-pointer">
                    <Image
                      src={design.imageUrl}
                      alt={design.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-medium">{design.title}</h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {design.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Modal for larger view */}
            {selectedDesign && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedDesign(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-4xl w-full bg-[var(--card-background)] rounded-xl overflow-hidden shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    onClick={() => setSelectedDesign(null)}
                  >
                    ×
                  </button>
                  
                  <div className="relative h-[60vh] w-full">
                    <Image
                      src={selectedDesign.imageUrl}
                      alt={selectedDesign.title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-moranga mb-2" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                      {selectedDesign.title}
                    </h2>
                    <p className="text-[var(--foreground)] mb-4">
                      {selectedDesign.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDesign.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-[var(--foreground)]/10 rounded-full text-xs font-silka-medium text-[var(--foreground)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
