// src/components/sections/PopularSection.tsx
import React from 'react';
import AdCard from '@/components/cards/AdCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useAds } from '@/hooks/useAds';
import { AnuncioPublico } from '@/types/AnuncioPublico';

const PopularSection: React.FC = () => {
  const { ads, loading } = useAds();

  // não renderiza enquanto carrega ou se não houver anúncios
  if (loading || ads.length === 0) return null;

  return (
    <section className="py-8 px-4 md:px-8 relative">
      <div className="container mx-auto">
        <h2 className="featured-section-title text-white">Mais Populares</h2>
        <div className="relative mt-8">
          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent>
              {ads.map((ad: AnuncioPublico) => (
                <CarouselItem
                  key={ad.servicoID}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <AdCard
                      id={String(ad.servicoID)}
                      name={ad.nome}
                      image={ad.fotos?.[0]?.url || ''}
                      rating={4.5}         // ajuste se vier da API
                      reviews={12}         // ajuste se vier da API
                      views={1000}         // ajuste se vier da API
                      price={{ current: ad.preco }}
                      tag={null}           // ou ad.tag, se existir
                    />
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

export default PopularSection;
