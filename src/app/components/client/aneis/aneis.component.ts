import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anel } from 'src/app/interfaces/Anel';
import { AnelService } from 'src/app/services/anel.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aneis',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './aneis.component.html',
  styleUrls: ['./aneis.component.css']
})
export class AneisComponent implements OnInit {
  aneis: Anel[] = [];

  constructor(private anelService: AnelService) { }

  ngOnInit(): void {
    this.loadAneis();
  }

  loadAneis(): void {
    this.anelService.getAneis().subscribe((aneis: Anel[]) => {
      this.aneis = aneis;
    });
  }
}
