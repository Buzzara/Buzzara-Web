import api from "../api/api";
import type { AnuncioPorServicoResponse } from "@/types/AnuncioPorServicoID";

export async function userGetAnunciosPorUsuario(
  servicoID: number
): Promise<AnuncioPorServicoResponse> {
  const { data } = await api.get<AnuncioPorServicoResponse>(
    `/publico/anuncios/${servicoID}`
  );

  console.log("🔍 Dados retornados da API (userGetAnunciosPorUsuario):", data);

  return data;
}
