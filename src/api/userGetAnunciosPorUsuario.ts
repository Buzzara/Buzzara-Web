// src/services/anuncio/userGetAnunciosPorUsuario.ts
import api from "../api/api";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

/**
 * Busca todos os anúncios públicos de um dado usuário.
 * GET /publico/anuncios/{usuarioId}
 */
export async function userGetAnunciosPorUsuario(
  usuarioId: number
): Promise<AnuncioPublico[]> {
  const { data } = await api.get<AnuncioPublico[]>(
    `/publico/anuncios/${usuarioId}`
  );
  return data;
}
