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
  DollarSign,
  AlertTriangle,
  X,
} from "lucide-react";
import { useAds } from "@/hooks/useAds";
import { usePerfilPublico } from "@/hooks/usePublicoPerfil";
import type { AnuncioPublico } from "@/types/AnuncioPublico";
import type { PerfilPublico } from "@/types/PerfilPublico";

// Função auxiliar para gerar "Offline há X minutos"
function getRandomViews(min = 100, max = 5000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função auxiliar para gerar nota aleatória entre 0.0 e 5.0 (com uma casa decimal)
function getRandomNota(): number {
  return parseFloat((Math.random() * 5).toFixed(1));
}

const ProfileDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ads, loading } = useAds();
  const [views, setViews] = useState<number>(0);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [showPhone, setShowPhone] = useState<boolean>(false);

  // Estado para nota do anúncio e para a porcentagem que define a largura da barra
  const [notaAnuncio, setNotaAnuncio] = useState<number>(0);
  const [pctAnuncio, setPctAnuncio] = useState<number>(0);

  // 1) Ao montar a página, define um valor aleatório para "views" e
  //    inicializa nota/proporção apenas uma vez (antes de sabermos qual é o 'anuncio')
  useEffect(() => {
    setViews(getRandomViews());
  }, []);

  // 2) Assim que o 'anuncio' for carregado (mudança em ads ou em id), 
  //    gere um valor randômico para a nota daquele perfil específico.
  useEffect(() => {
    // Encontrar o anúncio correspondente ao ID
    const anuncioCorrente = ads.find((a) => a.servicoID === Number(id)) as
      | AnuncioPublico
      | undefined;

    // Se existir anúncio, gere uma nota randômica só para ele
    if (anuncioCorrente) {
      const novaNota = getRandomNota();
      setNotaAnuncio(novaNota);
      setPctAnuncio(Math.min(Math.max((novaNota / 5) * 100, 0), 100));
    }
  }, [ads, id]);

  // 3) Buscar anúncio pelo servicoID (igual a antes)
  const anuncio = ads.find((a) => a.servicoID === Number(id)) as
    | AnuncioPublico
    | undefined;

  // 4) Extrair usuarioID para o hook de perfil
  const usuarioId = anuncio?.usuarioID;

  // 5) Hook que faz polling de perfil.estaOnline
  const {
    perfil,
    loading: loadingPerfil,
    erro: erroPerfil,
  } = usePerfilPublico(usuarioId);

  // Enquanto os anúncios carregam, não renderiza nada
  if (loading) return null;

  // Se não encontrou anúncio, mostra mensagem de erro
  if (!anuncio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-buzzara-background text-white">
        Anúncio não encontrado
      </div>
    );
  }

  if (erroPerfil) {
    console.warn("Erro ao buscar perfil público:", erroPerfil);
  }

  // ========== Dados do anúncio (fotos, vídeos etc.) ==========
  const photos = anuncio.fotos.map((f) => ({ url: f.url, isVideo: false }));
  const videos = anuncio.videos.map((v) => ({ url: v.url, isVideo: true }));
  const allMedia = [...videos, ...photos];
  const featured = allMedia[0];
  const thumbs = allMedia.slice(1, 17);
  const remaining = allMedia.length - 1 - thumbs.length;

  // ========== Dados do perfil ==========
  const profileCover = perfil?.fotoCapaUrl;
  const profileLocation: string | undefined = perfil?.localizacao ?? undefined;
  const locationLabel = profileLocation ? profileLocation : "Sem localização";
  const profilePhone = perfil?.telefone ?? "";

  // Lógica “fora de expediente”
  const agora = new Date();
  const horaAtual = agora.getHours(); // 0–23
  const INICIO_EXPEDIENTE = 8;  // 08:00
  const FIM_EXPEDIENTE = 20;    // 20:00

  // Estamos “fora do expediente” se:
  // - perfil existe e estaOffline (já carregou e perfil.estaOnline === false)
  // - e a hora atual for antes de 08 ou igual/maior que 20
  const estaOffline = !loadingPerfil && perfil && !perfil.estaOnline;
  const estaForaDeExpediente =
    estaOffline && (horaAtual < INICIO_EXPEDIENTE || horaAtual >= FIM_EXPEDIENTE);

  // Funções auxiliares
  const openModal = (url: string, video: boolean) => {
    setModalUrl(url);
    setIsVideo(video);
  };
  const closeModal = () => {
    setModalUrl(null);
    setIsVideo(false);
  };
  const toggleShowPhone = () => {
    setShowPhone((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-buzzara-background text-white">
      <Header />

      {/* Capa de perfil (prioriza foto do perfil, fallback para foto do anúncio) */}
      <div className="h-56 bg-gray-700">
        <img
          src={profileCover ?? anuncio.fotoCapaUrl}
          alt="Capa do Perfil"
          className="object-cover w-full h-full"
        />
      </div>

      <main className="container mx-auto px-4 md:px-8 mt-8 space-y-8">
        {/* ====== Cabeçalho do anúncio + dados do perfil ====== */}
        <div className="relative bg-gray-200 text-gray-800 rounded-lg p-6 flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/3 relative pt-16">
            <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <img
                src={anuncio.fotoPerfilUrl}
                alt="Perfil do Anunciante"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Status online/offline do perfil */}
            <div className="space-y-1">
              {!loadingPerfil && perfil ? (
                perfil.estaOnline ? (
                  <span className="flex items-center space-x-2 text-green-600 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                    <span>Online agora</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2 text-gray-600 text-sm">
                    <span className="w-2 h-2 bg-gray-500 rounded-full inline-block" />
                    <span>Offline há {views} minutos</span>
                  </span>
                )
              ) : (
                <span className="flex items-center space-x-2 text-gray-500 text-sm">
                  <span className="w-2 h-2 bg-gray-300 rounded-full inline-block animate-pulse" />
                  <span>Carregando status…</span>
                </span>
              )}

              {/* Exibe “Fora de expediente” apenas se estiver offline e fora do horário */}
              {estaForaDeExpediente && (
                <span className="text-red-500 text-sm">Fora de expediente</span>
              )}
            </div>

            <h2 className="text-2xl font-bold uppercase mt-2 text-gray-900">
              {anuncio.nomeAcompanhante}
            </h2>

            {/* Localização vinda do perfil */}
            <div className="mt-4 space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{locationLabel}</span>
              </div>
            </div>
          </aside>

          <section className="md:w-2/3 border-l border-gray-300 pl-8 space-y-6">
            {/* ====== Bandeirinhas de “verificado” e “sem denúncias” ====== */}
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

            {/* ====== Barra de nota (preenchida randômica) ====== */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-3 bg-gray-400 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${pctAnuncio}%` }}
                />
              </div>
              <span className="font-bold text-gray-900">
                {notaAnuncio.toFixed(1)}
              </span>
            </div>

            {/* ====== Estrelas baseadas na nota ====== */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(notaAnuncio)
                      ? "w-5 h-5 text-black"
                      : "w-5 h-5 text-gray-400"
                  }
                />
              ))}
            </div>

            {/* Botão “Ver Telefone” exibe telefone do perfil */}
            <div className="flex space-x-4">
              <button
                onClick={toggleShowPhone}
                className="flex items-center space-x-2 px-4 py-2 bg-black/75 hover:bg-black rounded-full text-white"
              >
                <Phone className="w-4 h-4" />
                <span>{showPhone ? profilePhone : "Ver Telefone"}</span>
              </button>
            </div>
          </section>
        </div>

        {/* ====== Seção de Descrição (Perfil + Anúncio) ====== */}
        <div className="rounded-lg bg-gray-200 text-gray-800 p-6">
          <h3 className="text-2xl font-semibold mb-4">Descrição</h3>
          {!loadingPerfil && perfil?.descricao && (
            <div className="mb-4">
              <div className="text-gray-700 whitespace-pre-line">
                {perfil.descricao}
              </div>
            </div>
          )}
        </div>

        {/* ====== Galeria (Fotos + Vídeos) ====== */}
        <div className="rounded-lg bg-gray-200 text-gray-800 p-6">
          <div className="flex gap-6">
            <div className="w-1/4">
              <div className="relative pb-[150%] rounded-lg overflow-hidden">
                {featured?.isVideo ? (
                  <video
                    src={featured.url}
                    className="absolute inset-0 w-full h-full	object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <img
                    src={featured?.url}
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

            <div className="w-1/5 flex flex-col items-center justify-center text-sm mt-4 space-y-8">
              <div className="flex flex-col items-center">
                <Grid className="w-10 h-10 text-gray-700 mb-1" />
                <span className="font-bold text-sm text-gray-900">
                  {allMedia.length} TODOS
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Camera className="w-10 h-10 text-gray-700 mb-1" />
                <span className="font-bold text-sm text-gray-900">
                  {anuncio.fotos.length} FOTOS
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Video className="w-10 h-10 text-gray-700 mb-1" />
                <span className="font-bold text-sm text-gray-900">
                  {anuncio.videos.length} VÍDEOS
                </span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-2">
              {thumbs.map((m, i) => (
                <div
                  key={i}
                  onClick={() => openModal(m.url, m.isVideo)}
                  className="w-full aspect-square rounded-lg overflow-hidden relative cursor-pointer"
                >
                  {m.isVideo ? (
                    <video
                      src={m.url}
                      className="absolute inset-0 w-full h-full	object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
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

        {modalUrl && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={closeModal}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-3xl w-full p-4">
              {isVideo ? (
                <video
                  src={modalUrl}
                  controls
                  className="w-full rounded-lg"
                  autoPlay
                />
              ) : (
                <img
                  src={modalUrl}
                  alt="Visualização"
                  className="w-full rounded-lg"
                />
              )}
            </div>
          </div>
        )}

        {/* ====== Anúncios Relacionados ====== */}
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
  
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* ====== Botão “Denunciar Anúncio” ====== */}
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
