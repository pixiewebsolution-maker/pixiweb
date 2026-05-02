'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    let count = 0;

    // Animate counter from 0 to 100
    const counter = setInterval(() => {
      count += Math.floor(Math.random() * 12) + 4;
      if (count >= 100) {
        count = 100;
        clearInterval(counter);
      }
      if (countRef.current) {
        countRef.current.textContent = `${count}%`;
      }
      if (barRef.current) {
        barRef.current.style.width = `${count}%`;
      }
    }, 60);

    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to({}, { duration: 1.8 }) // hold
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      onComplete,
    });

    return () => {
      clearInterval(counter);
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="preloader" ref={preloaderRef}>
      <div ref={logoRef} className="preloader-logo" style={{ transform: 'translateY(30px)' }}>
        <Image src="/logo.png" alt="Pixie Webs" width={120} height={120} priority style={{ filter: 'invert(1)', mixBlendMode: 'screen' }} />
      </div>
      <div className="preloader-bar-wrap">
        <div className="preloader-bar" ref={barRef} />
      </div>
      <span className="preloader-count" ref={countRef}>0%</span>
    </div>
  );
}
