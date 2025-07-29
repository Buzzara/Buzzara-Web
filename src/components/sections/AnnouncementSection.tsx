// src/components/sections/AnnouncementSection.tsx
import React from "react";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import type { AnuncioPublico } from "@/types/AnuncioPublico";
import type { IAnnouncement } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// 👉 Função auxiliar para gerar views aleatórias
function getRandomViews(min = 100, max = 5000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface AnnouncementSectionProps {
  activeCategory: string | null;
  anuncios: AnuncioPublico[];
  loading: boolean;
}

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({
  activeCategory,
  anuncios,
  loading,
}) => {
  if (loading) return null;

  const mapped: IAnnouncement[] = anuncios.map((ad) => ({
    id: String(ad.servicoID),
    title: ad.nome,
    description: ad.descricao,
    image: ad.fotos[0]?.url ?? "",
    price: ad.preco,
    location: ad.localizacao
      ? [ad.localizacao.cidade, ad.localizacao.estado]
          .filter(Boolean)
          .join(", ")
      : "",
    category: ad.categoria,
    postedDate: ad.dataCriacao, // ✅ agora com data + hora
    rating: 0,
    reviews: 0,
    views: getRandomViews(),
    tag: undefined,
  }));

  const filtered = activeCategory
    ? mapped.filter((ann) => ann.category === activeCategory)
    : mapped;

  const sorted = filtered
    .slice()
    .sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );

  if (sorted.length === 0) return null;

  return (
    <section className="py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="featured-section-title text-white">Anúncios Recentes</h2>
        <div className="relative mt-8">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {sorted.map((announcement) => (
                <CarouselItem
                  key={announcement.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2"
                >
                  <div className="h-[480px]">
                    <div className="h-full">
                      <AnnouncementCard announcement={announcement} />
                    </div>
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

export default AnnouncementSection;
