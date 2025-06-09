'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function VideosPage() {
  const { theme } = useTheme();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // These are the actual videos from the AI Aether channel with original names, ordered in descending order
    const channelVideos: Video[] = [
      {
        id: 'ajr9WMAY-gA',
        title: 'Journey To FIFA World Cups Recent History #10kchallenge',
        description: 'A fascinating journey through the recent history of FIFA World Cups.',
        thumbnail: `https://i.ytimg.com/vi/ajr9WMAY-gA/hqdefault.jpg`
      },
      {
        id: '3yE3lhE_bak',
        title: 'The Future of Space Exploration and Colonization 2 #10kviews #10kchallenge',
        description: 'Exploring the possibilities of future space exploration and potential colonization.',
        thumbnail: `https://i.ytimg.com/vi/3yE3lhE_bak/hqdefault.jpg`
      },
      {
        id: '7Yz-p8XLF70',
        title: 'Space Discoveries That Will Blow Your Mind | AI Aether |',
        description: 'Amazing and mind-blowing discoveries from space exploration and astronomy.',
        thumbnail: `https://i.ytimg.com/vi/7Yz-p8XLF70/hqdefault.jpg`
      },
      {
        id: 'zdnIpWLy7YE',
        title: 'Quantum Computing : From Theory to Reality.. | AI Aether |',
        description: 'An explanation of quantum computing principles and its potential real-world applications.',
        thumbnail: `https://i.ytimg.com/vi/zdnIpWLy7YE/hqdefault.jpg`
      },
      {
        id: '0sjXudjv69I',
        title: 'Mark Zuckerberg: Man Behind The Facebook & Metaverse 🌐 | AI Aether |',
        description: 'The story of Mark Zuckerberg and his journey creating Facebook and pivoting to the Metaverse.',
        thumbnail: `https://i.ytimg.com/vi/0sjXudjv69I/hqdefault.jpg`
      },
      {
        id: 'ldI7vXm0L0g',
        title: 'Elon Musk: Genius, Billionaire, Visionary !!! | AI Aether |',
        description: 'Exploring the life, achievements and vision of tech entrepreneur Elon Musk.',
        thumbnail: `https://i.ytimg.com/vi/ldI7vXm0L0g/hqdefault.jpg`
      },
      {
        id: 'nvycZHbbIlE',
        title: 'How Google Took Over the Internet ? 🌍📱 | AI Aether |',
        description: 'A deep dive into how Google became the dominant force in internet search and services.',
        thumbnail: `https://i.ytimg.com/vi/nvycZHbbIlE/hqdefault.jpg`
      },
      {
        id: '-TUEanQ1OHg',
        title: 'What is AI ? | Ai Aether |',
        description: 'An introductory exploration of artificial intelligence, its concepts, and potential.',
        thumbnail: `https://i.ytimg.com/vi/-TUEanQ1OHg/hqdefault.jpg`
      }
    ];
    
    setVideos(channelVideos);
    setSelectedVideo(channelVideos[0].id);
    setLoading(false);
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
            Video Collection
          </h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            A collection of informative videos from the AI Aether channel, exploring technology, personalities, and scientific discoveries.
          </p>
          <div className="flex justify-center mt-6">
            <a 
              href="https://www.youtube.com/@ai_aether_ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Visit YouTube Channel
            </a>
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
                AI Aether Videos
              </h2>
              
              <div className="space-y-3 sticky top-4">
                <div className="bg-[var(--card-background)] rounded-xl p-4 shadow-md border border-[var(--border)]">
                  {videos.map((video, index) => (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      onClick={() => setSelectedVideo(video.id)}
                      className={`w-full text-left p-3 mb-2 rounded-lg transition-colors ${
                        selectedVideo === video.id
                          ? 'bg-[var(--foreground)]/10 font-silka-medium'
                          : 'hover:bg-[var(--foreground)]/5'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="relative w-full h-28 mb-2 rounded-lg overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <span className="font-medium line-clamp-2">{video.title}</span>
                        <span className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
                          {video.description}
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
              {selectedVideo && (
                <motion.div 
                  key={selectedVideo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[var(--card-background)] rounded-xl p-6 md:p-8 shadow-lg border border-[var(--border)]"
                >
                  <div className="aspect-video w-full mb-6">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=0&rel=0`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    ></iframe>
                  </div>
                  
                  <h2 className="text-2xl font-moranga mb-4" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                    {videos.find(v => v.id === selectedVideo)?.title}
                  </h2>
                  
                  <p className="text-[var(--foreground)] mb-4">
                    {videos.find(v => v.id === selectedVideo)?.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={`https://www.youtube.com/watch?v=${selectedVideo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
                      </svg>
                      Watch on YouTube
                    </a>
                    
                    <div className="text-[var(--muted)]">
                      <span className="inline-flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                        AI Aether
                      </span>
                    </div>
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
