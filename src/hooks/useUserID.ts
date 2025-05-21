// src/hooks/useUserAds.ts
import { useState, useEffect } from "react";
import { userGetAnunciosPorUsuario } from "@/api/userGetAnunciosPorUsuario";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

export function useUserID(usuarioId: number) {
  const [ads, setAds] = useState<AnuncioPublico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    userGetAnunciosPorUsuario(usuarioId)
      .then(setAds)
      .catch((err) => {
        console.error("Erro ao carregar anúncios do usuário:", err);
        setError(err.message ?? "Erro desconhecido");
      })
      .finally(() => setLoading(false));
  }, [usuarioId]);

  return { ads, loading, error };
}
