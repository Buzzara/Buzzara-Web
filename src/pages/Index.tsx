
import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import FeaturedSection from '@/components/FeaturedSection';
import AdGrid from '@/components/AdGrid';
import Footer from '@/components/Footer';
import PopularSection from '@/components/PopularSection';
import MostViewedSection from '@/components/MostViewedSection';
import AnnouncementSection from '@/components/AnnouncementSection';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Handler for category changes from navigation
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background">
      <Header />
      <Navigation onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
      <main className="flex-1">
        <FeaturedSection activeCategory={activeCategory} />
        <AnnouncementSection activeCategory={activeCategory} />
        <PopularSection activeCategory={activeCategory} />
        <MostViewedSection activeCategory={activeCategory} />
        <AdGrid activeCategory={activeCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
