import {Enum} from "./Enum";
import { Joia } from "./Joia";
import {Pingente} from "./Pingente";

export interface Corrente {
  tipo: 'corrente';
  joiaDTO: Partial<Joia>
  comprimento: number;
  idFecho: number;
  idElo: number;
  imgProduto: string;
  idPingente: number
}
