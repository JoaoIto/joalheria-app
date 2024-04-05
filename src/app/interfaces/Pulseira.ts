import {Enum} from "./Enum";
import {Pingente} from "./Pingente";

export interface Pulseira {
  comprimento: number;
  tipoFecho: Enum;
  tipoElo: Enum;
  imgPulseira: string;
  pingente: Pingente
}
