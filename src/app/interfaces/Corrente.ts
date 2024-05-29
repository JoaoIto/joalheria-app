import {Enum} from "./Enum";
import { Joia } from "./Joia";
import {Pingente} from "./Pingente";

export interface Corrente {
  joiaDTO: Partial<Joia>
  comprimento: number;
  idFecho: number;
  idElo: number;
  imgCorrente: string;
  idPingente: number
}
