import { Component } from '@angular/core';
import {Colecao} from "../../../interfaces/Colecao";
import {ColecaoService} from "../../../services/colecao.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-colecao-list',
  standalone: true,
  templateUrl: './colecao-list.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    MatButtonModule
  ],
  styleUrls: ['./colecao-list.component.css']
})
export class ColecaoListComponent {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'pessoa'];
  colecoes: Colecao[] = [];

  constructor(private colecaoService: ColecaoService) { }

  ngOnInit(): void {
    this.getColecoes();
  }

  getColecoes(): void {
    this.colecaoService.getColecoes()
      .subscribe(colecoes => this.colecoes = colecoes);
    console.log(this.colecoes);
  }
}
