import { Component } from '@angular/core';
import {Joia} from "../../../interfaces/Joia";
import {JoiaService} from "../../../services/joia.service";
import {MatTableModule} from "@angular/material/table";
import { Router } from '@angular/router';

@Component({
  selector: 'app-joia-list',
  standalone: true,
  templateUrl: './joia-list.component.html',
  imports: [
    MatTableModule
  ],
  styleUrls: ['./joia-list.component.css']
})
export class JoiaListComponent {
  displayedColumns: string[] = ['id', 'nome', 'material', 'descricao', 'preco', 'estoque', 'cor', 'peso', 'acao'];
  joias: Joia[] = [];

  constructor(private router: Router, private joiaService: JoiaService) { }

  ngOnInit(): void {
    this.getJoias();
  }

  adicionarNovaJoia(): void {
    this.router.navigate(['/joias/new']);
  }

  getJoias(): void {
    this.joiaService.getJoias()
      .subscribe(joias => this.joias = joias);
    console.log(this.joias);
  }

  editarJoia(joia: Joia): void {
    this.router.navigate(['/joias/editar', joia.id]); // Supondo que exista um parâmetro de ID na rota de edição
  }
}
