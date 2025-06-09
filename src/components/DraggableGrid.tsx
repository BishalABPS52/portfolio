'use client';

import React, { useState, useCallback, useEffect } from 'react';
import RGL, { Responsive, WidthProvider, type Layout } from 'react-grid-layout';
import { motion } from 'framer-motion';
import 'react-grid-layout/css/styles.css';
import '../app/resizable.css';
import { useScreenSize } from '@/lib/ResponsiveUtils';

const ReactGridLayout = WidthProvider(RGL);
const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: React.ReactNode;
  static?: boolean;
}

// Define types
type Layouts = {[P: string]: Layout[]};

interface DraggableGridProps {
  children: React.ReactNode[];
  layouts?: Layout[];
}

const DraggableGrid: React.FC<DraggableGridProps> = ({ children, layouts }) => {
  const { isMobile } = useScreenSize();
  const defaultLayout = [
    { i: '0', x: 0, y: 0, w: 2, h: 1 },
    { i: '1', x: 2, y: 0, w: 1, h: 1 },
    { i: '2', x: 3, y: 0, w: 1, h: 2 },
    { i: '3', x: 0, y: 1, w: 1, h: 1 },
    { i: '4', x: 1, y: 1, w: 1, h: 1 },
    { i: '5', x: 2, y: 1, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 1, h: 1 },
    { i: '7', x: 1, y: 2, w: 1, h: 1 },
    { i: '8', x: 2, y: 2, w: 1, h: 1 },
  ];

  // Create layouts for different breakpoints
  const [responsiveLayouts, setResponsiveLayouts] = useState<Layouts>({
    lg: layouts || defaultLayout,
    md: layouts || defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 3) })),
    sm: layouts || defaultLayout.map(item => ({ ...item, w: Math.min(item.w, 2), x: Math.min(item.x, 1) })),
    xs: layouts || defaultLayout.map(item => ({ ...item, w: 1, x: 0 })),
  });

  const [currentLayouts, setCurrentLayouts] = useState<Layout[]>(
    layouts || defaultLayout
  );

  const onLayoutChange = useCallback((layout: Layout[], allLayouts?: Layouts) => {
    setCurrentLayouts(layout);
    
    if (allLayouts) {
      // Save all responsive layouts
      localStorage.setItem('portfolio-layouts', JSON.stringify(allLayouts));
      setResponsiveLayouts(allLayouts);
    } else {
      // Only update current layout
      localStorage.setItem('portfolio-layout', JSON.stringify(layout));
    }
  }, []);

  useEffect(() => {
    // Try to load responsive layouts first
    const savedResponsiveLayouts = localStorage.getItem('portfolio-layouts');
    if (savedResponsiveLayouts) {
      try {
        const parsedLayouts = JSON.parse(savedResponsiveLayouts);
        setResponsiveLayouts(parsedLayouts);
        return; // Skip loading single layout if responsive layouts exist
      } catch (error) {
        console.warn('Failed to parse saved responsive layouts:', error);
      }
    }
    
    // Fallback to old layout format
    const savedLayout = localStorage.getItem('portfolio-layout');
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout);
        setCurrentLayouts(parsedLayout);
      } catch (error) {
        console.warn('Failed to parse saved layout:', error);
      }
    }
  }, []);

  return (
    <div className="w-full">
      {isMobile ? (
        <div className="flex flex-col space-y-4">
          {children.map((child, index) => (
            <motion.div
              key={index.toString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-transparent relative rounded-3xl overflow-hidden"
            >
              {child}
            </motion.div>
          ))}
        </div>
      ) : (
        <ResponsiveGridLayout
          className="layout"
          layouts={responsiveLayouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
          rowHeight={280}
          margin={[10, 10]}
          containerPadding={[10, 10]}
          isDraggable={true}
          isResizable={true}
          draggableHandle=".drag-handle"
          useCSSTransforms={true}
          preventCollision={false}
          compactType="vertical"
          onLayoutChange={(currentLayout: Layout[], layouts: Layouts) => {
            onLayoutChange(currentLayout, layouts);
          }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index.toString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-transparent relative rounded-3xl overflow-hidden grid-item"
            >
              <div className="absolute top-0 right-0 m-4 drag-handle cursor-move w-8 h-8 rounded-full bg-[var(--foreground)]/20 backdrop-blur-sm flex items-center justify-center opacity-30 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 touch-target">
                <span className="w-4 h-0.5 bg-[var(--foreground)]/80 absolute"></span>
                <span className="h-4 w-0.5 bg-[var(--foreground)]/80 absolute"></span>
              </div>
              {child}
            </motion.div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default DraggableGrid;
