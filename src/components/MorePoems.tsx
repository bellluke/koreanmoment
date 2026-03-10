import Image from 'next/image';
import Link from 'next/link';
import { Poem } from '@/data/poems';

interface MorePoemsProps {
  adjacentPoems: Poem[];
}

export default function MorePoems({ adjacentPoems }: MorePoemsProps) {
  return (
    <div>
      <h3 className="more-heading">More Poems</h3>
      <div className="more-poems">
        {adjacentPoems.map((poem) => (
          <Link
            key={poem.id}
            href={`/poems/${poem.slug}`}
            className="more-card"
          >
            <Image
              src={`/poems/${poem.id}/images/${poem.galleryImageFile}`}
              alt={poem.titleEn}
              fill
              sizes="(max-width: 800px) 50vw, 33vw"
            />
            <span className="more-title">{poem.titleEn}</span>
            <span className="more-ko">{poem.titleKo}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
