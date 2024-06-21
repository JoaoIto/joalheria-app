import {Cidade} from "./Cidade";

export interface Endereco {
  idCidade: Cidade
  cep: string;
  numero: number;
  bairro: string;
  logradouro: string;
  complemento: string;
}
