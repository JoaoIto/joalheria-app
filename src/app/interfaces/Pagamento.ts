import { Carrinho } from "./Carrinho";
import {Enum} from "./Enum";
import {PedraPreciosa} from "./PedraPreciosa";

export interface Pagamento {
 valorTotal: number;
 metodo: Enum;
 status: Enum;
 dataPagamento: string;
}
