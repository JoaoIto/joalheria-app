import { Component } from '@angular/core';
import {Pingente} from "../../../interfaces/Pingente";
import {PingenteService} from "../../../services/pingente.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-pingente-list',
  standalone: true,
  templateUrl: './pingente-list.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTableModule
  ],
  styleUrls: ['./pingente-list.component.css']
})
export class PingenteListComponent {
  displayedColumns: string[] = ['id', 'material', 'cor'];
  pingentes: Pingente[] = [];

  constructor(private pingentesService: PingenteService) { }

  ngOnInit(): void {
    this.getPingentes();
  }

  getPingentes(): void {
    this.pingentesService.getPingentes()
      .subscribe(pingentes => this.pingentes = pingentes);
    console.log(this.pingentes);
  }
}
