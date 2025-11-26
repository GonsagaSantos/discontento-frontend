export interface Usuario {
  idCliente: number;
  nome: string;
  email: string;
  documento: string;
  ativo: number;
}

export interface UsuarioGravar {
  nome: string;
  email: string;
  documento: string;
  senha: string;
  ativo: number;
  cep: string;
  logradouro: string;
  numero_contato: string;
}

export interface Login {
  email: string;
  senha: string;
}

export interface RecuperarSenhaInterface {
  email: string;
}

export interface NovaSenhaInterface {
  senha: string;
}

export interface EmailRequest {
  email: string;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
}