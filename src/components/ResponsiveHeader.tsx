'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScreenSize } from '@/lib/ResponsiveUtils';

interface MobileMenuProps {
  links: { href: string; label: string }[];
  currentPath: string;
  themeToggle: React.ReactNode;
}

export default function ResponsiveHeader({ links, currentPath, themeToggle }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useScreenSize();
  
  // If not mobile, don't render anything (original Header will be used)
  if (!isMobile) return null;
  
  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)] px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-moranga text-xl text-[var(--foreground)]">
          Bishal Shrestha
        </Link>
        
        <div className="flex items-center gap-3">
          {themeToggle}
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--foreground)]/10 transition-colors touch-target"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-[var(--foreground)]" />
          </button>
        </div>
      </div>
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[56px]"></div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 flex justify-between items-center border-b border-[var(--border)]">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-moranga text-xl text-[var(--foreground)]">
                Bishal Shrestha
              </Link>
              
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--foreground)]/10 transition-colors touch-target"
                aria-label="Close menu"
              >
                <X size={24} className="text-[var(--foreground)]" />
              </button>
            </div>
            
            <div className="flex flex-col p-4 gap-4 flex-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                    currentPath === link.href
                      ? "bg-[var(--foreground)]/10 text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:bg-[var(--foreground)]/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="p-4 border-t border-[var(--border)]">
              <button
                onClick={() => {
                  window.location.href = "mailto:bishal.shrestha@example.com";
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium"
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
