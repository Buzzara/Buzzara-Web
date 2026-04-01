export interface PerfilPublico {
  usuarioID: number;
  perfilAcompanhanteID: number;
  nome: string;
  email: string;
  telefone?: string | null;
  genero?: string | null;
  dataNascimento: string;
  fotoPerfilUrl?: string | null;
  fotoCapaUrl?: string | null;
  descricao?: string | null;
  localizacao?: string | null;
  tarifa: number;
  estaOnline: boolean;
  ultimoAcesso?: string | null;
}
