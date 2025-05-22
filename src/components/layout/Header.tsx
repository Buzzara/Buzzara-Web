import React, { useState } from 'react';
import { Search, MapPin, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import your logo asset however you prefer:
import LogoImg from '@/assets/images/logo.png';

const Header = () => {
  const [location, setLocation] = useState('São Paulo');

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-buzzara-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo linking to home */}
        <div className="flex items-center">
          <a href="/">
            <img
              src={LogoImg}
              alt="Buzzara Logo"
              className="h-8 md:h-10 object-contain"
            />
          </a>
        </div>

        <div className="flex flex-1 max-w-xl w-full gap-2">
          <div className="relative flex-1">
            <Input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full pl-10 bg-buzzara-neutral-light border-buzzara-secondary text-black"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-buzzara-secondary h-4 w-4" />
          </div>
          <div
            className="flex bg-buzzara-secondary rounded-md px-3 items-center cursor-pointer border border-gray-700"
            onClick={() => { /* talvez abra um modal de localização */ }}
          >
            <MapPin className="h-4 w-4 text-buzzara-neutral mr-1" />
            <span className="text-sm text-buzzara-neutral">{location}</span>
          </div>
        </div>

        {/* Login button */}
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
