// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Search, MapPin, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LogoImg from '@/assets/images/logo.png';
import { useGeolocation } from '@/hooks/useGeolocation';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [locationName, setLocationName] = useState('Carregando...');
  const { coords, loading: geoLoading } = useGeolocation();

  const handleSearch = () => {
    const term = search.trim();
    console.log('[Header] 🔍 Termo de busca enviado:', term);
    onSearch(term);
  };

  // Faz o reverse geocoding quando as coords estiverem disponíveis
  useEffect(() => {
    if (!coords) return;

    const fetchLocationName = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
        );
        const data = await response.json();
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          'Localização desconhecida';
        setLocationName(city);
      } catch (error) {
        console.error('[Header] Erro ao buscar localização:', error);
        setLocationName('Erro ao buscar');
      }
    };

    fetchLocationName();
  }, [coords]);

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-buzzara-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/">
          <img
            src={LogoImg}
            alt="Buzzara Logo"
            className="h-8 md:h-10 object-contain"
          />
        </a>

        <div className="flex flex-1 max-w-xl w-full gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Buscar por cidade, bairro, estado..."
              className="w-full pl-10 bg-buzzara-neutral-light border-buzzara-secondary text-black"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-buzzara-secondary h-4 w-4 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <div className="flex bg-buzzara-secondary rounded-md px-3 items-center cursor-pointer border border-gray-700">
            <MapPin className="h-4 w-4 text-buzzara-neutral mr-1" />
            <span className="text-sm text-buzzara-neutral">
              {geoLoading ? 'Detectando...' : locationName}
            </span>
          </div>
        </div>

        <div>
          <a
            href="https://painel.buzzara.com.br/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-buzzara-secondary text-buzzara-neutral hover:bg-buzzara-secondary hover:text-white bg-buzzara-secondary"
            >
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
