'use client';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface AudioPlayButtonProps {
  audioSrc: string;
}

export default function AudioPlayButton({ audioSrc }: AudioPlayButtonProps) {
  const { isPlaying, toggle } = useAudioPlayer(audioSrc);

  return (
    <section className="room room-play">
      <button className="play-btn" onClick={toggle}>
        {isPlaying ? '❚❚' : '▶'}
      </button>
    </section>
  );
}
