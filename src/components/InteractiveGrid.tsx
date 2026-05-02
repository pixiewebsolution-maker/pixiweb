'use client';

import React, { useRef, useEffect } from 'react';

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const cells = container.querySelectorAll('.grid-cell');
      cells.forEach((cell) => {
        const cellRect = (cell as HTMLElement).getBoundingClientRect();
        const cellX = cellRect.left - rect.left + cellRect.width / 2;
        const cellY = cellRect.top - rect.top + cellRect.height / 2;

        const distance = Math.sqrt(Math.pow(x - cellX, 2) + Math.pow(y - cellY, 2));

        // Spotlight effect (lights up roughly 3x3 area)
        if (distance < 70) {
          const intensity = Math.max(0, 1 - distance / 70);
          (cell as HTMLElement).style.backgroundColor = `rgba(255, 103, 1, ${intensity * 0.5})`;
          (cell as HTMLElement).style.transitionDuration = '0s';
        } else {
          (cell as HTMLElement).style.backgroundColor = 'transparent';
          (cell as HTMLElement).style.transitionDuration = '1000ms';
        }
      });
    };

    const handleMouseLeave = () => {
      const cells = container.querySelectorAll('.grid-cell');
      cells.forEach((cell) => {
        (cell as HTMLElement).style.backgroundColor = 'transparent';
        (cell as HTMLElement).style.transitionDuration = '1000ms';
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-auto opacity-50">
      <div 
        className="grid w-full h-full pointer-events-none" 
        style={{ 
          gridTemplateColumns: 'repeat(auto-fill, minmax(30px, 1fr))',
          gridTemplateRows: 'repeat(auto-fill, minmax(30px, 1fr))',
        }}
      >
        {Array.from({ length: 600 }).map((_, i) => (
          <div 
            key={i} 
            className="grid-cell border-[0.5px] border-black/5 dark:border-white/5 transition-colors duration-1000"
          />
        ))}
      </div>
    </div>
  );
}
