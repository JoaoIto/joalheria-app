import {Enum} from "./Enum";
import {PedraPreciosa} from "./PedraPreciosa";

export interface Joia {
  nome: string;
  material: Enum
  descricao: string;
  listaPedras: PedraPreciosa[]
  preco: number;
  estoque: number;
  cor: Enum;
  peso: number;
}
