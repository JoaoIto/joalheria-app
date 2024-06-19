import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anel } from 'src/app/interfaces/Anel';
import { AnelService } from 'src/app/services/anel.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-aneis',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './aneis.component.html',
  styleUrls: ['./aneis.component.css']
})
export class AneisComponent implements OnInit {
  aneis: Anel[] = [];

  constructor(private anelService: AnelService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadAneis();
  }

  logout(): void {
    // Limpar o token do local storage
    this.localStorageService.removeItem('token');
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }

  loadAneis(): void {
    this.anelService.getAneis().subscribe((aneis: Anel[]) => {
      this.aneis = aneis;
    });
  }
}
