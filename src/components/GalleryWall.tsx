'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Poem } from '@/data/poems';
import FilterBar from '@/components/FilterBar';
import GalleryFrame from '@/components/GalleryFrame';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type FilterType = 'all' | 'poet' | 'mood';

interface GalleryWallProps {
  poems: Poem[];
}

export default function GalleryWall({ poems }: GalleryWallProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [activeFilter, setActiveFilter] = useState('');
  const wallRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver('.frame');

  useEffect(() => {
    if (!wallRef.current) return;
    const frames = wallRef.current.querySelectorAll('.frame');
    frames.forEach((frame) => {
      const delay = Math.random() * 300;
      (frame as HTMLElement).style.transitionDelay = `${delay}ms`;
    });
  }, []);

  const handleFilterChange = useCallback((type: FilterType, value: string) => {
    setFilterType(type);
    setActiveFilter(value);

    if (!wallRef.current) return;
    const wrappers = wallRef.current.querySelectorAll('[data-poet]');

    wrappers.forEach((wrapper) => {
      const el = wrapper as HTMLElement;
      if (type === 'all') {
        el.classList.remove('filtered-out');
      } else if (type === 'poet') {
        const poetSlug = el.dataset.poet;
        if (poetSlug === value) {
          el.classList.remove('filtered-out');
        } else {
          el.classList.add('filtered-out');
        }
      } else if (type === 'mood') {
        const moods = el.dataset.mood || '';
        if (moods.split(' ').includes(value)) {
          el.classList.remove('filtered-out');
        } else {
          el.classList.add('filtered-out');
        }
      }
    });
  }, []);

  return (
    <section className="gallery-section">
      <FilterBar
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
        filterType={filterType}
      />
      <div className="wall" ref={wallRef}>
        {poems.map((poem) => (
          <div
            key={poem.id}
            data-poet={poem.authorSlug}
            data-mood={poem.mood.join(' ')}
          >
            <GalleryFrame poem={poem} />
          </div>
        ))}
      </div>
    </section>
  );
}
