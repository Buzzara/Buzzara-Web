// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useAds } from "@/hooks/useAds";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

function getRandomViews(min = 100, max = 5000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { ads, loading } = useAds();
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    setViews(getRandomViews());
  }, []);

  if (loading) return null;

  const anuncio = ads.find((a) => a.servicoID === Number(id));
  if (!anuncio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-buzzara-background text-white">
        Anúncio não encontrado.
      </div>
    );
  }

  const loc = anuncio.localizacao;
  const locationLabel = loc
    ? [loc.endereco, loc.bairro, loc.cidade, loc.estado]
        .filter(Boolean)
        .join(", ")
    : "Sem localização";

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background text-white">
      <Header />

      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-white">{anuncio.categoria}</Link>
            <span className="mx-2">/</span>
            <span>{anuncio.nomeAcompanhante}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Galeria de mídia */}
            <div>
              <Carousel className="w-full mb-4">
                <CarouselContent>
                  {anuncio.fotos.map((f) => (
                    <CarouselItem key={f.fotoAnuncioID}>
                      <img
                        src={f.url}
                        alt={`Foto ${f.fotoAnuncioID}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                  {anuncio.videos.map((v) => (
                    <CarouselItem key={v.videoAnuncioID}>
                      <video
                        src={v.url}
                        controls
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none" />
              </Carousel>
              <div className="grid grid-cols-5 gap-2">
                {anuncio.fotos.map((f) => (
                  <img
                    key={f.fotoAnuncioID}
                    src={f.url}
                    alt={`Thumb ${f.fotoAnuncioID}`}
                    className="w-full aspect-square object-cover rounded cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Detalhes */}
            <div>
              <h1 className="text-3xl font-bold mb-4">
                {anuncio.nomeAcompanhante}
              </h1>

              {/* localização */}
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span>{locationLabel}</span>
              </div>

              {/* visualizações aleatórias */}
              <div className="flex items-center mb-6">
                <Eye className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">
                  {views.toLocaleString()} visualizações
                </span>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-buzzara-secondary">
                  R${anuncio.preco.toFixed(2)}
                </span>
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    Publicado em{" "}
                    {new Date(anuncio.dataCriacao).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-buzzara-neutral-light p-3 rounded">
                  <span className="text-white">Idade</span>
                  <p className="font-semibold">{anuncio.idade} anos</p>
                </div>
                <div className="bg-buzzara-neutral-light p-3 rounded">
                  <span className="text-white">Altura</span>
                  <p className="font-semibold">{anuncio.altura} cm</p>
                </div>
                <div className="bg-buzzara-neutral-light p-3 rounded">
                  <span className="text-white">Peso</span>
                  <p className="font-semibold">{anuncio.peso} kg</p>
                </div>
                <div className="bg-buzzara-neutral-light p-3 rounded col-span-2">
                  <span className="text-white">Encontro</span>
                  <p className="font-semibold">{anuncio.lugarEncontro}</p>
                  <span className="text-white block mt-1">
                    Disponibilidade
                  </span>
                  <p className="font-semibold">{anuncio.disponibilidade}</p>
                </div>
              </div>

              {/* Foto de Perfil clicável */}
              {anuncio.fotoPerfilUrl && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Foto de Perfil
                  </h3>
                  <Link to={`/detalhes/${anuncio.servicoID}`}>
                    <img
                      src={anuncio.fotoPerfilUrl}
                      alt="Perfil"
                      className="w-32 h-32 object-cover rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
            <div className="bg-buzzara-neutral-light p-6 rounded-lg text-white">
              <p>{anuncio.descricao}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
