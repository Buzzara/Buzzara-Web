export interface PerfilPublico {
  usuarioID: number;
  perfilAcompanhanteID: number;
  nome: string;
  email: string;
  telefone: string;
  genero: string;
  dataNascimento: string;     
  fotoCapaUrl: string;
  descricao: string;
  localizacao: string;
  tarifa: number;
  estaOnline: boolean;
  ultimoAcesso: string;       
}
