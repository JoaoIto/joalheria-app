import { Component } from '@angular/core';
import {Pessoa} from "../../../interfaces/Pessoa";
import {PessoaService} from "../../../services/pessoa.service";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterModule} from "@angular/router";
import {NgFor} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  standalone: true,
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink
  ],
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent {
  displayedColumns: string[] = ['nome', 'senha', 'cpf', 'telefone', 'email', 'dataNascimento', 'perfil', 'acao'];
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.getPessoas();
  }

  getPessoas(): void {
    this.pessoaService.getPessoas()
      .subscribe(pessoas => this.pessoas = pessoas);
    console.log(this.pessoas);
  }
}
