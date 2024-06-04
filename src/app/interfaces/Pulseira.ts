import {Enum} from "./Enum";
import { Joia } from "./Joia";
import {Pingente} from "./Pingente";

export interface Pulseira {
  tipo: 'pulseira';
  joiaDTO: Partial<Joia>;
  comprimento: number;
  idFecho: number;
  idElo: number;
  imgPulseira: string;
  idPingente: number
}
