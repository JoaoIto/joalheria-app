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

export const routes: Routes = [
  // Routes estados:
  { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},

  // Routes cidades:
  { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades'},
  { path: 'cidades/new', component: CidadeFormComponent, title: 'Novo Municipio'},
  { path: 'cidades/edit/:id', component: CidadeFormComponent, resolve: {municipio: cidadeResolver}},

  // Route Colecoes:
  { path: 'colecoes', component: ColecaoListComponent, title: 'Lista de Colecoes'},

  //Route Pessoa:
  { path: 'pessoas', component: PessoaListComponent, title: 'Lista de Pessoas'},

  // Routes pedrasPreciosas:
  { path: 'pedrasPreciosas', component: PedrasPreciosasListComponent, title: 'Lista de Pedras Preciosas'},

  // Routes Joias:
  { path: 'joias', component: JoiaListComponent, title: 'Lista de Joias'},

  // Routes correntes:
  { path: 'correntes', component: CorrenteListComponent, title: 'Lista de correntes'},

  // Routes pulseiras:
  { path: 'pulseiras', component: PulseiraListComponent, title: 'Lista de pulseiras'},

  // Routes aneis:
  { path: 'aneis', component: AnelListComponent, title: 'Lista de aneis'},

  // Routes pingentes:
  { path: 'pingentes', component: PingenteListComponent, title: 'Lista de pingentes'},
];
