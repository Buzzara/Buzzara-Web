import React from 'react';
import { Eye, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface AdCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;   // mantido por compatibilidade
  reviews: number;  // mantido por compatibilidade
  views?: number;
  price?: {
    current: number;
    original?: number;
  };
  tag?: {
    text: string;
    type: 'new' | 'hot' | 'sale';
  };
  category?: string;
  location?: string;
  postedDate?: string;
}

const AdCard: React.FC<AdCardProps> = ({
  id,
  name,
  description,
  image,
  rating,   // eslint-disable-line @typescript-eslint/no-unused-vars
  reviews,  // eslint-disable-line @typescript-eslint/no-unused-vars
  views,
  price,    // eslint-disable-line @typescript-eslint/no-unused-vars
  tag,
  category,
  location,
  postedDate,
}) => {
  const getTagColor = (type: 'new' | 'hot' | 'sale') => {
    const colors = {
      new: 'bg-buzzara-tag-new',
      hot: 'bg-buzzara-tag-hot',
      sale: 'bg-buzzara-tag-sale',
    };
    return colors[type];
  };

  const viewsLabel = new Intl.NumberFormat('pt-BR').format(views ?? 0);

  return (
    <Link to={`/profile/${id}`} className="block h-full">
      <div className="group flex flex-col h-full bg-buzzara-card rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
        {/* Imagem */}
        <div className="relative">
          {tag && (
            <div
              className={cn(
                'absolute top-2 right-2 py-1 px-3 text-xs font-semibold rounded-full text-white z-10',
                getTagColor(tag.type)
              )}
            >
              {tag.text}
            </div>
          )}
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4 flex flex-col flex-1">
          {/* Título e descrição */}
          <div>
            <h3 className="text-white font-semibold text-base">{name}</h3>
            <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
          </div>

          {/* Views alinhadas à direita */}
          <div className="mt-3 flex justify-end">
            <div className="flex items-center text-gray-300" aria-label="visualizações">
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-xs">{viewsLabel}</span>
            </div>
          </div>

          {/* Localização e categoria */}
          <div className="mt-2">
            {location && <div className="text-xs text-gray-400">{location}</div>}
            {/* {category && (
              <Badge className="bg-gray-700 text-xs font-normal mt-1">
                {category}
              </Badge>
            )} */}
          </div>

          {/* Publicado (preso no rodapé) */}
          <div className="mt-auto pt-3 text-xs text-gray-400">
            {postedDate && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Publicado: {postedDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
