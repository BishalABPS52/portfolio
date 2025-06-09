'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface Essay {
  title: string;
  content: string;
  author: string;
}

export default function EssaysPage() {
  const { theme } = useTheme();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        // This array includes all essay files in the public/assets/essays directory
        const essayFiles = [
          'Those days are still left.txt'
        ];
        
        const essaysData: Essay[] = [];
        
        for (const file of essayFiles) {
          try {
            const response = await fetch(`/assets/essays/${file}`);
            
            if (!response.ok) {
              console.error(`Failed to fetch essay file ${file}: ${response.status} ${response.statusText}`);
              continue;
            }
            
            const text = await response.text();
            
            // Split the content to get title and body
            const lines = text.split('\n').filter(line => line.trim() !== '');
            
            // Handle empty files
            if (lines.length === 0) {
              console.warn(`Empty essay file: ${file}`);
              continue;
            }
            
            const title = lines[0].trim();
            
            // Extract author if present (usually at the end with a dash)
            let content = '';
            let author = 'Bishal Shrestha'; // Default author
            
            // Check for author signature in the content
            const contentLines = lines.slice(1);
            
            // If there are no content lines, skip this essay
            if (contentLines.length === 0) {
              console.warn(`No content in essay: ${file}`);
              continue;
            }
            
            const lastLine = contentLines[contentLines.length - 1].trim();
            
            if (lastLine.startsWith('-') || lastLine.startsWith('—') || lastLine.startsWith('–')) {
              author = lastLine.replace(/^[-—–]\s*/, '').trim();
              content = contentLines.slice(0, -1).join('\n');
            } else {
              content = contentLines.join('\n');
            }
            
            essaysData.push({
              title,
              content,
              author
            });
          } catch (err) {
            console.error(`Error processing essay file ${file}:`, err);
          }
        }
        
        setEssays(essaysData);
        if (essaysData.length > 0) {
          setSelectedEssay(essaysData[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching essays:', error);
        setLoading(false);
      }
    };
    
    fetchEssays();
  }, []);
  
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
            Essays & Articles
          </h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            A collection of thought-provoking essays and reflections on life, success, and personal growth.
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--foreground)]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1 space-y-4"
            >
              <h2 className="text-2xl font-moranga mb-4" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                Essays List
              </h2>
              
              <div className="space-y-3 sticky top-4">
                <div className="bg-[var(--card-background)] rounded-xl p-4 shadow-md border border-[var(--border)]">
                  {essays.map((essay, index) => (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      onClick={() => setSelectedEssay(essay)}
                      className={`w-full text-left p-3 mb-2 rounded-lg transition-colors ${
                        selectedEssay?.title === essay.title
                          ? 'bg-[var(--foreground)]/10 font-silka-medium'
                          : 'hover:bg-[var(--foreground)]/5'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium line-clamp-2">{essay.title}</span>
                        <span className="text-xs text-[var(--muted)] mt-1">
                          By {essay.author}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              {selectedEssay && (
                <motion.div 
                  key={selectedEssay.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[var(--card-background)] rounded-xl p-6 md:p-8 shadow-lg border border-[var(--border)]"
                >
                  <h2 className="text-2xl font-moranga mb-4" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                    {selectedEssay.title}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none text-[var(--foreground)] mb-6 whitespace-pre-line">
                    {selectedEssay.content}
                  </div>
                  
                  <div className="text-right italic text-[var(--muted)]">
                    - {selectedEssay.author}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
