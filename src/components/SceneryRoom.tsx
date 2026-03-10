import Image from 'next/image';
import { PoemScene } from '@/data/poems';

interface SceneryRoomProps {
  poemId: string;
  scenes: PoemScene[];
}

export default function SceneryRoom({ poemId, scenes }: SceneryRoomProps) {
  return (
    <>
      <section className="room room-scenery">
        {scenes.map((scene, index) => (
          <div key={index} style={{ width: '100%' }}>
            <div className={`scene-image ${scene.cssClass}`}>
              <Image
                src={`/poems/${poemId}/images/${scene.imageFile}`}
                alt={scene.alt}
                fill
                sizes="100vw"
              />
            </div>
            {index < scenes.length - 1 && (
              <div className={`scene-gap-${index + 1}`} />
            )}
          </div>
        ))}
      </section>
      <div className="emptying-spacer" />
    </>
  );
}
