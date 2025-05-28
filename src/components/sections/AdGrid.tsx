// src/components/sections/AdGrid.tsx
import React from 'react';
import AdCard from '@/components/cards/AdCard';
import { AnuncioPublico } from '@/types/AnuncioPublico';

const categories = ['Mulheres', 'Homens', 'Trans'];

interface AdGridProps {
  ads: AnuncioPublico[];
  loading: boolean;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const AdGrid: React.FC<AdGridProps> = ({
  ads,
  loading,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <section className="py-8 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Filtros de categoria */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-buzzara-secondary text-white'
                : 'bg-buzzara-neutral-light text-gray-300 hover:bg-gray-600'
            }`}
          >
            Todos
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-buzzara-secondary text-white'
                  : 'bg-buzzara-neutral-light text-gray-300 hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Estado de carregamento */}
        {loading ? (
          <div className="text-center text-gray-400">Carregando anúncios...</div>
        ) : ads.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400">
              Nenhum anúncio encontrado com os filtros atuais.
            </p>
          </div>
        ) : (
          // Grid de anúncios
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ads.map((ad) => (
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
        )}
      </div>
    </section>
  );
};

export default AdGrid;
