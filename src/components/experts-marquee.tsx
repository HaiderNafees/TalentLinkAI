import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const items = [
  {
    type: 'card',
    cardType: 'stat',
    data: {
      value: '$500M+',
      label: 'Paid to experts',
      className: 'bg-gradient-to-br from-blue-500 to-indigo-700 text-white',
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
          name: 'Robin Francis',
          role: 'Math Expert, US',
          aspect: 'aspect-square',
        },
      },
      {
        cardType: 'stat',
        data: {
          value: '700K+',
          label: 'PhD, MS students onboarded',
          className: 'bg-gradient-to-br from-red-500 to-rose-700 text-white',
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
      role: 'Math Expert, SA',
      aspect: 'aspect-[3/4]',
    },
  },
  {
    type: 'column',
    cards: [
      {
        cardType: 'stat',
        data: {
          value: '50',
          label: 'Countries',
          className: 'bg-gradient-to-br from-purple-500 to-violet-700 text-white',
        },
      },
      {
        cardType: 'expert',
        data: {
          id: 'enzo-d',
          name: 'Enzo D.',
          role: 'Dutch Language Expert',
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
      role: 'Coding Expert, Australia',
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
        'relative rounded-2xl overflow-hidden shadow-lg w-28 sm:w-32 md:w-40',
        aspect
      )}
    >
      {expertImage && (
        <Image
          src={expertImage?.imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
          data-ai-hint={expertImage?.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <p className="font-bold text-lg">{name}</p>
        <p className="text-sm">{role}</p>
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
      'w-28 sm:w-32 md:w-40 h-32 rounded-2xl shadow-lg p-4 flex flex-col justify-center',
      className
    )}
  >
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm mt-1">{label}</p>
  </div>
);

const MarqueeItem = ({
  item,
  index,
}: {
  item: (typeof items)[0];
  index: number;
}) => {
  const marginTops = ['mt-0', 'mt-16', 'mt-8', 'mt-24', 'mt-4', 'mt-20', 'mt-0'];

  let content;
  if (item.type === 'column') {
    content = (
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        {item.cards.map((card, idx) => {
          if (card.cardType === 'expert') {
            return <ExpertCard key={idx} {...card.data} />;
          }
          return <StatCard key={idx} {...card.data} />;
        })}
      </div>
    );
  } else if (item.cardType === 'expert') {
    content = <ExpertCard {...item.data} />;
  } else {
    content = <StatCard {...item.data} />;
  }

  return <div className={cn(marginTops[index % marginTops.length])}>{content}</div>;
};

export default function ExpertsMarquee() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-transparent">
      <div className="relative flex overflow-hidden group [--gap:1rem] sm:[--gap:1.5rem] md:[--gap:2rem]">
        <div className="flex items-start shrink-0 gap-4 sm:gap-6 md:gap-8 px-4 animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((item, index) => (
            <MarqueeItem key={index} item={item} index={index} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex items-start shrink-0 gap-4 sm:gap-6 md:gap-8 px-4 animate-marquee group-hover:[animation-play-state:paused]"
        >
          {items.map((item, index) => (
            <MarqueeItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
