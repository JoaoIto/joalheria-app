import {Pessoa} from "./Pessoa";

export interface Colecao {
  id: number;
  nome: string;
  descricao: string;
  pessoa: Pessoa;
}
