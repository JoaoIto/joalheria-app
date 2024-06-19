import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Corrente } from 'src/app/interfaces/Corrente';
import { CorrenteService } from 'src/app/services/corrente.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-correntes',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './correntes.component.html',
  styleUrls: ['./correntes.component.css']
})
export class CorrentesComponent implements OnInit {
  correntes: Corrente[] = [];

  constructor(private correnteService: CorrenteService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadCorrentes();
  }

  logout(): void {
    // Limpar o token do local storage
    this.localStorageService.removeItem('token');
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }

  loadCorrentes(): void {
    this.correnteService.getCorrentes().subscribe((correntes: Corrente[]) => {
      this.correntes = correntes;
    });
  }
}
