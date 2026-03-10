import Image from 'next/image';

interface VideoRoomProps {
  youtubeId: string;
  poemId: string;
}

export default function VideoRoom({ youtubeId, poemId }: VideoRoomProps) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <>
      <section className="room room-video">
        <a
          href={youtubeUrl}
          className="video-frame"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={thumbnailUrl}
            alt="Watch video on YouTube"
            fill
            sizes="100vw"
          />
          <div className="video-play" />
        </a>
        <a
          href={youtubeUrl}
          className="youtube-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </a>
      </section>
      <div className="lighten-spacer" />
    </>
  );
}
