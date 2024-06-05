import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Corrente } from 'src/app/interfaces/Corrente';
import { CorrenteService } from 'src/app/services/corrente.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-correntes',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './correntes.component.html',
  styleUrls: ['./correntes.component.css']
})
export class CorrentesComponent implements OnInit {
  correntes: Corrente[] = [];

  constructor(private correnteService: CorrenteService) { }

  ngOnInit(): void {
    this.loadCorrentes();
  }

  loadCorrentes(): void {
    this.correnteService.getCorrentes().subscribe((correntes: Corrente[]) => {
      this.correntes = correntes;
    });
  }
}
