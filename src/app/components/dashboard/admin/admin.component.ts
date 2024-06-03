import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from 'src/app/app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  routes = routes.filter(route => route.title && (<string>route.title).startsWith('Lista'));
  constructor() { }
}
