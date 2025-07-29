import { useEffect, useState } from "react";
import { listarAnunciosPublicos } from "@/api/anuncios";
import { AnuncioPublico } from "@/types/AnuncioPublico";

export default function Anuncio() {
  const [anuncios, setAnuncios] = useState<AnuncioPublico[]>([]);

  useEffect(() => {
    listarAnunciosPublicos()
      .then((data) => {
        const ordenados = [...data].sort((a, b) =>
          new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
        );
        setAnuncios(ordenados);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anúncios Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {anuncios.map((anuncio) => (
          <div key={anuncio.servicoID} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{anuncio.nome}</h2>
            <p className="text-gray-600">{anuncio.descricao}</p>
            <p className="text-green-700 font-bold">
              R$ {anuncio.preco.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {anuncio.localizacao?.cidade}, {anuncio.localizacao?.estado}
            </p>

            {anuncio.fotos.length > 0 && (
              <img
                src={anuncio.fotos[0].url}
                alt="Foto do anúncio"
                className="mt-2 w-full h-48 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
