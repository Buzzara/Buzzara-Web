import { Localizacao } from "./Servico";
import { SobreUsuario } from "./Servico";
import { Cache } from "./Servico";
import { PerfilAcompanhante } from "./Servico";

export interface LocalizacaoDTO {
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  bairro: string | null;
  latitude: number | null;
  longitude: number | null;
}

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

export interface AnuncioPublico {
  servicoID: number;
  usuarioID: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  lugarEncontro: string;
  disponibilidade: string;
  idade: number;
  peso: number;
  estaOnline: boolean;
  altura: number;
  dataCriacao: string;
  fotoPerfilUrl: string;
  fotoCapaUrl: string;
  nomeAcompanhante: string;
  localizacao: Localizacao; // ❗️Use Localizacao aqui, não LocalizacaoDTO
  fotos: FotoAnuncioDTO[];
  videos: VideoAnuncioDTO[];

  // Campos adicionais para conversão
  genero?: string;
  saidas?: string;
  servicoPrestado?: string;
  servicoEspecial?: string;
  perfilAcompanhanteID?: number;
  perfilAcompanhante?: PerfilAcompanhante;
  sobreUsuario?: SobreUsuario;
  caches?: Cache[];
}
