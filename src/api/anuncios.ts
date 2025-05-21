import api from "./api";
import { AnuncioPublico } from "@/types/AnuncioPublico";

export async function listarAnunciosPublicos() {
  const res = await api.get<AnuncioPublico[]>("/publico/anuncios");
  return res.data;
}
