'use client';

import { getPoetFilterList, getMoodFilterList } from '@/lib/poems';

type FilterType = 'all' | 'poet' | 'mood';

interface FilterBarProps {
  onFilterChange: (type: FilterType, value: string) => void;
  activeFilter: string;
  filterType: FilterType;
}

export default function FilterBar({ onFilterChange, activeFilter, filterType }: FilterBarProps) {
  const poets = getPoetFilterList();
  const moods = getMoodFilterList();

  return (
    <div className="filter-bar">
      <button
        className={`filter-link${filterType === 'all' ? ' active' : ''}`}
        onClick={() => onFilterChange('all', '')}
      >
        All
      </button>
      <span className="filter-sep">·</span>
      {poets.map((poet) => (
        <button
          key={poet.slug}
          className={`filter-link${filterType === 'poet' && activeFilter === poet.slug ? ' active' : ''}`}
          onClick={() => onFilterChange('poet', poet.slug)}
        >
          {poet.label}
        </button>
      ))}
      <span className="filter-sep">·</span>
      {moods.map((mood) => (
        <button
          key={mood}
          className={`filter-link${filterType === 'mood' && activeFilter === mood ? ' active' : ''}`}
          onClick={() => onFilterChange('mood', mood)}
        >
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </button>
      ))}
    </div>
  );
}
