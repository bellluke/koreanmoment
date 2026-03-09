import { poems, Poem } from "@/data/poems";

export function getAllPoems(): Poem[] {
  return poems;
}

export function getPoemBySlug(slug: string): Poem | undefined {
  return poems.find((poem) => poem.slug === slug);
}

export function getPoemById(id: string): Poem | undefined {
  return poems.find((poem) => poem.id === id);
}

export function getPoetFilterList(): { label: string; slug: string }[] {
  const seen = new Set<string>();
  const result: { label: string; slug: string }[] = [];
  for (const poem of poems) {
    if (!seen.has(poem.authorSlug)) {
      seen.add(poem.authorSlug);
      result.push({ label: poem.authorEn, slug: poem.authorSlug });
    }
  }
  return result;
}

export function getMoodFilterList(): string[] {
  const seen = new Set<string>();
  for (const poem of poems) {
    for (const mood of poem.mood) {
      seen.add(mood);
    }
  }
  return Array.from(seen);
}

export function getAdjacentPoems(currentSlug: string, count: number = 3): Poem[] {
  const currentIndex = poems.findIndex((poem) => poem.slug === currentSlug);
  if (currentIndex === -1) {
    return poems.slice(0, count);
  }
  const result: Poem[] = [];
  for (let i = 1; i <= count; i++) {
    const nextIndex = (currentIndex + i) % poems.length;
    result.push(poems[nextIndex]);
  }
  return result;
}
