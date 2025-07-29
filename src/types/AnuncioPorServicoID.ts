export interface AnuncioPorServicoResponse {
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
  dataCriacao: string;
  fotoPerfilUrl: string | null;
  nomeAcompanhante: string | null;

  localizacao: {
    endereco: string | null;
    cidade: string;
    estado: string;
    bairro: string | null;
    latitude: number;
    longitude: number;
  };

  fotos: {
    fotoAnuncioID: number;
    url: string;
    dataUpload: string;
  }[];

  videos: any[];

  sobreUsuario: {
    atendimento: string[];
    etnia: string;
    relacionamento: string;
    cabelo: string;
    estatura: string;
    corpo: string;
    seios: string | null;
    pubis: string;
  };

  caches: {
    formaPagamento: string;
    descricao: string;
    valor: number;
  }[];

  horariosAtendimento: {
    diaSemana: string;
    atende: boolean;
    horarioInicio: string;
    horarioFim: string;
    vinteQuatroHoras: boolean;
  }[];
}
