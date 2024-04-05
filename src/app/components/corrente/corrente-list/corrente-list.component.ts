import { Component } from '@angular/core';
import {Corrente} from "../../../interfaces/Corrente";
import {CorrenteService} from "../../../services/corrente.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-corrente-list',
  standalone: true,
  templateUrl: './corrente-list.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    RouterLink
  ],
  styleUrls: ['./corrente-list.component.css']
})
export class CorrenteListComponent {
  displayedColumns: string[] = ['comprimento', 'tipoFecho', 'tipoElo', 'imgProduto', 'pingente'];
  correntes: Corrente[] = [];

  constructor(private correnteService: CorrenteService) { }

  ngOnInit(): void {
    this.getCorrentes();
  }

  getCorrentes(): void {
    this.correnteService.getCorrentes()
      .subscribe(correntes => this.correntes = correntes);
    console.log(this.correntes);
  }
}
