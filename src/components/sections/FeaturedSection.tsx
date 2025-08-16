// src/components/sections/FeaturedSection.tsx
import React from "react";
import AdCard from "@/components/cards/AdCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

interface FeaturedSectionProps {
  anuncios: AnuncioPublico[];
  loading: boolean;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  anuncios,
  loading,
}) => {
  if (loading || anuncios.length === 0) {
    return null;
  }

  function getRandomViews(min = 100, max = 5000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <section className="py-8 px-4 md:px-8 relative">
      <div className="container mx-auto">
        <h2 className="featured-section-title text-white">Em Destaque</h2>
        <div className="relative mt-8">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {anuncios.map((ad) => (
                <CarouselItem
                  key={ad.servicoID}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2"
                >
                  <AdCard
                    id={String(ad.servicoID)}
                    name={ad.nome}
                    description={ad.descricao}
                    image={ad.fotos?.[0]?.url || ""}
                    rating={4.5}
                    reviews={12}
                    views={getRandomViews()}
                    price={{ current: ad.preco }}
                    tag={null}
                    category={ad.categoria || "Outros"}
                    location={
                      ad.localizacao
                        ? `${ad.localizacao.cidade}, ${ad.localizacao.estado}`
                        : ""
                    }
                  />
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

export default FeaturedSection;
