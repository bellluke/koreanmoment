import { Poem } from '@/data/poems';
import MorePoems from './MorePoems';

interface ShopRoomProps {
  poem: Poem;
  adjacentPoems: Poem[];
}

export default function ShopRoom({ poem, adjacentPoems }: ShopRoomProps) {
  return (
    <section className="room room-shop">
      <MorePoems adjacentPoems={adjacentPoems} />
    </section>
  );
}
