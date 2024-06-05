import {Endereco} from "./Endereco";

export interface Pessoa {
  id: number;
  nome: string;
  senha: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  listaEndereco: Endereco[];
  perfil: {
    id: number;
    label: string;
  };
  nomeImagem: string | null;
}
