
import React from 'react';
import AdCard from '@/components/cards/AdCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IAd } from '@/types';

interface MostViewedSectionProps {
  activeCategory: string | null;
}

// Sample data for most viewed ads
const mostViewedAds: IAd[] = [
  {
    id: '6',
    name: 'Fernanda Lima',
    image: 'https://plus.unsplash.com/premium_photo-1677197071637-092eeb20d8ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5.0,
    reviews: 48,
    views: 1870,
    price: { current: 400 },
    tag: { text: 'HOT', type: 'hot' },
    category: 'Mulheres'
  },
  {
    id: '3',
    name: 'Carla Mendes',
    image: 'https://plus.unsplash.com/premium_photo-1677197071637-092eeb20d8ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
    reviews: 56,
    views: 1580,
    price: { current: 280, original: 350 },
    tag: { text: 'SALE', type: 'sale' },
    category: 'Mulheres'
  },
  {
    id: '8',
    name: 'Helena Soares',
    image: 'https://plus.unsplash.com/premium_photo-1677197071637-092eeb20d8ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
    reviews: 31,
    views: 1450,
    price: { current: 310, original: 380 },
    tag: { text: 'SALE', type: 'sale' },
    category: 'Trans'
  },
  {
    id: '1',
    name: 'Ana Luiza',
    image: 'https://plus.unsplash.com/premium_photo-1677197071637-092eeb20d8ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
    reviews: 42,
    views: 1205,
    price: { current: 350, original: 450 },
    tag: { text: 'HOT', type: 'hot' },
    category: 'Mulheres'
  },
  {
    id: '11',
    name: 'Pedro Silva',
    image: 'https://plus.unsplash.com/premium_photo-1677197071637-092eeb20d8ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    reviews: 35,
    views: 1150,
    price: { current: 320 },
    category: 'Homens'
  },
  {
    id: '12',
    name: 'Juliana e Marcos',
    image: 'https://plus.unsplash.com/premium_photo-1677197071637-092eeb20d8ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
    reviews: 38,
    views: 1190,
    price: { current: 540, original: 650 },
    tag: { text: 'HOT', type: 'hot' },
    category: 'Casais'
  }
];

const MostViewedSection: React.FC<MostViewedSectionProps> = ({ activeCategory }) => {
  // Filter ads based on active category
  const filteredAds = activeCategory 
    ? mostViewedAds.filter(ad => ad.category === activeCategory)
    : mostViewedAds;
  
  // If no ads match the filter, return null or empty component
  if (filteredAds.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-4 md:px-8 relative">
      <div className="container mx-auto">
        <h2 className="featured-section-title text-white">Mais Visualizados</h2>
        
        <div className="relative mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {filteredAds.map((ad) => (
                <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-1">
                    <AdCard {...ad} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 border-none" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 border-none" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MostViewedSection;
