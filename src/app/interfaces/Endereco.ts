import {Cidade} from "./Cidade";

export interface Endereco {
  cidade: Cidade
  cep: string;
  numero: number;
  bairro: string;
  logradouro: string;
  complemento: string;
}
