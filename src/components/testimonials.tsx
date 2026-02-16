'use client';

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    type: 'video',
    name: 'Tara',
    role: 'Coding Expert, Australia',
    videoId: 'testimonial-video-1',
  },
  {
    type: 'quote',
    name: 'Enzo D.',
    role: 'Language Specialist, Netherlands',
    quote:
      "Outlier is life changing for me, I have a lot more peace and I can work from anywhere whenever I want. I now have time for myself and hobbies without being tired. I could plan to go on a trip and work a couple of hours per day.",
    avatarId: 'enzo-d',
  },
  {
    type: 'video',
    name: 'Andrew',
    role: 'Code Expert, Bangkok, Thailand',
    videoId: 'testimonial-video-2',
  },
  {
    type: 'quote',
    name: 'Daliah B.',
    role: 'Language Specialist, German',
    quote:
      "The work itself is fun. I'm learning about such a broad variety of topics because every time you see a task, you learn something new. I just learned some cool Swiss recipes for apple fritters.",
    avatarId: 'daliah-b',
  },
];

const VideoCard = ({
  name,
  role,
  videoId,
}: {
  name: string;
  role: string;
  videoId: string;
}) => {
  const videoImage = PlaceHolderImages.find((p) => p.id === videoId);
  return (
    <Card className="h-full">
      <CardContent className="relative aspect-[9/16] h-full w-full p-0">
        {videoImage ? (
          <Image
            src={videoImage.imageUrl}
            alt={`Testimonial from ${name}`}
            fill
            className="object-cover rounded-lg"
            data-ai-hint={videoImage.imageHint}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
            <p className="text-muted-foreground">Video placeholder</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="font-bold">{name}</p>
          <p className="text-sm">{role}</p>
        </div>
        <div className="absolute top-4 right-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

const QuoteCard = ({
  name,
  role,
  quote,
  avatarId,
}: {
  name: string;
  role: string;
  quote: string;
  avatarId: string;
}) => {
  const avatarImage = PlaceHolderImages.find((p) => p.id === avatarId);
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col justify-center p-8 h-full">
        <Avatar className="h-16 w-16 mb-4">
          {avatarImage && (
            <AvatarImage
              src={avatarImage.imageUrl}
              data-ai-hint={avatarImage.imageHint}
            />
          )}
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <blockquote className="text-lg font-medium text-foreground">
          "{quote}"
        </blockquote>
        <div className="mt-4 text-muted-foreground">
          <p className="font-semibold">{name}</p>
          <p>{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-semibold text-primary tracking-wider uppercase">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mt-2">
            Outlier experts growing their careers in tech and AI
          </h2>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1 h-full">
                    {testimonial.type === 'video' ? (
                      <VideoCard {...testimonial} />
                    ) : (
                      <QuoteCard {...testimonial} />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
