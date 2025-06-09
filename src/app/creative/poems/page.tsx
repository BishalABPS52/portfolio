'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface Poem {
  title: string;
  content: string;
  language: 'english' | 'nepali' | 'mixed';
  author: string;
}

export default function PoemsPage() {
  const { theme } = useTheme();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPoems = async () => {
      try {
        // Fetch the list of poem files from a manifest or directory listing API
        // Since we can't directly read directory in browser, we'll use a manifest approach
        
        // This array includes all poem files in the public/assets/poems directory
        const poemFiles = [
          'Looking for.txt',
          'Twinkling Stars.txt',
          'Malae chara bana mann.txt',
          'अझै बाकी छ ती दिन ।.txt',
          'प्रतीक्षा छ  तिम्रो.txt',
          'म सोच्दै छु , म खोज्दै छु ।.txt',
          'जीवन.txt'
        ];
        
        const poemsData: Poem[] = [];
        
        for (const file of poemFiles) {
          try {
            const response = await fetch(`/assets/poems/${file}`);
            
            if (!response.ok) {
              console.error(`Failed to fetch poem file ${file}: ${response.status} ${response.statusText}`);
              continue;
            }
            
            const text = await response.text();
            
            // Split the content to get title and body
            const lines = text.split('\n').filter(line => line.trim() !== '');
            
            // Handle empty files
            if (lines.length === 0) {
              console.warn(`Empty poem file: ${file}`);
              continue;
            }
            
            const title = lines[0].trim();
            
            // Extract author if present (usually at the end with a dash)
            let content = '';
            let author = 'Bishal Shrestha'; // Default author
            
            // Check for author signature in the content
            const contentLines = lines.slice(1);
            
            // If there are no content lines, skip this poem
            if (contentLines.length === 0) {
              console.warn(`No content in poem: ${file}`);
              continue;
            }
            
            const lastLine = contentLines[contentLines.length - 1].trim();
            
            if (lastLine.startsWith('-') || lastLine.startsWith('—') || lastLine.startsWith('–')) {
              author = lastLine.replace(/^[-—–]\s*/, '').trim();
              content = contentLines.slice(0, -1).join('\n');
            } else {
              content = contentLines.join('\n');
            }
            
            // Determine language based on content
            let language: 'english' | 'nepali' | 'mixed' = 'english';
            
            // Check if title or content contains Devanagari script
            const hasDevanagariTitle = /[\u0900-\u097F]/.test(title);
            const hasDevanagariContent = /[\u0900-\u097F]/.test(content);
            
            // Check if content has English characters
            const hasEnglishTitle = /[a-zA-Z]/.test(title);
            const hasEnglishContent = /[a-zA-Z]/.test(content);
            
            // Determine language based on content analysis
            if ((hasDevanagariTitle || hasDevanagariContent) && (hasEnglishTitle || hasEnglishContent)) {
              language = 'mixed';
            } else if (hasDevanagariTitle || hasDevanagariContent) {
              language = 'nepali';
            } else {
              language = 'english';
            }
            
            poemsData.push({
              title,
              content,
              language,
              author
            });
          } catch (err) {
            console.error(`Error processing poem file ${file}:`, err);
          }
        }
        
        // Sort poems by language - English first, then mixed, then Nepali
        poemsData.sort((a, b) => {
          // First sort by language
          if (a.language !== b.language) {
            if (a.language === 'english') return -1;
            if (b.language === 'english') return 1;
            if (a.language === 'mixed') return -1;
            if (b.language === 'mixed') return 1;
          }
          // Then sort alphabetically by title
          return a.title.localeCompare(b.title);
        });
        
        setPoems(poemsData);
        if (poemsData.length > 0) {
          setSelectedPoem(poemsData[0]);
        }
      } catch (error) {
        console.error('Error fetching poems:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPoems();
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
            Poetry Collection
          </h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            A collection of my poems in both English and Nepali, reflecting thoughts, emotions, and observations about life, nature, and personal experiences.
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <span className="px-3 py-1 bg-[var(--foreground)]/10 rounded-full text-sm text-[var(--foreground)]">
              English
            </span>
            <span className="px-3 py-1 bg-[var(--foreground)]/10 rounded-full text-sm text-[var(--foreground)]">
              Nepali
            </span>
            <span className="px-3 py-1 bg-[var(--foreground)]/10 rounded-full text-sm text-[var(--foreground)]">
              Romanized
            </span>
          </div>
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
                My Poems
              </h2>
              
              <div className="space-y-3 sticky top-4">
                <div className="bg-[var(--card-background)] rounded-xl p-4 shadow-md border border-[var(--border)]">
                  <h3 className="text-lg font-silka-medium mb-3">English & Romanized</h3>
                  {poems
                    .filter(poem => poem.language === 'english' || poem.language === 'mixed')
                    .map((poem, index) => (
                      <motion.button
                        key={index}
                        variants={itemVariants}
                        onClick={() => setSelectedPoem(poem)}
                        className={`w-full text-left p-3 mb-2 rounded-lg transition-colors ${
                          selectedPoem?.title === poem.title
                            ? 'bg-[var(--foreground)]/10 font-silka-medium'
                            : 'hover:bg-[var(--foreground)]/5'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{poem.title}</span>
                          <span className="text-xs text-[var(--muted)] mt-1">
                            {poem.language === 'mixed' ? 'Mixed language' : 'English'}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                </div>
                
                <div className="bg-[var(--card-background)] rounded-xl p-4 shadow-md border border-[var(--border)]">
                  <h3 className="text-lg font-silka-medium mb-3">Nepali Poems</h3>
                  {poems
                    .filter(poem => poem.language === 'nepali')
                    .map((poem, index) => (
                      <motion.button
                        key={index}
                        variants={itemVariants}
                        onClick={() => setSelectedPoem(poem)}
                        className={`w-full text-left p-3 mb-2 rounded-lg transition-colors ${
                          selectedPoem?.title === poem.title
                            ? 'bg-[var(--foreground)]/10 font-silka-medium'
                            : 'hover:bg-[var(--foreground)]/5'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium font-nepali">{poem.title}</span>
                          <span className="text-xs text-[var(--muted)] mt-1 font-silka-regular">
                            Nepali
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
              {selectedPoem && (
                <motion.div 
                  key={selectedPoem.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[var(--card-background)] rounded-xl p-6 md:p-8 shadow-lg border border-[var(--border)]"
                >
                  <h2 className="text-3xl font-moranga mb-6" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                    {selectedPoem.title}
                  </h2>
                  <div className={`prose prose-lg max-w-none ${
                    selectedPoem.language === 'nepali' ? 'font-nepali' : 
                    selectedPoem.language === 'mixed' ? 'mixed-language' : ''
                  } ${
                    theme === 'dark' ? 'prose-invert' : ''
                  }`}>
                    {selectedPoem.content.split('\n').map((line, index) => (
                      <p key={index} className={line.trim() === '' ? 'my-4' : 'my-1'}>
                        {line}
                      </p>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-right italic text-[var(--muted)]">
                    — {selectedPoem.author}
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
