import { useEffect, useState } from "react";
import { userGetAnunciosPorUsuario } from "@/api/userGetAnunciosPorUsuario";
import type { AnuncioPorServicoResponse } from "@/types/AnuncioPorServicoID";

export function useAnuncioPorID(servicoID: number) {
  const [anuncio, setAnuncio] = useState<AnuncioPorServicoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userGetAnunciosPorUsuario(servicoID)
      .then(setAnuncio)
      .finally(() => setLoading(false));
  }, [servicoID]);

  return { anuncio, loading };
}
