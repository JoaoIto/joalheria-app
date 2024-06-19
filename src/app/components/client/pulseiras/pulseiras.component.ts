import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pulseira } from 'src/app/interfaces/Pulseira';
import { PulseiraService } from 'src/app/services/pulseira.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-pulseiras',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './pulseiras.component.html',
  styleUrls: ['./pulseiras.component.css']
})
export class PulseirasComponent implements OnInit {
  pulseiras: Pulseira[] = [];

  constructor(private pulseiraService: PulseiraService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadPulseiras();
  }

  logout(): void {
    // Limpar o token do local storage
    this.localStorageService.removeItem('token');
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }

  loadPulseiras(): void {
    this.pulseiraService.getPulseiras().subscribe((pulseiras: Pulseira[]) => {
      this.pulseiras = pulseiras;
    });
  }
}
