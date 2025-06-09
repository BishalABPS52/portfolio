'use client';

import { useState, useEffect } from 'react';
import { useScreenSize } from '@/lib/ResponsiveUtils';

// Device presets for testing responsive design
const DEVICE_PRESETS = [
  { name: 'iPhone SE', width: 375, height: 667, type: 'mobile' },
  { name: 'iPhone X/11/12', width: 390, height: 844, type: 'mobile' },
  { name: 'iPhone 13/14 Pro Max', width: 428, height: 926, type: 'mobile' },
  { name: 'iPad Mini', width: 768, height: 1024, type: 'tablet' },
  { name: 'iPad Pro', width: 1024, height: 1366, type: 'tablet' },
  { name: 'Laptop', width: 1366, height: 768, type: 'desktop' },
  { name: 'Desktop', width: 1920, height: 1080, type: 'desktop' },
];

/**
 * A floating utility to test responsive designs directly in the browser
 * Toggle with keyboard shortcut: Ctrl+Shift+T (or Cmd+Shift+T on Mac)
 */
const ResponsiveTester = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDevice, setActiveDevice] = useState<typeof DEVICE_PRESETS[0] | null>(null);
  const { width, height, isMobile, isTablet, isDesktop } = useScreenSize();

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + T
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-900 shadow-xl rounded-lg p-4 w-80 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Responsive Tester</h3>
        <button 
          onClick={() => setIsVisible(false)} 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          &times;
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Current Viewport:</p>
        <div className="flex justify-between items-center text-sm">
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {width}px × {height}px
          </span>
          <span className={`px-2 py-1 rounded font-medium ${
            isMobile 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
              : isTablet 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}>
            {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Test on Device:</p>
        <div className="grid grid-cols-2 gap-2">
          {DEVICE_PRESETS.map((device) => (
            <button
              key={device.name}
              onClick={() => setActiveDevice(device)}
              className={`text-xs px-2 py-1.5 rounded transition-colors ${
                activeDevice?.name === device.name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {device.name}
            </button>
          ))}
        </div>
      </div>

      {activeDevice && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-300">{activeDevice.name}</span>
            <button 
              onClick={() => setActiveDevice(null)}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Reset
            </button>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Resize your browser window to match:{' '}
            <span className="font-mono font-semibold">
              {activeDevice.width}px × {activeDevice.height}px
            </span>
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Ctrl/Cmd+Shift+T</kbd> to toggle
      </div>
    </div>
  );
};

export default ResponsiveTester;