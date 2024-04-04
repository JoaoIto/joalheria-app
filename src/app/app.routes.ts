import {Routes} from "@angular/router";
import {EstadoListComponent} from "./components/estado/estado-list/estado-list.component";

export const routes: Routes = [
  { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados' }
];
