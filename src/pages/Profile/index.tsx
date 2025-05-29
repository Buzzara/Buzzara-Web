// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Eye } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useAds } from "@/hooks/useAds";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

function getRandomViews(min = 100, max = 5000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { ads, loading } = useAds();
  const [views, setViews] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  useEffect(() => {
    setViews(getRandomViews());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const anuncio = ads.find((a) => a.servicoID === Number(id));
  if (loading || !anuncio) return null;

  const allMidia = [...anuncio.fotos, ...anuncio.videos];

  const onThumbClick = (index: number) => {
    setSelectedIndex(index);
    if (emblaApi) emblaApi.scrollTo(index);
  };

  const loc = anuncio.localizacao;
  const locationLabel = loc
    ? [loc.endereco, loc.bairro, loc.cidade, loc.estado].filter(Boolean).join(", ")
    : "Sem localização";

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background text-white">
      <Header onSearch={() => {}} />

      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-white">{anuncio.categoria}</Link>
            <span className="mx-2">/</span>
            <span>{anuncio.nomeAcompanhante}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                  {allMidia.map((m, i) => (
                    <div key={i} className="min-w-full">
                      {m.url.includes(".mp4") ? (
                        <video
                          src={m.url}
                          controls
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          src={m.url}
                          className="w-full aspect-square object-cover rounded-lg"
                          alt={`Mídia ${i}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
              >
                &#8249;
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
              >
                &#8250;
              </button>

              <div className="grid grid-cols-5 gap-2 mt-4">
                {allMidia.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => onThumbClick(i)}
                    className={`cursor-pointer opacity-70 hover:opacity-100 transition-opacity ${i === selectedIndex ? "outline outline-2 outline-buzzara-secondary" : ""}`}
                  >
                    {m.url.includes(".mp4") ? (
                      <video
                        src={m.url}
                        className="w-full aspect-square object-cover rounded"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={m.url}
                        className="w-full aspect-square object-cover rounded"
                        alt={`Thumb ${i}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{anuncio.nomeAcompanhante}</h1>

              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span>{locationLabel}</span>
              </div>

              <div className="flex items-center mb-6">
                <Eye className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">{views.toLocaleString()} visualizações</span>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-buzzara-secondary">R${anuncio.preco.toFixed(2)}</span>
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Publicado em {new Date(anuncio.dataCriacao).toLocaleDateString()}</span>
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
                  <span className="text-white block mt-1">Disponibilidade</span>
                  <p className="font-semibold">{anuncio.disponibilidade}</p>
                </div>
              </div>

              {anuncio.fotoPerfilUrl && (
                <div className="mb-6">
                  <Link to={`/detalhes/${anuncio.servicoID}`}>
                    <h3 className="font-semibold text-lg mb-2">Ver Perfil</h3>
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