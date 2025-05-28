import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

interface Category {
  id: string;
  name: string;
  highlight?: boolean;
  filter?: string;
  url?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories: Category[] = [
    {
      id: 'anuncie',
      name: 'Anuncie agora',
      highlight: true,
      url: 'https://painel.buzzara.com.br/registro',
    },
    { id: 'mulheres', name: 'Mulheres', filter: 'Mulheres' },
    { id: 'homens',   name: 'Homens',   filter: 'Homens'   },
    { id: 'trans',    name: 'Trans',    filter: 'Trans'    },
  ];

  return (
    <nav className="w-full py-3 px-4 md:px-8 sticky top-0 z-20 border-b border-[#3d433f] shadow-lg bg-buzzara-background">
      <div className="container mx-auto flex items-center overflow-x-auto">
        {categories.map((cat) => {
          const isFilter   = Boolean(cat.filter);
          const isExternal = Boolean(cat.url);

          return (
            <a
              key={cat.id}
              href={cat.url ?? `#${cat.id}`}
              onClick={(e) => {
                if (isFilter) {
                  e.preventDefault();
                  onCategoryChange(
                    activeCategory === cat.filter ? null : cat.filter!
                  );
                }
              }}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={cn(
                'whitespace-nowrap px-4 py-1 mx-1 rounded-md font-medium text-sm transition-colors duration-200',
                cat.highlight
                  ? 'bg-buzzara-accent text-white hover:bg-red-600'
                  : activeCategory === cat.filter
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              )}
            >
              {cat.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
