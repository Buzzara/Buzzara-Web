import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Check, Clock, Eye } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data for the profile - in a real app this would come from an API
const profiles = [
  {
    id: '101',
    name: 'Acompanhante Premium',
    description: 'Serviços exclusivos de acompanhante para eventos sociais e privados. Acompanho em jantares, festas e viagens. Ofereço discrição, elegância e companhia agradável para momentos especiais.',
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
    ],
    price: { current: 450 },
    location: 'São Paulo, Centro',
    category: 'Mulheres',
    postedDate: '2023-05-01',
    rating: 4.9,
    reviews: 37,
    views: 1250,
    tag: { text: 'HOT', type: 'hot' as const },
    age: 25,
    height: '1.72m',
    weight: '58kg',
    phone: '+55 11 99999-9999',
    email: 'contato@premium.com',
    availability: ['Segunda - Sexta: 10h - 22h', 'Sábado: 12h - 00h'],
    services: ['Encontros', 'Jantares', 'Viagens', 'Eventos', 'Massagens'],
    about: 'Acompanhante de alto nível para momentos especiais. Ofereço companhia agradável e sofisticada para diversos tipos de eventos e encontros.'
  },
  // ... other profiles
];

// Other profile mock data
const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const profile = profiles.find(p => p.id === id) || profiles[0]; // Fallback to first profile if not found
  
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
    <div className="min-h-screen flex flex-col bg-buzzara-background">
      <Header />
      
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-white transition-colors">{profile.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{profile.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Gallery */}
            <div>
              <div className="relative mb-4">
                {profile.tag && (
                  <div className={`absolute top-2 right-2 py-1 px-3 text-xs font-semibold rounded-full text-white z-10 ${getTagColor(profile.tag.type)}`}>
                    {profile.tag.text}
                  </div>
                )}
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {profile.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <img 
                            src={image}
                            alt={`${profile.name} - Image ${index+1}`}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 border-none" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 border-none" />
                </Carousel>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-2">
                {profile.images.map((image, index) => (
                  <div key={index} className="aspect-square">
                    <img 
                      src={image}
                      alt={`Thumbnail ${index+1}`}
                      className="w-full h-full object-cover rounded cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div className="text-white">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-buzzara-secondary fill-buzzara-secondary" />
                  <span className="text-xl ml-1">{profile.rating}</span>
                  <span className="text-gray-400 text-sm ml-1">({profile.reviews})</span>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span>{profile.location}</span>
                <Badge className="ml-3 bg-gray-700">{profile.category}</Badge>
              </div>
              
              <div className="flex items-center mb-6">
                <Eye className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">{profile.views} visualizações</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  {profile.price && (
                    <>
                      <span className="text-2xl font-bold text-buzzara-secondary">
                        R${profile.price.current}
                      </span>
                      
                      {'original' in profile.price && profile.price.original && (
                        <span className="ml-2 text-lg text-gray-400 line-through">
                          R${profile.price.original}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Publicado: {profile.postedDate}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-buzzara-neutral-light p-3 rounded">
                  <span className="text-gray-400">Idade</span>
                  <p className="font-semibold">{profile.age} anos</p>
                </div>
                <div className="bg-buzzara-neutral-light  p-3 rounded">
                  <span className="text-gray-400">Altura</span>
                  <p className="font-semibold">{profile.height}</p>
                </div>
                <div className="bg-buzzara-neutral-light p-3 rounded">
                  <span className="text-gray-400">Peso</span>
                  <p className="font-semibold">{profile.weight}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Contato:</h3>
                <div className="flex items-center mb-2">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{profile.email}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Disponibilidade:</h3>
                <ul className="text-gray-300">
                  {profile.availability.map((time, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Serviços:</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service, index) => (
                    <Badge key={index} className="bg-buzzara-primary text-white py-1">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Sobre</h2>
            <div className="bg-buzzara-neutral-light p-6 rounded-lg text-gray-300">
              <p>{profile.about}</p>
              <p className="mt-4">{profile.description}</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
