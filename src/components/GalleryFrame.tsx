import Image from "next/image";
import Link from "next/link";
import { Poem } from "@/data/poems";

interface GalleryFrameProps {
  poem: Poem;
}

export default function GalleryFrame({ poem }: GalleryFrameProps) {
  return (
    <Link
      href={`/poems/${poem.slug}`}
      className={`frame ${poem.frameSize} ${poem.moodColor}`}
    >
      <div className="frame-image">
        <Image
          src={`/poems/${poem.id}/images/${poem.galleryImageFile}`}
          alt={poem.titleEn}
          fill
          sizes="(max-width: 800px) 50vw, 33vw"
        />
      </div>
      <div className="frame-overlay">
        <div className="frame-title">{poem.titleEn}</div>
        <div className="frame-title-ko">{poem.titleKo}</div>
        <div className="frame-poet">{poem.authorEn}</div>
        <div className="frame-excerpt">{poem.excerpt}</div>
      </div>
    </Link>
  );
}
