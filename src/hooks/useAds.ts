// src/hooks/useAds.ts
import { useState, useEffect } from "react";
import api from "@/api/api";
import { AnuncioPublico } from "@/types/AnuncioPublico";

export function useAds(filtroLocalizacao?: string) {
  const [ads, setAds] = useState<AnuncioPublico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);     // ativa o carregamento
      setAds([]);           // limpa os anúncios antigos

      try {
        const { data } = await api.get<AnuncioPublico[]>("/publico/anuncios");

        const termo = filtroLocalizacao?.trim().toLowerCase();

        if (termo) {
          const filtrados = data.filter((anuncio) => {
            const loc = anuncio.localizacao;

            if (!loc) return false;

            return (
              loc.endereco?.toLowerCase().includes(termo) ||
              loc.cidade?.toLowerCase().includes(termo) ||
              loc.estado?.toLowerCase().includes(termo) ||
              loc.bairro?.toLowerCase().includes(termo)
            );
          });

          setAds(filtrados);
        } else {
          setAds(data);
        }
      } catch (err) {
        console.error("[useAds] Erro ao buscar anúncios:", err);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [filtroLocalizacao]);

  return { ads, loading };
}
