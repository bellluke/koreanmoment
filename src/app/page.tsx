import FeaturedPoem from "@/components/FeaturedPoem";
import GalleryWall from "@/components/GalleryWall";
import Footer from "@/components/Footer";
import { getAllPoems } from "@/lib/poems";

export default function HomePage() {
  const poems = getAllPoems();

  return (
    <main>
      <FeaturedPoem />
      <GalleryWall poems={poems} />
      <Footer variant="default" />
    </main>
  );
}
