export interface Usuario {
  usuarioID: number;
  nome: string;
  email: string;
  senhaHash: string;
  dataCadastro: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  isValid: boolean;
  telefone: string;
  cpf: string;
  genero: string;
  validationToken: string | null;
  dataNascimento: string;
  validationTokenExpiration: string | null;
  ativo: boolean;
  role: string;
  fotoPerfilUrl: string;
  fotoCapaUrl: string;
  estaOnline: boolean;
  ultimoAcesso: string;
  ultimoIP: string;
}

export interface PerfilAcompanhante {
  perfilAcompanhanteID: number;
  usuarioID: number;
  usuario: Usuario;
  descricao: string;
  localizacao: string;
  tarifa: number;
  dataAtualizacao: string;
  agendamentos: []; 
  fotos: [];       
  videos: [];      
  servicos: (Servico | null)[];
}

export interface Servico {
  servicoID: number;
  nome: string;
  saidas: string;
  descricao: string;
  lugarEncontro: string;
  servicoPrestado: string;
  servicoEspecial: string;
  disponibilidade: string | null;
  idade: number;
  peso: number;
  altura: number;
  dataCriacao: string;
  dataAtualizacao: string | null;
  ativo: boolean;
  perfilAcompanhanteID: number;
  perfilAcompanhante: PerfilAcompanhante;
  fotos: FotoAnuncio[];
  videos: []; 
  localizacao: Localizacao;
  sobreUsuario: SobreUsuario;
  caches: (Cache | null)[];
}

export interface FotoAnuncio {
  fotoAnuncioID: number;
  url: string;
  dataUpload: string;
  servicoID: number;
  servico: Servico | null;
}

export interface Localizacao {
  localizacaoID: number;
  endereco: string | null;
  cidade: string;
  estado: string;
  bairro: string | null;
  latitude: number;
  longitude: number;
  servicoID: number;
  servico: Servico | null;
}

export interface SobreUsuario {
  id: number;
  atendimento: string[];
  etnia: string;
  relacionamento: string;
  cabelo: string;
  estatura: string;
  corpo: string;
  seios: string;
  pubis: string;
  servicoId: number;
  servico: Servico | null;
}

export interface Cache {
  id?: number;
  formaPagamento: string;
  descricaoCache: string;
  valorCache: number;
}
