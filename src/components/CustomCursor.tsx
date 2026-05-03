'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Create trail elements
    const trailCount = 8;
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < trailCount; i++) {
      const t = document.createElement('div');
      t.className = 'cursor-trail';
      t.style.opacity = String((trailCount - i) / trailCount * 0.4);
      t.style.width = t.style.height = `${(trailCount - i) / trailCount * 6}px`;
      document.body.appendChild(t);
      trails.push(t);
    }
    trailsRef.current = trails;

    const trailPositions = Array(trailCount).fill({ x: 0, y: 0 }).map(() => ({ x: 0, y: 0 }));

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    // Smooth ring follow
    const animateRing = () => {
      // Ring lags behind dot
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.15;

      gsap.set(ring, {
        x: ringPos.current.x,
        y: ringPos.current.y,
      });

      // Trail follows with increasing lag
      trailPositions[0] = { x: posRef.current.x, y: posRef.current.y };
      for (let i = 1; i < trailCount; i++) {
        trailPositions[i] = {
          x: trailPositions[i].x + (trailPositions[i - 1].x - trailPositions[i].x) * 0.35,
          y: trailPositions[i].y + (trailPositions[i - 1].y - trailPositions[i].y) * 0.35,
        };
        gsap.set(trails[i], {
          x: trailPositions[i].x,
          y: trailPositions[i].y,
        });
      }

      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover states
    const handleEnter = () => document.body.classList.add('cursor-hover');
    const handleLeave = () => document.body.classList.remove('cursor-hover');
    const handleDown = () => document.body.classList.add('cursor-click');
    const handleUp = () => document.body.classList.remove('cursor-click');
    const handleWhiteEnter = () => document.body.classList.add('cursor-white');
    const handleWhiteLeave = () => document.body.classList.remove('cursor-white');

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    const interactables = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    const whiteInteractables = document.querySelectorAll('[data-cursor-white], .btn-primary, .btn-ghost');
    whiteInteractables.forEach((el) => {
      el.addEventListener('mouseenter', handleWhiteEnter);
      el.addEventListener('mouseleave', handleWhiteLeave);
    });

    // Observe DOM changes to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor-hover]');
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });

      const wEls = document.querySelectorAll('[data-cursor-white], .btn-primary, .btn-ghost');
      wEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleWhiteEnter);
        el.removeEventListener('mouseleave', handleWhiteLeave);
        el.addEventListener('mouseenter', handleWhiteEnter);
        el.addEventListener('mouseleave', handleWhiteLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      observer.disconnect();
      trails.forEach((t) => t.remove());
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
