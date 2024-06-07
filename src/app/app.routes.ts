  import {Routes} from "@angular/router";
import {EstadoListComponent} from "./components/estado/estado-list/estado-list.component";
import {PessoaListComponent} from "./components/pessoa/pessoa-list/pessoa-list.component";
import {CidadeListComponent} from "./components/cidade/cidade-list/cidade-list.component";
import {cidadeResolver} from "./components/cidade/resolver/cidade-resolver";
import {CidadeFormComponent} from "./components/cidade/cidade-form/cidade-form.component";
import {ColecaoListComponent} from "./components/colecao/colecao-list/colecao-list.component";
import {
  PedrasPreciosasListComponent
} from "./components/pedras-preciosas/pedras-preciosas-list/pedras-preciosas-list.component";
import {JoiaListComponent} from "./components/joia/joia-list/joia-list.component";
import {CorrenteListComponent} from "./components/corrente/corrente-list/corrente-list.component";
import {PulseiraListComponent} from "./components/pulseira/pulseira-list/pulseira-list.component";
import {AnelListComponent} from "./components/anel/anel-list/anel-list.component";
import {PingenteListComponent} from "./components/pingente/pingente-list/pingente-list.component";
import { PedrasPreciosasFormComponent } from "./components/pedras-preciosas/pedras-preciosas-form/pedras-preciosas-form";
import { ColecaoFormComponent } from "./components/colecao/colecao-form/colecao-form.component";
import { JoiaFormComponent } from "./components/joia/joia-form/joia-form.component";
import { JoiaEditComponent } from "./components/joia/joia-edit/joia-edit.component";
import { CorrenteFormComponent } from "./components/corrente/corrente-form/corrente-form.component";
import { PulseiraFormComponent } from "./components/pulseira/pulseira-form/pulseira-form.component";
import { AnelFormComponent } from "./components/anel/anel-form/anel-form.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminComponent } from "./components/dashboard/admin/admin.component";
import { CorrentesComponent } from "./components/client/correntes/correntes.component";
import { PulseirasComponent } from "./components/client/pulseiras/pulseiras.component";
import { AneisComponent } from "./components/client/aneis/aneis.component";
import { CarrinhoComponent } from "./components/client/carrinho/carrinho.component";
import { PagamentoComponent } from "./components/client/pagamento/pagamento.component";
import { PagamentoCartaoComponent } from "./components/client/pagamento/pagamento-cartao/pagamento-cartao.component";
import { AuthComponent } from "./components/auth/auth-form.component";

export const routes: Routes = [
  // Routes client
  {path: '', component: DashboardComponent, title: 'Dashboard'},
  {path: 'login', component: AuthComponent, title: 'Login'},
  {path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho'},
  {path: 'pagamento', component: PagamentoComponent, title: 'Pagamento'},
  {path: 'pagamento/cartao', component: PagamentoCartaoComponent, title: 'Pagamento-Cartão'},
  {path: 'client/correntes', component: CorrentesComponent, title: 'Correntes'},
  {path: 'client/pulseiras', component: PulseirasComponent, title: 'Pulseiras'},
  {path: 'client/aneis', component: AneisComponent, title: 'Aneis'},

  // Routes admin
  {path: 'admin/dashboard', component: AdminComponent, title: 'Dashboard Admin'},

  // Routes estados:
  { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},

  // Routes cidades:
  { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades'},
  { path: 'cidades/new', component: CidadeFormComponent, title: 'Novo Municipio'},
  { path: 'cidades/edit/:id', component: CidadeFormComponent, resolve: {municipio: cidadeResolver}},

  // Route Colecoes:
  { path: 'colecoes', component: ColecaoListComponent, title: 'Lista de Colecoes'},
  { path: 'colecoes/new', component: ColecaoFormComponent, title: 'Cadastro de Colecoes'},

  //Route Pessoa:
  { path: 'pessoas', component: PessoaListComponent, title: 'Lista de Pessoas'},

  // Routes pedrasPreciosas:
  { path: 'pedrasPreciosas', component: PedrasPreciosasListComponent, title: 'Lista de Pedras Preciosas'},
  { path: 'pedrasPreciosas/new', component: PedrasPreciosasFormComponent, title: 'Cadastro de Pedras Preciosas'},

  // Routes Joias:
  { path: 'joias', component: JoiaListComponent, title: 'Lista de Joias'},
  { path: 'joias/new', component: JoiaFormComponent, title: 'Cadastro de Joias'},
  { path: 'joias/editar/:id', component: JoiaEditComponent, title: 'Atualizar de Joias'},

  // Routes correntes:
  { path: 'correntes', component: CorrenteListComponent, title: 'Lista de correntes'},
  { path: 'correntes/new', component: CorrenteFormComponent, title: 'Cadastro de correntes'},


  // Routes pulseiras:
  { path: 'pulseiras', component: PulseiraListComponent, title: 'Lista de pulseiras'},
  { path: 'pulseiras/new', component: PulseiraFormComponent, title: 'Cadastro de pulseiras'},

  // Routes aneis:
  { path: 'aneis', component: AnelListComponent, title: 'Lista de aneis'},
  { path: 'aneis/new', component: AnelFormComponent, title: 'Cadastro de aneis'},

  // Routes pingentes:
  { path: 'pingentes', component: PingenteListComponent, title: 'Lista de pingentes'},
];
