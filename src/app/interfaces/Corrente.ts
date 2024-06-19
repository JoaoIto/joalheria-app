import {Enum} from "./Enum";
import { Joia } from "./Joia";
import {Pingente} from "./Pingente";

export interface Corrente {
  id: number;
  tipo: 'corrente';
  joiaDTO: Partial<Joia>
  comprimento: number;
  idFecho: number;
  idElo: number;
  nomeImagem: string;
  idPingente: number
}
