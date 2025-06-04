// src/types/PerfilAcompanhante.ts

export interface PerfilAcompanhante {
  usuarioID: number;
  perfilAcompanhanteID: number;
  nome: string;
  email: string;
  telefone: string;
  genero: string;
  dataNascimento: string;       // ISO 8601 date string
  fotoPerfilUrl: string;
  fotoCapaUrl: string;
  descricao: string;
  localizacao: string;
  tarifa: number;
  estaOnline: boolean;
  ultimoAcesso: string;         // ISO 8601 datetime string
  ultimoIP: string;
}
