import React from 'react';
import { Star, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { IAnnouncement } from '@/types';

interface AnnouncementCardProps {
  announcement: IAnnouncement;
}

const getTagColor = (type: 'new' | 'hot' | 'sale') => {
  const colors = {
    new: 'bg-buzzara-tag-new',
    hot: 'bg-buzzara-tag-hot',
    sale: 'bg-buzzara-tag-sale'
  };
  return colors[type];
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <Link to={`/profile/${announcement.id}`} className="block hover:no-underline h-full">
      <Card className="flex flex-col h-full bg-buzzara-card border-none text-white hover:shadow-lg transition-shadow">
        {/* Imagem com tag (se houver) */}
        <div className="relative">
          {announcement.tag && (
            <div className={`absolute top-2 right-2 py-1 px-3 text-xs font-semibold rounded-full text-white z-10 ${getTagColor(announcement.tag.type)}`}>
              {announcement.tag.text}
            </div>
          )}
          <img 
            src={announcement.image} 
            alt={announcement.title}
            className="w-full aspect-[4/3] object-cover"
          />
        </div>

        {/* Cabeçalho */}
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-white">{announcement.title}</CardTitle>
        </CardHeader>

        {/* Conteúdo principal (expansível) */}
        <CardContent className="pb-2 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-300 line-clamp-2 mb-2">{announcement.description}</p>

            <div className="flex items-center justify-between mt-2 mb-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-buzzara-secondary fill-buzzara-secondary" />
                <span className="text-sm text-white ml-1">{announcement.rating}</span>
                <span className="text-xs text-gray-400 ml-1">({announcement.reviews})</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Eye className="h-4 w-4 mr-1" />
                <span className="text-xs">{announcement.views}</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 mb-1">
              <span>{announcement.location}</span>
            </div>

            <Badge className="bg-gray-700 text-xs font-normal">
              {announcement.category}
            </Badge>
          </div>
        </CardContent>

        {/* Rodapé com data e preço */}
        <CardFooter className="pt-0 flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>Publicado: {announcement.postedDate}</span>
          </div>
          <span className="text-lg font-bold text-buzzara-secondary">R${announcement.price}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AnnouncementCard;
