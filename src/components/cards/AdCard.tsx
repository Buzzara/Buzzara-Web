
import React from 'react';
import { Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface AdCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  views?: number;
  price?: {
    current: number;
    original?: number;
  };
  tag?: {
    text: string;
    type: 'new' | 'hot' | 'sale';
  };
}

const AdCard: React.FC<AdCardProps> = ({
  id,
  name,
  image,
  rating,
  reviews,
  views,
  price,
  tag
}) => {
  // Function to get tag background color
  const getTagColor = (type: 'new' | 'hot' | 'sale') => {
    const colors = {
      new: 'bg-buzzara-tag-new',
      hot: 'bg-buzzara-tag-hot',
      sale: 'bg-buzzara-tag-sale'
    };
    return colors[type];
  };

  return (
    <Link to={`/profile/${id}`} className="block">
      <div className="ad-card group">
        {/* Tag */}
        {tag && (
          <div className={cn('tag', getTagColor(tag.type))}>
            {tag.text}
          </div>
        )}
        
        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Name */}
          <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating) ? "text-buzzara-secondary fill-buzzara-secondary" : "text-gray-400"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-2">({reviews})</span>
          </div>
          
          {/* Views - added */}
          {views !== undefined && (
            <div className="flex items-center mb-3">
              <Eye className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-400">{views} visualizações</span>
            </div>
          )}
          
          {/* Price */}
          {price && (
            <div className="flex items-center">
              <span className="text-lg font-bold text-buzzara-secondary">
                R${price.current}
              </span>
              
              {price.original && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  R${price.original}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
