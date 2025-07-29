export interface AnuncioResponse {
  usuarioID: number;
  servicoID: number;
  nome: string;
  genero: string | null;
  saidas: string;
  descricao: string;
  lugarEncontro: string;
  servicoPrestado: string;
  servicoEspecial: string;
  disponibilidade: string | null;
  idade: number;
  peso: number;
  altura: number;
  dataCriacao: string; // ISO date string
  fotoPerfilUrl: string | null;
  nomeAcompanhante: string | null;
  localizacao: Localizacao;
  fotos: FotoAnuncio[];
  videos: VideoAnuncio[];
  sobreUsuario: SobreUsuario;
  caches: Cache[];
}

export interface Localizacao {
  endereco: string;
  cidade: string;
  estado: string;
  bairro: string;
  latitude: number | null;
  longitude: number | null;
}

export interface FotoAnuncio {
  fotoAnuncioID: number;
  url: string;
  dataUpload: string; // ISO date string
}

export interface VideoAnuncio {
  // Caso os vídeos tenham a mesma estrutura de ID, URL e data, adicione aqui:
  videoAnuncioID?: number;
  url?: string;
  dataUpload?: string;
}

export interface SobreUsuario {
  atendimento: string[];
  etnia: string;
  relacionamento: string;
  cabelo: string;
  estatura: string;
  corpo: string;
  seios: string;
  pubis: string;
}

export interface Cache {
  formaPagamento: string;
  descricao: string;
  valor: number;
}
