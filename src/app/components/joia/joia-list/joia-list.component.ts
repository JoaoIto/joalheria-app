import { Component } from '@angular/core';
import {Joia} from "../../../interfaces/Joia";
import {JoiaService} from "../../../services/joia.service";
import {MatTableModule} from "@angular/material/table";

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
  displayedColumns: string[] = ['nome', 'material', 'descricao', 'preco', 'estoque', 'cor', 'peso'];
  joias: Joia[] = [];

  constructor(private joiaService: JoiaService) { }

  ngOnInit(): void {
    this.getJoias();
  }

  getJoias(): void {
    this.joiaService.getJoias()
      .subscribe(joias => this.joias = joias);
    console.log(this.joias);
  }
}
