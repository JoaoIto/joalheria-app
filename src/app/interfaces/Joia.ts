import {Enum} from "./Enum";
import {PedraPreciosa} from "./PedraPreciosa";

export interface Joia {
  id: number;
  nome: string;
  idMaterial: number
  descricao: string;
  listaIdsPedras: number[]
  preco: number;
  estoque: number;
  idCor: number;
  peso: number;
}
