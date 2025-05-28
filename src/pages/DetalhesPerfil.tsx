// src/pages/ProfileDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  Phone,
  Star,
  CheckCircle,
  ShieldOff,
  Grid,
  Camera,
  Video,
  Zap,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { useAds } from "@/hooks/useAds";

function getRandomViews(min = 100, max = 5000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ProfileDetails: React.FC = () => {
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
        Anúncio não encontrado
      </div>
    );
  }

  const nota = (anuncio as any).nota ?? 3.3;
  const pct = Math.min(Math.max((nota / 5) * 100, 0), 100);

  const loc = anuncio.localizacao;
  const locationLabel = loc
    ? [loc.endereco, loc.bairro, loc.cidade, loc.estado].filter(Boolean).join(", ")
    : "Sem localização";

  const photos = anuncio.fotos.map((f) => ({ url: f.url, isVideo: false }));
  const videos = anuncio.videos.map((v) => ({ url: v.url, isVideo: true }));
  const allMedia = [...videos, ...photos];
  const featured = allMedia[0];
  const thumbs = allMedia.slice(1, 17);
  const remaining = allMedia.length - 1 - thumbs.length;

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background text-white">
      <Header />

      <div className="h-56 bg-gray-700">
        <img
          src={anuncio.fotoCapaUrl}
          alt="Capa"
          className="object-cover w-full h-full"
        />
      </div>

      <main className="container mx-auto px-4 md:px-8 mt-8 space-y-8">
        <div className="relative bg-gray-200 text-gray-800 rounded-lg p-6 flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/3 relative pt-16">
            <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <img
                src={anuncio.fotoPerfilUrl}
                alt="Perfil"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2 text-gray-600 text-sm">
                <span className="w-2 h-2 bg-gray-500 rounded-full inline-block" />
                <span>Offline há {views} minutos</span>
              </span>
              <span className="text-red-500 text-sm">Fora de expediente</span>
            </div>
            <h2 className="text-2xl font-bold uppercase mt-2 text-gray-900">
              {anuncio.nomeAcompanhante}
            </h2>
            <p className="uppercase text-gray-600">
              {anuncio.nome ?? anuncio.categoria}
            </p>
            <div className="mt-4 space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Possui Local</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{locationLabel}</span>
              </div>
            </div>
          </aside>

          <section className="md:w-2/3 border-l border-gray-300 pl-8 space-y-6">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Acompanhante Verificado</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <ShieldOff className="w-5 h-5" />
                <span>Não possui denúncias</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-3 bg-gray-400 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-bold text-gray-900">{nota.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(nota)
                      ? "w-5 h-5 text-black"
                      : "w-5 h-5 text-gray-400"
                  }
                />
              ))}
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-black/75 hover:bg-black rounded-full text-white">
                <Phone className="w-4 h-4" />
                <span>Ver Telefone</span>
              </button>
            </div>
          </section>
        </div>

        <div className="rounded-lg bg-gray-200 text-gray-800 p-6">
          <h3 className="text-2xl font-semibold mb-4">Descrição</h3>
          <div className="text-gray-700 whitespace-pre-line">
            {anuncio.descricao}
          </div>
        </div>

        <div className="rounded-lg bg-gray-200 text-gray-800 p-6">
          <div className="flex gap-6">
            <div className="w-1/4">
              <div className="relative pb-[150%] rounded-lg overflow-hidden">
                {featured.isVideo ? (
                  <video
                    controls
                    src={featured.url}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={featured.url}
                    alt="Destaque"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="mt-2 text-xs text-gray-600">
                Verificado{" "}
                {new Date(anuncio.dataCriacao).toLocaleDateString("pt-BR", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="w-1/5 flex flex-col justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Grid className="w-6 h-6 text-gray-700" />
                <span className="font-semibold">{allMedia.length} TODOS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Camera className="w-6 h-6 text-gray-700" />
                <span className="font-semibold">
                  {anuncio.fotos.length} FOTOS
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="w-6 h-6 text-gray-700" />
                <span className="font-semibold">
                  {anuncio.videos.length} VÍDEOS
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-gray-700" />
                <span className="font-semibold">33 EXCLUSIVOS</span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-2">
              {thumbs.map((m, i) => (
                <div
                  key={i}
                  className="w-full aspect-square rounded-lg overflow-hidden relative"
                >
                  {m.isVideo ? (
                    <video
                      src={m.url}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={m.url}
                      alt={`Thumb ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
              {remaining > 0 && (
                <div className="w-full aspect-square rounded-lg bg-gray-300 flex items-center justify-center font-semibold text-gray-700 text-xl">
                  +{remaining}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-200 text-gray-800 p-6">
          <h3 className="text-2xl font-semibold mb-4">Anúncios Relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ads
              .filter((a) => a.servicoID !== anuncio.servicoID)
              .slice(0, 3)
              .map((a) => (
                <Link
                  key={a.servicoID}
                  to={`/profile/${a.servicoID}`}
                  className="flex items-center bg-white rounded-lg p-4 text-gray-800"
                >
                  <img
                    src={a.fotoPerfilUrl}
                    alt={a.nomeAcompanhante}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      {a.nomeAcompanhante}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {a.nome ?? a.categoria}
                    </p>
                    <div className="flex items-center space-x-1 text-gray-700">
                      <DollarSign className="w-5 h-5" />
                      <span>R${a.preco.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            <AlertTriangle className="w-5 h-5" />
            <span>Denunciar Anúncio</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileDetails;
