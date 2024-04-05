import { Component } from '@angular/core';
import {Pulseira} from "../../../interfaces/Pulseira";
import {PulseiraService} from "../../../services/pulseira.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pulseira-list',
  standalone: true,
  templateUrl: './pulseira-list.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    RouterLink
  ],
  styleUrls: ['./pulseira-list.component.css']
})
export class PulseiraListComponent {
  displayedColumns: string[] = ['comprimento', 'tipoFecho', 'tipoElo', 'pingente'];
  pulseiras: Pulseira[] = [];

  constructor(private pulseiraService: PulseiraService) { }

  ngOnInit(): void {
    this.getPulseiras();
  }

  getPulseiras(): void {
    this.pulseiraService.getPulseiras()
      .subscribe(pulseiras => this.pulseiras = pulseiras);
    console.log(this.pulseiras);
  }
}
