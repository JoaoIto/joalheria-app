import { Component } from '@angular/core';
import {Anel} from "../../../interfaces/Anel";
import {AnelService} from "../../../services/anel.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-anel-list',
  standalone: true,
  templateUrl: './anel-list.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTableModule
  ],
  styleUrls: ['./anel-list.component.css']
})
export class AnelListComponent {
  displayedColumns: string[] = ['tamanho', 'imgAnel'];
  aneis: Anel[] = [];

  constructor(private anelService: AnelService) { }

  ngOnInit(): void {
    this.getPulseiras();
  }

  getPulseiras(): void {
    this.anelService.getAneis()
      .subscribe(aneis => this.aneis = aneis);
    console.log(this.aneis);
  }
}
