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
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  lugarEncontro: string;
  disponibilidade: string;
  idade: number;
  peso: number;
  altura: number;
  dataCriacao: string;
  fotoPerfilUrl: string;
  fotoCapaUrl: string;
  nomeAcompanhante: string;
  localizacao: LocalizacaoDTO | null;
  fotos: FotoAnuncioDTO[]; // caso seu JSON retorne um array de fotos
  videos: VideoAnuncioDTO[]; // caso seu JSON retorne um array de vídeos
}
