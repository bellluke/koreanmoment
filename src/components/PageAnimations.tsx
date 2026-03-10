'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function PageAnimations(): null {
  useIntersectionObserver('.room-content');
  return null;
}
