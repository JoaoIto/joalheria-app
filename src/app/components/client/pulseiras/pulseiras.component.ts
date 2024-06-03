import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pulseira } from 'src/app/interfaces/Pulseira';
import { PulseiraService } from 'src/app/services/pulseira.service';

@Component({
  selector: 'app-pulseiras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pulseiras.component.html',
  styleUrls: ['./pulseiras.component.css']
})
export class PulseirasComponent implements OnInit {
  pulseiras: Pulseira[] = [];

  constructor(private pulseiraService: PulseiraService) { }

  ngOnInit(): void {
    this.loadPulseiras();
  }

  loadPulseiras(): void {
    this.pulseiraService.getPulseiras().subscribe((pulseiras: Pulseira[]) => {
      this.pulseiras = pulseiras;
    });
  }
}
