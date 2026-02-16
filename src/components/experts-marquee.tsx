import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const items = [
  {
    type: 'card',
    cardType: 'stat',
    data: { value: '$500M+', label: 'Paid to experts', className: 'bg-gradient-to-br from-blue-500 to-indigo-700 text-white' }
  },
  {
    type: 'card',
    cardType: 'expert',
    data: { id: 'cuong-n', name: 'Cuong N.', role: 'SWE, Zinza Tech', width: 280, height: 420 }
  },
  {
    type: 'card',
    cardType: 'expert',
    data: { id: 'max-n', name: 'Max N.', role: 'Generalist, Poland', width: 280, height: 380 }
  },
  {
    type: 'column',
    cards: [
      { cardType: 'expert', data: { id: 'robin-francis', name: 'Robin Francis', role: 'Math Expert, US', width: 280, height: 280 } },
      { cardType: 'stat', data: { value: '700K+', label: 'PhD, MS students onboarded', className: 'bg-gradient-to-br from-red-500 to-rose-700 text-white' } }
    ]
  },
  {
    type: 'card',
    cardType: 'expert',
    data: { id: 'nicholas', name: 'Nicholas', role: 'Math Expert, SA', width: 280, height: 400 }
  },
    {
    type: 'column',
    cards: [
      { cardType: 'stat', data: { value: '50', label: 'Countries', className: 'bg-gradient-to-br from-purple-500 to-violet-700 text-white' } },
      { cardType: 'expert', data: { id: 'enzo-d', name: 'Enzo D.', role: 'Dutch Language Expert', width: 280, height: 280 } },
    ]
  },
  {
    type: 'card',
    cardType: 'expert',
    data: { id: 'tara', name: 'Tara', role: 'Coding Expert, Australia', width: 280, height: 420 }
  }
];


const ExpertCard = ({ expertId, name, role, width, height }: { expertId: string; name: string; role: string; width: number; height: number; }) => {
  const expertImage = PlaceHolderImages.find((p) => p.id === expertId);
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ width: `${width}px`, height: `${height}px` }}>
      {expertImage && <Image
        src={expertImage?.imageUrl}
        alt={name}
        fill
        className="object-cover"
        data-ai-hint={expertImage?.imageHint}
      />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <p className="font-bold text-lg">{name}</p>
        <p className="text-sm">{role}</p>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, className }: { value: string; label: string; className: string }) => (
  <div className={cn("w-[280px] h-[180px] rounded-2xl shadow-lg p-6 flex flex-col justify-center", className)}>
    <p className="text-4xl font-bold">{value}</p>
    <p className="text-md mt-1">{label}</p>
  </div>
);

const MarqueeItem = ({ item }: { item: typeof items[0] }) => {
  if (item.type === 'column') {
    return (
      <div className="flex flex-col gap-8">
        {item.cards.map((card, index) => {
          if (card.cardType === 'expert') {
            return <ExpertCard key={index} {...card.data} />;
          }
          return <StatCard key={index} {...card.data} />;
        })}
      </div>
    );
  }

  if (item.cardType === 'expert') {
    return <ExpertCard {...item.data} />;
  }

  return <StatCard {...item.data} />;
};


export default function ExpertsMarquee() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-transparent">
        <div className="container mx-auto text-center mb-12">
            <Button size="lg" className="bg-chart-1 text-primary-foreground hover:bg-chart-1/90">View Opportunities</Button>
        </div>
      <div className="relative flex overflow-hidden group [--gap:2rem]">
        <div className="flex items-start shrink-0 gap-8 px-4 animate-marquee group-hover:[animation-play-state:paused]">
            {items.map((item, index) => (
                <MarqueeItem key={index} item={item} />
            ))}
        </div>
        <div aria-hidden="true" className="flex items-start shrink-0 gap-8 px-4 animate-marquee group-hover:[animation-play-state:paused]">
             {items.map((item, index) => (
                <MarqueeItem key={index} item={item} />
            ))}
        </div>
      </div>
    </section>
  );
}
