import { Component } from '@angular/core';
import {Cidade} from "../../../interfaces/Cidade";
import {CidadeService} from "../../../services/cidade.service";
import {NgFor} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.css']
})
export class CidadeListComponent {
  displayedColumns: string[] = ['id', 'nome', 'estado', 'acao'];
  cidades: Cidade[] = [];

  constructor(private cidadeService: CidadeService) { }

  ngOnInit(): void {
    this.getCidades();
  }

  getCidades(): void {
    this.cidadeService.getCidades()
      .subscribe(cidades => this.cidades = cidades);
    console.log(this.cidades);
  }
}
