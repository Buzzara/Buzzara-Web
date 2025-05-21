import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'anuncie', name: 'Anuncie agora', highlight: true },
    { id: 'mulheres', name: 'Mulheres', filter: 'Mulheres' },
    { id: 'homens', name: 'Homens', filter: 'Homens' },
    { id: 'trans', name: 'Trans', filter: 'Trans' },
    { id: 'casais', name: 'Casais', filter: 'Casais' }
  ];

  return (
    <nav
      className="w-full py-3 px-4 md:px-8 sticky top-0 z-20 border-b border-[#3d433f] shadow-lg bg-buzzara-background"
    >
      <div className="container mx-auto flex items-center overflow-x-auto">
        {categories.map((category) => (
          <a 
            key={category.id}
            href={`#${category.id}`}
            className={cn(
              "whitespace-nowrap px-4 py-1 mx-1 rounded-md font-medium text-sm transition-colors duration-200",
              category.highlight 
                ? "bg-buzzara-accent text-white hover:bg-red-600" 
                : activeCategory === category.filter
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (category.filter) {
                onCategoryChange(
                  activeCategory === category.filter
                    ? null
                    : category.filter
                );
              }
            }}
          >
            {category.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
