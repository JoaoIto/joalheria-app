import { Joia } from "./Joia";

export interface Anel {
  id: number;
  tipo: 'anel';
  joiaDTO: Partial<Joia>;
  tamanho: number,
  nomeImagem: string;
}
