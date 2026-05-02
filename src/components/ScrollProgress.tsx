'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });
  }, []);

  return (
    <div
      id="scroll-progress"
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        height: '2px',
        width: '100%',
        background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
        transformOrigin: 'left',
        zIndex: 10000,
        transform: 'scaleX(0)',
      }}
    />
  );
}
