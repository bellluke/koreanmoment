import { PoemText } from '@/data/poems';

interface PoemTextRoomProps {
  poemText: PoemText;
}

export default function PoemTextRoom({ poemText }: PoemTextRoomProps) {
  return (
    <>
      <section className="room room-poem">
        <div className="room-content poem-text">
          {poemText.stanzasEn.map((stanza, stanzaIndex) => (
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
