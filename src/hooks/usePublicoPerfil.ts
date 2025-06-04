// src/hooks/usePerfilPublico.ts
import { useState, useEffect, useRef } from "react";
import api from "@/api/api";
import type { PerfilPublico } from "@/types/PerfilPublico";

const POLLING_INTERVAL_MS = 30_000; // 30 segundos

export function usePerfilPublico(usuarioId?: number) {
  const [perfil, setPerfil] = useState<PerfilPublico | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  // Armazenamos a referência ao timer para limpar quando mudar de usuário ou desmontar
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Função que realmente faz a chamada à API e atualiza estado
    const fetchPerfil = async () => {
      if (!usuarioId) {
        setPerfil(null);
        setErro(null);
        setLoading(false);
        return;
      }

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

    // Chama imediatamente
    fetchPerfil();

    // Em seguida, agenda chamadas periódicas para atualizar perfil.estaOnline
    if (usuarioId) {
      timerRef.current = window.setInterval(fetchPerfil, POLLING_INTERVAL_MS);
    }

    // Limpeza: quando o hook desmontar ou quando usuarioId mudar, limpa o intervalo
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [usuarioId]);

  return { perfil, loading, erro };
}
