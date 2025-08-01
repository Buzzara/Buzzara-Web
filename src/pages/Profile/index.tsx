import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Clock,
  Eye,
  CheckCircle,
  User,
  XCircle,
  DollarSign,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useAnuncioPorID } from "@/hooks/useAnuncioPorServicoID";
import { usePerfil } from "@/hooks/useBuscaPerfilPorID";

function getRandomViews(min = 100, max = 5000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  const servicoID = Number(id);

  const { anuncio, loading } = useAnuncioPorID(servicoID);
  const perfilID = anuncio?.usuarioID ?? null;
  const { perfil } = usePerfil(perfilID);

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

  if (loading || !anuncio) return null;
  console.log("🖼️ fotoPerfilUrl:", anuncio.fotoPerfilUrl);
  console.log("👤 nomeAcompanhante:", anuncio.nomeAcompanhante);
  console.log("📦 Dados do anúncio completo:", anuncio);

  const sobreTags = anuncio.sobreUsuario
    ? [
        ...(anuncio.sobreUsuario.atendimento ?? []),
        anuncio.sobreUsuario.etnia,
        anuncio.sobreUsuario.relacionamento,
        anuncio.sobreUsuario.cabelo,
        anuncio.sobreUsuario.estatura,
        anuncio.sobreUsuario.corpo,
        anuncio.sobreUsuario.seios,
        anuncio.sobreUsuario.pubis,
      ].filter(Boolean)
    : [];

  const servicosNormais =
    anuncio.servicoPrestado
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const servicosEspeciais =
    anuncio.servicoEspecial
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const allMidia = [...anuncio.fotos, ...anuncio.videos];
  const loc = anuncio.localizacao;
  const estado = loc?.estado ?? "";
  const cidade = loc?.cidade ?? "";
  const idade = anuncio.idade;
  const hasVerifiedPhotos = anuncio.fotos.length > 0;

  const onThumbClick = (index: number) => {
    setSelectedIndex(index);
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background text-white">
      <Header onSearch={() => {}} />
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center text-sm text-white mb-6">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-white">
              Anúncios
            </Link>
            <span className="mx-2">/</span>
            <span>{anuncio.nome}</span>
          </div>

          <div className="bg-buzzara-neutral-light text-white rounded-lg p-6 mb-8 shadow">
            <div className="flex items-center space-x-4 mb-4">
              {anuncio.fotoPerfilUrl && (
                <Link
                  to={`/detalhes/${anuncio.servicoID}`}
                  className="w-12 h-12 rounded-full overflow-hidden"
                >
                  <img
                    src={anuncio.fotoPerfilUrl}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                </Link>
              )}
              <h2 className="text-2xl font-bold">{anuncio.nome}</h2>
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
              {idade && (
                <span className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm">
                  {idade} anos
                </span>
              )}
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
                <Eye className="mr-1" />
                <span>{views.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-white space-y-2">
              <p>{anuncio.descricao}</p>
              {anuncio.saidas && <p>{anuncio.saidas}</p>}
              {anuncio.lugarEncontro && (
                <p>
                  <strong>Lugar de Encontro:</strong> {anuncio.lugarEncontro}
                </p>
              )}
            </div>
          </div>

          {/* ======== FORMAS DE PAGAMENTO & HORÁRIO ======== */}
          <section className="bg-buzzara-neutral-light text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold text-lg">Formas de Pagamento</h3>
                </div>

                {anuncio.caches?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {anuncio.caches.map((c, idx) => (
                      <React.Fragment key={idx}>
                        <span>{c.descricao}</span>
                        <span>R$ {c.valor.toFixed(2).replace(".", ",")}</span>
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Nenhuma forma de pagamento informada.
                  </p>
                )}

                <div className="flex items-center flex-wrap gap-4 mt-4 text-sm">
                  {[
                    // Passo 1: extrair todas as formas dos caches
                    ...new Set(
                      anuncio.caches
                        ?.flatMap(
                          (c) =>
                            c.formaPagamento
                              ?.split(",") // separa por vírgula
                              .map((fp) => fp.trim()) // remove espaços extras
                        )
                        .filter(Boolean) // remove vazios
                    ),
                  ].map((forma, idx) => (
                    <span key={idx} className="flex items-center">
                      <CheckCircle className="text-green-500 h-4 w-4 mr-1" />
                      {forma}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:pl-6 border-t md:border-t-0 md:border-l border-gray-300 pt-6 md:pt-0">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold text-lg">Horário Atendimento</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {anuncio.horariosAtendimento?.map((h, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{h.diaSemana}</span>
                      {h.atende ? (
                        <span>
                          {h.vinteQuatroHoras
                            ? "24 Horas"
                            : `${h.horarioInicio} - ${h.horarioFim}`}
                        </span>
                      ) : (
                        <span className="line-through text-gray-500">
                          Não Atende
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <div>
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

              <section className="bg-buzzara-neutral-light text-white rounded-lg p-6 mb-6 shadow">
                <h2 className="text-2xl font-semibold mb-4">Meus serviços</h2>
                <div className="flex flex-wrap gap-2">
                  {servicosNormais.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-buzzara-secondary text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-buzzara-neutral-light text-white rounded-lg p-6 shadow">
                <h2 className="text-2xl font-semibold mb-4">
                  Serviços Especiais
                </h2>
                <div className="flex flex-wrap gap-2">
                  {servicosEspeciais.map((tag, idx) => (
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
