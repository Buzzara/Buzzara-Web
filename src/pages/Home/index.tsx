// src/pages/HomePage.tsx
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import FeaturedSection from "@/components/sections/FeaturedSection";
import AdGrid from "@/components/sections/AdGrid";
import Footer from "@/components/layout/Footer";
import PopularSection from "@/components/sections/MostViewedSection";
import AnnouncementSection from "@/components/sections/AnnouncementSection";
import { useAds } from "@/hooks/useAds";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

const INITIAL_VISIBLE = 8; // quantos anúncios mostrar de cada “página”

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);

  const { ads, loading } = useAds(filtro);

  // sempre que mudar categoria ou pesquisa, resetamos a contagem
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeCategory, filtro]);

  // filtra pelos termos de busca ou pela categoria ativa
  const filteredAds: AnuncioPublico[] =
    filtro.trim() !== ""
      ? ads
      : activeCategory
      ? ads.filter((ad) => ad.categoria === activeCategory)
      : ads;

  // aplica paginação em todas as vistas
  const adsToShow = filteredAds.slice(0, visibleCount);

  const handleSearch = (term: string) => {
    // dispara a busca limpa
    setFiltro("");
    setTimeout(() => setFiltro(term), 0);
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background">
      <Header onSearch={handleSearch} />

      <Navigation
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
      />

      <main className="flex-1 px-4 md:px-8">
        <FeaturedSection anuncios={adsToShow} loading={loading} />
        <AnnouncementSection
          activeCategory={activeCategory}
          anuncios={adsToShow}
          loading={loading}
        />

        {loading ? (
          <div className="text-center text-gray-400 py-16 text-lg">
            Buscando anúncios...
          </div>
        ) : (
          <>
            <AdGrid
              ads={adsToShow}
              loading={loading}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* botão “Ver Mais” para qualquer categoria ou busca */}
            {visibleCount < filteredAds.length && (
              <div className="flex justify-center my-6">
                <button
                  onClick={handleSeeMore}
                  className="px-6 py-2 bg-buzzara-secondary text-white rounded hover:bg-opacity-90 transition"
                >
                  Ver Mais
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
