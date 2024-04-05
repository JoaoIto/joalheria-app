import { Component } from '@angular/core';
import {PedraPreciosa} from "../../../interfaces/PedraPreciosa";
import {PedraPreciosaService} from "../../../services/pedraPreciosa.service";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-pedras-preciosas-list',
  standalone: true,
  templateUrl: './pedras-preciosas-list.component.html',
  imports: [
    MatTableModule
  ],
  styleUrls: ['./pedras-preciosas-list.component.css']
})
export class PedrasPreciosasListComponent {
  displayedColumns: string[] = ['id', 'pedra', 'peso', 'quantidade', 'cor'];
  pedrasPreciosas: PedraPreciosa[] = [];

  constructor(private pedrasPreciosasService: PedraPreciosaService) { }

  ngOnInit(): void {
    this.getPedrasPreciosas();
  }

  getPedrasPreciosas(): void {
    this.pedrasPreciosasService.getPedrasPreciosas()
      .subscribe(pedrasPreciosas => this.pedrasPreciosas = pedrasPreciosas);
    console.log(this.pedrasPreciosas);
  }
}
