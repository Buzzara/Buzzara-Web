// src/hooks/usePerfilPublico.ts
import { useState, useEffect } from "react";
import api from "@/api/api";
import type { PerfilPublico } from "@/types/PerfilPublico";

export function usePerfilPublico(usuarioId?: number) {
  const [perfil, setPerfil] = useState<PerfilPublico | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioId) return;

    const fetchPerfil = async () => {
      setLoading(true);
      setErro(null);

      try {
        const { data } = await api.get<PerfilPublico>(`/publico/perfil/${usuarioId}`);
        setPerfil(data);
      } catch (err: any) {
        console.error("[usePerfilPublico] Erro ao buscar perfil:", err);
        setErro("Erro ao carregar perfil");
        setPerfil(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [usuarioId]);

  return { perfil, loading, erro };
}
