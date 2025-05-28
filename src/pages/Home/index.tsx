// src/pages/HomePage.tsx
import { useState } from "react";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import FeaturedSection from "@/components/sections/FeaturedSection";
import AdGrid from "@/components/sections/AdGrid";
import Footer from "@/components/layout/Footer";
import PopularSection from "@/components/sections/PopularSection";
import MostViewedSection from "@/components/sections/MostViewedSection";
import AnnouncementSection from "@/components/sections/AnnouncementSection";
import { useAds } from "@/hooks/useAds";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("");

  const { ads, loading } = useAds(filtro);

  const filteredAds: AnuncioPublico[] =
    filtro.trim() !== ""
      ? ads
      : activeCategory
      ? ads.filter((ad) => ad.categoria === activeCategory)
      : ads;

  const handleSearch = (term: string) => {
    console.log("[HomePage] handleSearch:", term);
    setFiltro("");
    setTimeout(() => setFiltro(term), 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background">
      <Header onSearch={handleSearch} />
      <Navigation
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
      />

      <main className="flex-1">
        <FeaturedSection anuncios={filteredAds} loading={loading} />
        <AnnouncementSection
          activeCategory={activeCategory}
          anuncios={filteredAds}
          loading={loading}
        />
        <PopularSection anuncios={filteredAds} loading={loading} />

        {loading ? (
          <div className="text-center text-gray-400 py-16 text-lg">
            Buscando anúncios...
          </div>
        ) : (
          <AdGrid
            ads={filteredAds}
            loading={loading}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
