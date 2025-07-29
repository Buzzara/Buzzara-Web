// src/hooks/useAds.ts
import { useState, useEffect, useCallback } from "react";
import api from "@/api/api";
import { AnuncioPublico } from "@/types/AnuncioPublico";

export function useAds(filtroLocalizacao?: string) {
  const [ads, setAds] = useState<AnuncioPublico[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await api.get<AnuncioPublico[]>("/publico/anuncios");

      // 🟨 Ordena por data de criação (mais recente primeiro)
      const ordenados = [...data].sort((a, b) =>
        new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
      );

      const termo = filtroLocalizacao?.trim().toLowerCase();

      if (termo) {
        const filtrados = ordenados.filter((anuncio) => {
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
        setAds(ordenados);
      }
    } catch (err) {
      console.error("[useAds] Erro ao buscar anúncios:", err);
      setAds([]);
    } finally {
      setLoading(false);
    }
  }, [filtroLocalizacao]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  return { ads, loading, refetch: fetchAds };
}
