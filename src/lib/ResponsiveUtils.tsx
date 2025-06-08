'use client';

import { useEffect, useState } from 'react';

// Hook to detect screen size
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };
    
    // Initialize on mount
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screenSize;
}

// Helper to get responsive image sizes
export function getResponsiveImageSizes(type: 'banner' | 'card' | 'gallery' | 'default' = 'default') {
  switch (type) {
    case 'banner':
      return '(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw';
    default:
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw';
  }
}

// Helper to format grid columns based on screen size
export function getResponsiveGridCols(items: number) {
  return {
    gridTemplateColumns: {
      xs: '1fr',
      sm: items > 1 ? 'repeat(2, 1fr)' : '1fr',
      md: items > 2 ? 'repeat(3, 1fr)' : items > 1 ? 'repeat(2, 1fr)' : '1fr',
      lg: items > 3 ? 'repeat(4, 1fr)' : items > 2 ? 'repeat(3, 1fr)' : items > 1 ? 'repeat(2, 1fr)' : '1fr',
    }
  };
}

// Component to conditionally render content based on screen size
interface ResponsiveRenderProps {
  mobile: React.ReactNode;
  tablet?: React.ReactNode;
  desktop: React.ReactNode;
}

export function ResponsiveRender({ mobile, tablet, desktop }: ResponsiveRenderProps) {
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  
  if (isMobile) return <>{mobile}</>;
  if (isTablet && tablet) return <>{tablet}</>;
  return <>{desktop}</>;
}

// Helper to optimize touch interactions for mobile
export function optimizeTouchInteraction(element: HTMLElement | null): void {
  if (!element) return;
  
  // Add touch-specific attributes
  element.setAttribute('touch-action', 'manipulation');
  
  // Ensure tap targets are properly sized
  const computedStyle = window.getComputedStyle(element);
  const height = parseInt(computedStyle.height);
  const width = parseInt(computedStyle.width);
  
  if (height < 44 || width < 44) {
    element.classList.add('touch-target');
  }
}

// Hook to add the 'touch-class' class to interactive elements for mobile devices
export function useTouchOptimizer(selector = 'a, button, input, select, textarea, [role="button"]') {
  const { isMobile } = useScreenSize();
  
  useEffect(() => {
    if (isMobile) {
      // Find all interactive elements
      const elements = document.querySelectorAll(selector);
      
      // Apply optimizations
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          optimizeTouchInteraction(element);
        }
      });
    }
  }, [selector]);
}
