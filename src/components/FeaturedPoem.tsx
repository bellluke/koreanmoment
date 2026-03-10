import Link from "next/link";
import { poems } from "@/data/poems";

const poem = poems.find((p) => p.id === "001")!;

export default function FeaturedPoem() {
  return (
    <section className="featured">
      <Link href="/poems/prologue-yun-dongju">
        <div
          className="featured-bg"
          style={{
            backgroundImage: `url(/poems/001/images/001-scene-1-v2.webp)`,
          }}
        />
        <div className="featured-content">
          <div className="featured-label">Featured Poem</div>
          <h1 className="featured-title">Prologue</h1>
          <p className="featured-title-ko">서시</p>
          <p className="featured-poet">Yun Dong-ju · 윤동주</p>
          <p className="featured-excerpt">
            Until the day I die, I wish to look up
            <br />
            at the heavens with not a speck of shame.
            <br />
            Even the wind stirring through leaves
            <br />
            has caused me suffering.
          </p>
          <span className="featured-enter">Enter →</span>
        </div>
        <div className="scroll-down" />
      </Link>
    </section>
  );
}
