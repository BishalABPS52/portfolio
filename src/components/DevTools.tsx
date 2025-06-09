'use client';

import { useScreenSize } from '@/lib/ResponsiveUtils';
import { useEffect, useState } from 'react';

type PerformanceMetric = {
  name: string;
  value: number;
  timestamp: number;
};

const DevTools = () => {
  const screenSize = useScreenSize();
  const [showA11yInfo, setShowA11yInfo] = useState(false);
  const [showTouchAreas, setShowTouchAreas] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  
  // Toggle tools with keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + A for accessibility info
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        setShowA11yInfo(prev => !prev);
      }
      // Ctrl/Cmd + Shift + M for touch target areas
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        setShowTouchAreas(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track performance metrics
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      setMetrics(prev => [
        ...prev,
        ...entries.map(entry => ({
          name: entry.name,
          value: entry.duration,
          timestamp: Date.now()
        }))
      ].slice(-5)); // Keep last 5 metrics
    });

    observer.observe({ entryTypes: ['measure', 'paint'] });
    return () => observer.disconnect();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Breakpoint Indicator */}
      <div className="fixed top-0 left-0 m-2 p-2 bg-black/80 text-white rounded text-xs z-50 font-mono">
        {screenSize.width}x{screenSize.height} |{' '}
        {screenSize.isMobile ? 'Mobile' : screenSize.isTablet ? 'Tablet' : 'Desktop'}
      </div>

      {/* Performance Metrics */}
      <div className="fixed top-10 left-0 m-2 p-2 bg-black/80 text-white rounded text-xs z-50 font-mono">
        {metrics.map((metric, i) => (
          <div key={i}>{metric.name}: {metric.value.toFixed(2)}ms</div>
        ))}
      </div>

      {/* Accessibility Overlay */}
      {showA11yInfo && (
        <style>{`
          [role]:not([role=""]) { outline: 2px solid #00ff00 !important; }
          [aria-label] { outline: 2px solid #0000ff !important; }
          button:not([aria-label]) { outline: 2px solid #ff0000 !important; }
          a:not([aria-label]) { outline: 2px solid #ff0000 !important; }
        `}</style>
      )}

      {/* Touch Target Areas */}
      {showTouchAreas && (
        <style>{`
          button, 
          a, 
          [role="button"],
          input,
          select,
          textarea {
            position: relative;
          }
          button::after,
          a::after,
          [role="button"]::after,
          input::after,
          select::after,
          textarea::after {
            content: '';
            position: absolute;
            top: -12px;
            right: -12px;
            bottom: -12px;
            left: -12px;
            border: 2px solid rgba(255, 0, 0, 0.3);
            pointer-events: none;
          }
        `}</style>
      )}
    </>
  );
};

export default DevTools;
