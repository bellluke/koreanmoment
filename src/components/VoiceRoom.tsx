import { PoemText } from '@/data/poems';

interface VoiceRoomProps {
  poemText: PoemText;
}

export default function VoiceRoom({ poemText }: VoiceRoomProps) {
  return (
    <>
      <section className="room room-voice">
        <div className="room-content poem-text-ko">
          {poemText.stanzasKo.map((stanza, stanzaIndex) => (
            <div key={stanzaIndex} className="stanza">
              {stanza.map((line, lineIndex) =>
                line === '' ? (
                  <br key={lineIndex} />
                ) : (
                  <span key={lineIndex} className="line">
                    {line}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </section>
      <div className="breath-spacer" />
    </>
  );
}
