import { SilenceInfo } from '@/data/poems';

interface SilenceRoomProps {
  silence: SilenceInfo;
}

export default function SilenceRoom({ silence }: SilenceRoomProps) {
  return (
    <>
      <section className="room room-silence">
        <div className="room-content silence-text">
          <span className="year">{silence.writtenDate}</span>
          {silence.deathInfo.map((line, index) => (
            <span key={index} className="death">
              {line}
            </span>
          ))}
          <span className="age">{silence.age}</span>
        </div>
      </section>
      <div className="warm-spacer" />
    </>
  );
}
