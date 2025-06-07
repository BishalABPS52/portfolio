'use client';

import React, { useState, useCallback, useEffect } from 'react';
import RGL, { WidthProvider, type Layout } from 'react-grid-layout';
import { motion } from 'framer-motion';
import 'react-grid-layout/css/styles.css';
import '../app/resizable.css';

const ReactGridLayout = WidthProvider(RGL);

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: React.ReactNode;
  static?: boolean;
}

interface DraggableGridProps {
  children: React.ReactNode[];
  layouts?: Layout[];
}

const DraggableGrid: React.FC<DraggableGridProps> = ({ children, layouts }) => {
  const [currentLayouts, setCurrentLayouts] = useState<Layout[]>(
    layouts || [
      { i: '0', x: 0, y: 0, w: 2, h: 1 },
      { i: '1', x: 2, y: 0, w: 1, h: 1 },
      { i: '2', x: 3, y: 0, w: 1, h: 2 },
      { i: '3', x: 0, y: 1, w: 1, h: 1 },
      { i: '4', x: 1, y: 1, w: 1, h: 1 },
      { i: '5', x: 2, y: 1, w: 1, h: 1 },
      { i: '6', x: 0, y: 2, w: 1, h: 1 },
      { i: '7', x: 1, y: 2, w: 1, h: 1 },
      { i: '8', x: 2, y: 2, w: 1, h: 1 },
    ]
  );

  const onLayoutChange = useCallback((layout: Layout[]) => {
    setCurrentLayouts(layout);
    localStorage.setItem('portfolio-layout', JSON.stringify(layout));
  }, []);

  useEffect(() => {
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
      <ReactGridLayout
        className="layout"
        layout={currentLayouts}
        onLayoutChange={onLayoutChange}
        cols={4}
        rowHeight={280}
        width={1200}
        margin={[10, 10]} // Set margin between grid items to 10px
        containerPadding={[10, 10]} // Add padding around the grid container
        isDraggable={true}
        isResizable={true}
        draggableHandle=".drag-handle"
        useCSSTransforms={true}
        preventCollision={false}
        compactType="vertical"
      >
        {children.map((child, index) => (
          <motion.div
            key={index.toString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="grid-item"
          >
            {child}
          </motion.div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default DraggableGrid;
