// src/hooks/useAds.ts
import { useState, useEffect } from 'react';
import api from '@/api/api';
import { AnuncioPublico } from '@/types/AnuncioPublico';

export function useAds() {
  const [ads, setAds] = useState<AnuncioPublico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data } = await api.get<AnuncioPublico[]>('/publico/anuncios');
        setAds(data);
      } catch (err) {
        console.error('Erro ao buscar anúncios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return { ads, loading };
}
