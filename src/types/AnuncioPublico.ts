import { Cache, Localizacao, SobreUsuario } from "./Servico";

export interface FotoAnuncioDTO {
  fotoAnuncioID: number;
  url: string;
  dataUpload: string;
}

export interface VideoAnuncioDTO {
  videoAnuncioID: number;
  url: string;
  dataUpload: string;
}

export interface HorarioAtendimentoDTO {
  diaSemana: string;
  atende: boolean;
  horarioInicio?: string | null;
  horarioFim?: string | null;
  vinteQuatroHoras: boolean;
}

export interface AnuncioPublico {
  servicoID: number;
  usuarioID: number;
  nome: string;
  genero: string;
  descricao: string;
  lugarEncontro: string;
  servicoPrestado: string;
  servicoEspecial: string;
  disponibilidade?: string | null;
  idade?: number | null;
  peso?: number | null;
  altura?: number | null;
  dataCriacao: string;
  fotoPerfilUrl: string | null;
  nomeAcompanhante: string;
  localizacao: Localizacao | null;
  fotos: FotoAnuncioDTO[];
  videos: VideoAnuncioDTO[];
  saidas?: string;
  sobreUsuario?: SobreUsuario;
  caches?: Cache[];
  horariosAtendimento?: HorarioAtendimentoDTO[];
}
