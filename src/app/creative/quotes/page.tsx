'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface Quote {
  text: string;
  language: 'english' | 'nepali' | 'mixed';
  author?: string;
  filename: string;
}

export default function QuotesPage() {
  const { theme } = useTheme();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // First, fetch the list of quote files
        const quoteFiles = [
          'Every rose has it s thorns.txt',
          'quote.txt'
        ];
        
        const quotesData: Quote[] = [];
        
        // Fetch and process each quote file
        for (const filename of quoteFiles) {
          try {
            const response = await fetch(`/assets/quote/${filename}`);
            if (!response.ok) continue;
            
            const text = await response.text();
            const cleanText = text.trim();
            if (!cleanText) continue;
            
            // Determine language based on content
            let language: 'english' | 'nepali' | 'mixed' = 'english';
            
            // Check if content has Devanagari script
            const hasDevanagari = /[\u0900-\u097F]/.test(cleanText);
            
            // Check if content has mix of English and Devanagari
            const hasEnglish = /[a-zA-Z]/.test(cleanText);
            
            if (hasDevanagari && hasEnglish) {
              language = 'mixed';
            } else if (hasDevanagari) {
              language = 'nepali';
            }
            
            quotesData.push({
              text: cleanText,
              language,
              author: 'Bishal Shrestha',
              filename
            });
          } catch (error) {
            console.error(`Error fetching quote from ${filename}:`, error);
          }
        }
        
        if (quotesData.length === 0) {
          // Add default quotes if no files were successfully loaded
          quotesData.push(
            {
              text: "The future belongs to those who believe in the beauty of their dreams.",
              language: "english",
              author: "Eleanor Roosevelt",
              filename: "default1.txt"
            },
            {
              text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
              language: "english",
              author: "Winston Churchill",
              filename: "default2.txt"
            }
          );
        }
        
        setQuotes(quotesData);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        // Set default quotes in case of error
        setQuotes([
          {
            text: "Life is what happens when you're busy making other plans.",
            language: "english",
            author: "John Lennon",
            filename: "default3.txt"
          },
          {
            text: "The way to get started is to quit talking and begin doing.",
            language: "english",
            author: "Walt Disney",
            filename: "default4.txt"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuotes();
    
    // Auto-rotate quotes
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => 
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);
  
  const goToNextQuote = () => {
    setCurrentQuoteIndex(prevIndex => 
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPreviousQuote = () => {
    setCurrentQuoteIndex(prevIndex => 
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
            Inspirational Quotes
          </h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            A collection of thought-provoking quotes and wisdom in both English and Nepali to inspire and motivate.
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--foreground)]"></div>
          </div>
        ) : (
          <div className="relative">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--card-background)] rounded-xl p-10 shadow-xl border border-[var(--border)] min-h-[50vh] flex flex-col justify-center items-center text-center"
            >
              <svg 
                className="w-12 h-12 mb-6 opacity-25" 
                fill={theme === 'dark' ? '#c1121f' : '#780000'} 
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <blockquote className={`text-2xl md:text-3xl mb-8 leading-relaxed ${
                quotes[currentQuoteIndex]?.language === 'nepali' ? 'font-nepali' : 
                quotes[currentQuoteIndex]?.language === 'mixed' ? 'mixed-language' : ''
              }`}>
                {quotes[currentQuoteIndex]?.text}
              </blockquote>
              
              {quotes[currentQuoteIndex]?.author && (
                <cite className="block text-[var(--muted)] font-medium mt-4">
                  — {quotes[currentQuoteIndex].author}
                </cite>
              )}
            </motion.div>
            
            <div className="flex justify-center mt-8 space-x-6">
              <button
                onClick={goToPreviousQuote}
                className="p-3 rounded-full bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--card-background-hover)] transition-colors shadow-md"
                aria-label="Previous quote"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full mx-1 transition-colors ${
                      currentQuoteIndex === index 
                        ? `bg-${theme === 'dark' ? '[#c1121f]' : '[#780000]'}`
                        : 'bg-[var(--foreground)]/20'
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNextQuote}
                className="p-3 rounded-full bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--card-background-hover)] transition-colors shadow-md"
                aria-label="Next quote"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-[var(--muted)]">
                Swipe or use the navigation arrows to explore more quotes
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
