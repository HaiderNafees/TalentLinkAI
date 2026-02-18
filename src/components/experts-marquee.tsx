import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const items = [
  {
    type: 'card',
    cardType: 'stat',
    data: {
      value: '$500M+',
      label: 'Network Earnings',
      className: 'bg-indigo-600 text-white',
    },
  },
  {
    type: 'card',
    cardType: 'expert',
    data: {
      id: 'cuong-n',
      name: 'Cuong N.',
      role: 'SWE, Zinza Tech',
      aspect: 'aspect-[3/4]',
    },
  },
  {
    type: 'card',
    cardType: 'expert',
    data: {
      id: 'max-n',
      name: 'Max N.',
      role: 'Generalist, Poland',
      aspect: 'aspect-[4/5]',
    },
  },
  {
    type: 'column',
    cards: [
      {
        cardType: 'expert',
        data: {
          id: 'robin-francis',
          name: 'Robin F.',
          role: 'PhD, AI Scientist',
          aspect: 'aspect-square',
        },
      },
      {
        cardType: 'stat',
        data: {
          value: '98%',
          label: 'Match Precision',
          className: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500',
        },
      },
    ],
  },
  {
    type: 'card',
    cardType: 'expert',
    data: {
      id: 'nicholas',
      name: 'Nicholas',
      role: 'Full-Stack Expert',
      aspect: 'aspect-[3/4]',
    },
  },
  {
    type: 'column',
    cards: [
      {
        cardType: 'stat',
        data: {
          value: '50+',
          label: 'Global Markets',
          className: 'bg-primary text-primary-foreground',
        },
      },
      {
        cardType: 'expert',
        data: {
          id: 'enzo-d',
          name: 'Enzo D.',
          role: 'LLM Specialist',
          aspect: 'aspect-square',
        },
      },
    ],
  },
  {
    type: 'card',
    cardType: 'expert',
    data: {
      id: 'tara',
      name: 'Tara',
      role: 'GenUI Lead',
      aspect: 'aspect-[3/4]',
    },
  },
];

const ExpertCard = ({
  expertId,
  name,
  role,
  aspect,
}: {
  expertId: string;
  name: string;
  role: string;
  aspect: string;
}) => {
  const expertImage = PlaceHolderImages.find((p) => p.id === expertId);
  return (
    <div
      className={cn(
        'relative rounded-[24px] overflow-hidden shadow-2xl w-32 sm:w-40 md:w-48 group transition-all duration-500 hover:scale-105 border border-white/10',
        aspect
      )}
    >
      {expertImage && (
        <Image
          src={expertImage?.imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
          data-ai-hint={expertImage?.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full backdrop-blur-[2px]">
        <p className="font-bold text-base md:text-xl text-white tracking-tight">{name}</p>
        <p className="text-[10px] md:text-xs text-white/70 font-medium uppercase tracking-wider mt-0.5">{role}</p>
      </div>
    </div>
  );
};

const StatCard = ({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className: string;
}) => (
  <div
    className={cn(
      'w-32 sm:w-40 md:w-48 h-32 md:h-40 rounded-[24px] shadow-xl p-6 flex flex-col justify-center border',
      className
    )}
  >
    <p className="text-2xl md:text-4xl font-black tracking-tighter leading-none">{value}</p>
    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] mt-3 opacity-80">{label}</p>
  </div>
);

const MarqueeItem = ({
  item,
  index,
}: {
  item: (typeof items)[0];
  index: number;
}) => {
  const marginTops = ['mt-0', 'mt-20', 'mt-10', 'mt-28', 'mt-6', 'mt-24', 'mt-0'];

  let content;
  if (item.type === 'column') {
    content = (
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        {item.cards.map((card: any, idx: number) => {
          if (card.cardType === 'expert') {
            return <ExpertCard key={idx} expertId={card.data.id} {...card.data} />;
          }
          return <StatCard key={idx} {...card.data} />;
        })}
      </div>
    );
  } else if (item.cardType === 'expert') {
    return (
      <div className={cn(marginTops[index % marginTops.length])}>
        <ExpertCard expertId={item.data.id} {...item.data} />
      </div>
    );
  } else {
    content = <StatCard {...item.data} />;
  }

  return <div className={cn(marginTops[index % marginTops.length])}>{content}</div>;
};

export default function ExpertsMarquee() {
  return (
    <section className="w-full py-20 md:py-32 bg-transparent relative overflow-hidden">
      {/* Side gradients for smooth transition */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="relative flex overflow-hidden group [--gap:1.5rem] sm:[--gap:2rem] md:[--gap:3rem]">
        <div className="flex items-start shrink-0 gap-6 sm:gap-8 md:gap-12 px-4 animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((item, index) => (
            <MarqueeItem key={index} item={item} index={index} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex items-start shrink-0 gap-6 sm:gap-8 md:gap-12 px-4 animate-marquee group-hover:[animation-play-state:paused]"
        >
          {items.map((item, index) => (
            <MarqueeItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
