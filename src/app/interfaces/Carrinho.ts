import { Pessoa } from "./Pessoa";

export interface Carrinho {
    pessoa: Pessoa;
    itens: Array<{ quantidade: number, idJoia: number }>;
}