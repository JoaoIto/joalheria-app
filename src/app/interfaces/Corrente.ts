import {Enum} from "./Enum";
import {Pingente} from "./Pingente";

export interface Corrente {
  comprimento: number;
  tipoFecho: Enum;
  tipoElo: Enum;
  imgProduto: string;
  pingente: Pingente
}
