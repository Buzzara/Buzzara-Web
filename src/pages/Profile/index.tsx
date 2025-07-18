// src/pages/ProfilePage.tsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  User,
  DollarSign,
  XCircle,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useAds } from "@/hooks/useAds";
import type { AnuncioPublico } from "@/types/AnuncioPublico";

/** Gera um número de visualizações aleatório */
function getRandomViews(min = 100, max = 5000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Formata data e hora em “dd/MM/yyyy HH:mm” */
function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("pt-BR");
  const time = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} ${time}`;
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

  // Mocks para "Sobre mim" e "Meus serviços", caso o API não forneça
  const sobreTags =
    anuncio.sobre && anuncio.sobre.length
      ? anuncio.sobre
      : [
          "22 anos",
          "Cartão de crédito",
          "Ligação",
          "PIX",
          "WhatsApp",
          "Atendimento a homens",
          "Atendimento a mulheres",
          "Morenas",
          "Altas",
          "Magras",
          "Seios naturais",
          "Pubis depilado",
        ];

  const servicosTags =
    anuncio.servicos && anuncio.servicos.length
      ? anuncio.servicos
      : [
          "Beijos na boca",
          "Ejaculação corpo",
          "Namoradinha",
          "Sexo oral sem camisinha",
        ];

  const allMidia = [...anuncio.fotos, ...anuncio.videos];
  const loc = anuncio.localizacao;
  const estado = loc?.estado ?? "";
  const cidade = loc?.cidade ?? "";
  const telefone = anuncio.telefone ?? "";
  const codigo = anuncio.codigo ?? String(anuncio.servicoID);
  const idade = anuncio.idade;
  const hasVerifiedPhotos = anuncio.fotosVerificadas ?? false;

  const onThumbClick = (index: number) => {
    setSelectedIndex(index);
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background text-white">
      <Header onSearch={() => {}} />

      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          {/* BREADCRUMB */}
          <div className="flex items-center text-sm text-white mb-6">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-white">
              {anuncio.categoria}
            </Link>
            <span className="mx-2">/</span>
            <span>{anuncio.nomeAcompanhante}</span>
          </div>

          {/* ======== BANNER DE INFORMAÇÕES ======== */}
          <div className="bg-buzzara-neutral-light text-white rounded-lg p-6 mb-8 shadow">
            {/* Nome e Avatar lado a lado */}
            <div className="flex items-center space-x-4 mb-4">
              {anuncio.fotoPerfilUrl && (
                <Link
                  to={`/profile/${anuncio.servicoID}`}
                  className="w-12 h-12 rounded-full overflow-hidden"
                >
                  <img
                    src={anuncio.fotoPerfilUrl}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                </Link>
              )}
              <h2 className="text-2xl font-bold">{anuncio.nomeAcompanhante}</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {estado && (
                <span className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm">
                  {estado}
                </span>
              )}
              {cidade && (
                <span className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm">
                  {cidade}
                </span>
              )}
              <span className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm">
                {idade} anos
              </span>
              {hasVerifiedPhotos && (
                <span className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" /> Fotos verificadas
                </span>
              )}
            </div>

            <div className="flex items-center text-white text-sm mb-4 space-x-6">
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>{formatDateTime(anuncio.dataCriacao)}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-1" />
                <span>{codigo}</span>
              </div>
              <div className="flex items-center">
                <Eye className="mr-1" />
                <span>{views.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-white">
              <p>{anuncio.descricao}</p>
            </div>
          </div>
          {/* ======== /BANNER DE INFORMAÇÕES ======== */}

          {/* ======== FORMAS DE PAGAMENTO & HORÁRIO ======== */}
          <section className="bg-buzzara-neutral-light text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold text-lg">Formas de Pagamento</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span>1 Hora</span>
                  <span>330</span>
                  <span>2 Horas</span>
                  <span>660</span>
                  <span>Diária</span>
                  <span>3300</span>
                  <span className="line-through text-gray-500">30 Minutos</span>
                  <span>Não Realiza</span>
                  <span>4 Horas</span>
                  <span>990</span>
                  <span>PerNoite</span>
                  <span>3300</span>
                  <span className="line-through text-gray-500">15 Minutos</span>
                  <span>Não Realiza</span>
                  <span className="line-through text-gray-500">
                    Diária Viagem
                  </span>
                  <span>Não Realiza</span>
                </div>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <span className="flex items-center">
                    <CheckCircle className="text-green-500 h-4 w-4 mr-1" /> Pix
                  </span>
                  <span className="flex items-center">
                    <XCircle className="text-red-500 h-4 w-4 mr-1" /> Cartão
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="text-green-500 h-4 w-4 mr-1" />{" "}
                    Dinheiro
                  </span>
                </div>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:pl-6 border-t md:border-t-0 md:border-l border-gray-300 pt-6 md:pt-0">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold text-lg">Horário Atendimento</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Segunda</span>
                    <span className="line-through text-gray-500">
                      Não Atende
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Terça</span>
                    <span className="line-through text-gray-500">
                      Não Atende
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quarta</span>
                    <span>12:00 - 03:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quinta</span>
                    <span>12:00 - 03:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sexta</span>
                    <span>24 Horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>24 Horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>24 Horas</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ======== /FORMAS DE PAGAMENTO & HORÁRIO ======== */}

          {/* CARROSSEL E "Sobre mim" / "Meus serviços" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CARROSSEL */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                  {allMidia.map((m, i) => (
                    <div key={i} className="min-w-full">
                      {m.url.endsWith(".mp4") ? (
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
                ‹
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
              >
                ›
              </button>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {allMidia.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => onThumbClick(i)}
                    className={`cursor-pointer opacity-70 hover:opacity-100 transition-opacity ${
                      i === selectedIndex
                        ? "outline outline-2 outline-buzzara-secondary"
                        : ""
                    }`}
                  >
                    {m.url.endsWith(".mp4") ? (
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

            {/* Sobre mim / Meus serviços */}
            <div>
              {/* Sobre mim */}
              <section className="bg-buzzara-neutral-light text-white rounded-lg p-6 mb-6 shadow">
                <h2 className="text-2xl font-semibold mb-4">Sobre mim</h2>
                <div className="flex flex-wrap gap-2">
                  {sobreTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* Meus serviços */}
              <section className=" bg-buzzara-neutral-light text-white rounded-lg p-6 shadow">
                <h2 className="text-2xl font-semibold mb-4">Meus serviços</h2>
                <div className="flex flex-wrap gap-2">
                  {servicosTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
