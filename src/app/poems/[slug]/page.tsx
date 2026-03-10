import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPoems, getPoemBySlug, getAdjacentPoems } from '@/lib/poems';
import ThresholdRoom from '@/components/ThresholdRoom';
import PoemTextRoom from '@/components/PoemTextRoom';
import VoiceRoom from '@/components/VoiceRoom';
import AudioPlayButton from '@/components/AudioPlayButton';
import SceneryRoom from '@/components/SceneryRoom';
import SilenceRoom from '@/components/SilenceRoom';
import VideoRoom from '@/components/VideoRoom';
import ShopRoom from '@/components/ShopRoom';
import Footer from '@/components/Footer';
import PageAnimations from '@/components/PageAnimations';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const poems = getAllPoems();
  return poems.map((poem) => ({
    slug: poem.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);

  if (!poem) {
    return {
      title: 'Poem Not Found | Korean Moment',
    };
  }

  return {
    title: `${poem.titleEn} — ${poem.authorEn} | Korean Moment`,
    description: poem.excerpt,
    openGraph: {
      title: `${poem.titleEn} — ${poem.authorEn} | Korean Moment`,
      description: poem.excerpt,
      images: [`/poems/${poem.id}/images/${poem.galleryImageFile}`],
    },
  };
}

export default async function PoemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);

  if (!poem) {
    notFound();
  }

  const adjacentPoems = getAdjacentPoems(slug, 3);
  const isFull = poem.exhibitionType === 'full';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Poem',
    name: poem.titleEn,
    alternateName: poem.titleKo,
    author: {
      '@type': 'Person',
      name: poem.authorEn,
      alternateName: poem.authorKo,
    },
    description: poem.excerpt,
    image: `/poems/${poem.id}/images/${poem.galleryImageFile}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <PageAnimations />
        <ThresholdRoom poem={poem} />
        <PoemTextRoom poemText={poem.poem} />
        <VoiceRoom poemText={poem.poem} />
        <AudioPlayButton audioSrc={`/poems/${poem.id}/audio/mixed.mp3`} />
        <div className="blackout-spacer" />
        <SceneryRoom poemId={poem.id} scenes={poem.scenes} />
        <SilenceRoom silence={poem.silence} />
        {isFull && poem.youtubeId && (
          <VideoRoom youtubeId={poem.youtubeId} poemId={poem.id} />
        )}
        <ShopRoom poem={poem} adjacentPoems={adjacentPoems} />
        <Footer variant="detail" />
      </main>
    </>
  );
}
