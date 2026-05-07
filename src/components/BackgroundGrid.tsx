import React, { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const getGridSize = () => {
  if (typeof window === 'undefined') {
    return { cols: 12, rows: 24 };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const squareSize = width < 640 ? 34 : width < 1024 ? 44 : width < 1600 ? 56 : 70;

  return {
    cols: Math.ceil(width / squareSize) + 2,
    rows: Math.ceil(height / squareSize) + 2,
  };
};

const seededThreshold = (index: number) => {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

export const BackgroundGrid = () => {
  const { scrollYProgress } = useScroll();
  const [gridSize, setGridSize] = useState(getGridSize);

  useEffect(() => {
    const updateGrid = () => setGridSize(getGridSize());
    updateGrid();
    window.addEventListener('resize', updateGrid);
    window.addEventListener('orientationchange', updateGrid);

    return () => {
      window.removeEventListener('resize', updateGrid);
      window.removeEventListener('orientationchange', updateGrid);
    };
  }, []);

  const squares = useMemo(() => {
    return Array.from({ length: gridSize.cols * gridSize.rows }, (_, i) => ({
      id: i,
      isInitiallyMissing: seededThreshold(i + 17) < 0.18,
      threshold: seededThreshold(i + 101) * 0.9,
    }));
  }, [gridSize.cols, gridSize.rows]);

  return (
    <div className="fixed inset-0 z-0 h-dvh w-screen overflow-hidden pointer-events-none bg-primary">
      <div
        className="grid h-full w-full gap-[clamp(2px,0.35vw,6px)] opacity-45"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize.rows}, minmax(0, 1fr))`,
        }}
        aria-hidden="true"
      >
        {squares.map((sq) => (
          <GridSquare
            key={sq.id}
            isMissing={sq.isInitiallyMissing}
            threshold={sq.threshold}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

const GridSquare: React.FC<{ isMissing: boolean; threshold: number; progress: any }> = ({
  isMissing,
  threshold,
  progress,
}) => {
  const scale = useTransform(
    progress,
    [0, threshold, Math.min(threshold + 0.12, 1)],
    [isMissing ? 0 : 1, isMissing ? 0 : 1, 0]
  );

  const opacity = useTransform(
    progress,
    [0, threshold, Math.min(threshold + 0.12, 1)],
    [isMissing ? 0 : 1, isMissing ? 0 : 1, 0]
  );

  return <motion.div style={{ scale, opacity }} className="h-full w-full bg-primary-light" />;
};
