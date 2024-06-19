import { Pessoa } from "./Pessoa";

export interface Perfil {
    id: number;
    email: string;
    nome: string;
    perfil: string;
    pessoa: Partial<Pessoa>;
    token: string;
  }
  