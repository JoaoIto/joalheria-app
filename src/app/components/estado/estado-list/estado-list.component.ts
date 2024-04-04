import {Component, OnInit} from '@angular/core';
import {EstadoService} from "../../../services/estado.service";
import {Estado} from "../../../interfaces/Estado";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {NgFor} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})

export class EstadoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
  estados: Estado[] = [];

  constructor(private estadoService: EstadoService) { }

  ngOnInit(): void {
    this.getEstados();
  }

  getEstados(): void {
    this.estadoService.getEstados()
      .subscribe(estados => this.estados = estados);
    console.log(this.estados);
  }
}
