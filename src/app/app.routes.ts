import {Routes} from "@angular/router";
import {EstadoListComponent} from "./components/estado/estado-list/estado-list.component";
import {PessoaListComponent} from "./components/pessoa/pessoa-list/pessoa-list.component";
import {CidadeListComponent} from "./components/cidade/cidade-list/cidade-list.component";
import {cidadeResolver} from "./components/cidade/resolver/cidade-resolver";
import {CidadeFormComponent} from "./components/cidade/cidade-form/cidade-form.component";
import {ColecaoListComponent} from "./components/colecao/colecao-list/colecao-list.component";

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
  { path: 'pessoas', component: PessoaListComponent, title: 'Lista de Pessoas'}

];
