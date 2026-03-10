'use client';

import { useEffect, useRef } from 'react';
import { Poem } from '@/data/poems';

interface ThresholdRoomProps {
  poem: Poem;
}

export default function ThresholdRoom({ poem }: ThresholdRoomProps) {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (heroImageRef.current) {
        const opacity = Math.max(0, 1 - scrollY / viewportHeight);
        heroImageRef.current.style.opacity = String(opacity);
      }

      if (scrollHintRef.current) {
        if (scrollY > 100) {
          scrollHintRef.current.style.opacity = '0';
        } else {
          scrollHintRef.current.style.opacity = '1';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="room room-threshold">
        <div
          ref={heroImageRef}
          className="hero-image"
          style={{
            backgroundImage: `url(/poems/${poem.id}/images/${poem.scenes[0]?.imageFile})`,
          }}
        />
        <div className="hero-title">
          <h1>{poem.titleEn}</h1>
          <p className="title-ko">{poem.titleKo}</p>
          <p className="poet">{poem.authorEn} · {poem.authorKo}</p>
        </div>
        <div ref={scrollHintRef} className="scroll-hint" />
      </section>
      <div className="dissolve-spacer" />
    </>
  );
}
