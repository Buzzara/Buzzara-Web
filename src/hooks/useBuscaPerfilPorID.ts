// src/hooks/useBuscaPerfilPorID.ts
import { useState, useEffect } from "react";
import api from "@/api/api";
import type { PerfilAcompanhante } from "@/types/usePerfilAcompanhante";

export function usePerfil(id: number | null) {
  const [perfil, setPerfil] = useState<PerfilAcompanhante | null>(null);
  const [loadingPerfil, setLoadingPerfil] = useState<boolean>(true);
  const [errorPerfil, setErrorPerfil] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) {
      setLoadingPerfil(false);
      return;
    }

    async function fetchPerfil() {
      setLoadingPerfil(true);
      setErrorPerfil(null);
      try {
        const response = await api.get(`/perfis/${id}`);
        console.log("[usePerfil] resposta bruta da API:", response.data);
        setPerfil(response.data as PerfilAcompanhante);
      } catch (err: any) {
        console.error("[usePerfil] Erro ao buscar perfil:", err);
        if (err.response && err.response.data) {
          const data = err.response.data;
          if (typeof data.message === "string") {
            setErrorPerfil(data.message);
          } else if (data.title) {
            setErrorPerfil(data.title);
          } else {
            setErrorPerfil("Erro ao buscar perfil");
          }
        } else {
          setErrorPerfil(err.message || "Erro desconhecido");
        }
      } finally {
        setLoadingPerfil(false);
      }
    }

    fetchPerfil();
  }, [id]);

  return { perfil, loadingPerfil, errorPerfil };
}
