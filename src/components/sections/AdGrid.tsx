// src/components/sections/AdGrid.tsx
import React from 'react';
import AdCard from '@/components/cards/AdCard';
import { useAds } from '@/hooks/useAds';
import { AnuncioPublico } from '@/types/AnuncioPublico';

const categories = ['Mulheres', 'Homens', 'Trans', 'Casais'];

const AdGrid: React.FC = () => {
  const { ads, loading, category, setCategory } = useAds();

  const filteredAds = category
    ? ads.filter((ad: AnuncioPublico) => ad.categoria === category)
    : ads;

  return (
    <section className="py-8 px-4 md:px-8">
      <div className="container mx-auto">
        {/* filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors
              ${!category
                ? 'bg-buzzara-secondary text-white'
                : 'bg-buzzara-neutral-light text-gray-300 hover:bg-gray-600'}`}
          >
            Todos
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors
                ${category === cat
                  ? 'bg-buzzara-secondary text-white'
                  : 'bg-buzzara-neutral-light text-gray-300 hover:bg-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* estado de carregamento */}
        {loading ? (
          <div className="text-center text-gray-400">
            Carregando anúncios...
          </div>
        ) : (
          <>
            {/* grid de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAds.map((ad: AnuncioPublico) => (
                <AdCard
                  key={ad.servicoID}
                  id={String(ad.servicoID)}
                  name={ad.nome}
                  image={ad.fotos?.[0]?.url || ''}
                  rating={4.5}
                  reviews={12}
                  views={1000}
                  price={{ current: ad.preco }}
                  tag={null}
                  category={ad.categoria || 'Outros'}
                />
              ))}
            </div>

            {/* mensagem caso não haja anúncios */}
            {filteredAds.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-400">
                  Nenhum anúncio encontrado nesta categoria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AdGrid;
