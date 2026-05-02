'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const [gridData, setGridData] = useState({ cols: 0, rows: 0, total: 0 });
  const blockIndicesRef = useRef<number[]>([]);

  useEffect(() => {
    // 1. Calculate the Pixel Grid based on screen size
    const blockSize = window.innerWidth > 768 ? 60 : 40; 
    const cols = Math.ceil(window.innerWidth / blockSize);
    const rows = Math.ceil(window.innerHeight / blockSize);
    const total = cols * rows;

    setGridData({ cols, rows, total });

    // 2. Create an array of indices sorted by diagonal distance
    const blocksWithDist = Array.from({ length: total }, (_, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const dist = c + r + (Math.random() * 2 - 1);
      return { index: i, dist };
    });
    
    blocksWithDist.sort((a, b) => a.dist - b.dist);
    blockIndicesRef.current = blocksWithDist.map(b => b.index);

    const tl = gsap.timeline();
    const loadingObj = { value: 0 };
    let lastRevealedIndex = 0;

    // Fade in the center elements
    gsap.to(bottomRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

    // 3. Smooth GSAP-driven loading sequence (1.8s for premium feel)
    gsap.to(loadingObj, {
      value: 100,
      duration: 1.8,
      ease: 'power1.inOut',
      onUpdate: () => {
        const count = Math.floor(loadingObj.value);
        
        // Update percentage text and progress bar
        if (countRef.current) countRef.current.textContent = `${count}%`;
        if (progressBarRef.current) progressBarRef.current.style.width = `${count}%`;

        // Reveal pixels based on current progress
        const targetRevealCount = Math.floor((loadingObj.value / 100) * total);
        
        if (targetRevealCount > lastRevealedIndex && gridRef.current) {
          const blocks = gridRef.current.children;
          const blocksToAnimate = [];
          
          for (let i = lastRevealedIndex; i < targetRevealCount; i++) {
            const idx = blockIndicesRef.current[i];
            if (blocks[idx]) blocksToAnimate.push(blocks[idx]);
          }
          
          if (blocksToAnimate.length > 0) {
            gsap.to(blocksToAnimate, {
              opacity: 1,
              scale: 1.05,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.001
            });
          }
          lastRevealedIndex = targetRevealCount;
        }
      },
      onComplete: () => {
        // Merge blocks into a solid color smoothly
        if (gridRef.current) {
          gsap.to(gridRef.current.children, {
            scale: 1.1,
            duration: 0.8,
            ease: 'power2.inOut'
          });
        }

        // 4. Exit Animation
        const exitTl = gsap.timeline({ delay: 0.3 });
        exitTl.to(bottomRef.current, { 
          opacity: 0, 
          scale: 0.9,
          filter: 'blur(10px)',
          duration: 0.8, 
          ease: 'power3.in' 
        })
        .to(preloaderRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: 'expo.inOut',
          onComplete,
        }, '-=0.4');
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div id="preloader" ref={preloaderRef} className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#E2E2E4] overflow-hidden">
      
      {/* Background Pixel Grid */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 grid"
        style={{ 
          gridTemplateColumns: `repeat(${gridData.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridData.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: gridData.total }).map((_, i) => (
          <div 
            key={i} 
            className="bg-[#1C1C1C]" 
            style={{ 
              opacity: 0,
              transform: 'scale(0.3)',
              background: 'linear-gradient(135deg, #2C2C2C 0%, #1C1C1C 100%)'
            }} 
          />
        ))}
      </div>

      {/* Stylish Center Progress */}
      <div ref={bottomRef} className="relative z-10 flex flex-col items-center justify-center pointer-events-none opacity-0 translate-y-10">
        <div 
          ref={countRef} 
          className="text-[4vw] font-black tracking-tighter leading-none italic"
          style={{ 
            color: '#FFFFFF', 
            mixBlendMode: 'difference' 
          }}
        >
          0%
        </div>
        
        {/* Sleek Progress Bar */}
        <div className="w-[30vw] max-w-[300px] h-[2px] bg-white/10 mt-6 overflow-hidden rounded-full" style={{ mixBlendMode: 'difference' }}>
          <div 
            ref={progressBarRef}
            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            style={{ width: '0%' }}
          />
        </div>
      </div>

    </div>
  );
}
