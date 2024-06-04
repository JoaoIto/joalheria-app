import { Joia } from "./Joia";

export interface Anel {
  tipo: 'anel';
  joiaDTO: Partial<Joia>;
  tamanho: number,
  imgAnel: string;
}
