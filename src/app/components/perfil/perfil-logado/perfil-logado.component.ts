import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Certifique-se de importar FormsModule
import { Perfil } from 'src/app/interfaces/Perfil';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-logado',
  standalone: true,
  imports: [CommonModule, FormsModule], // Certifique-se de incluir FormsModule aqui
  templateUrl: './perfil-logado.component.html',
  styleUrls: ['./perfil-logado.component.css']
})
export class PerfilLogadoComponent implements OnInit {
  perfil: Partial<Perfil> = {
    email: '',
    nome: '',
    perfil: '',
    token: ''
  };

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const usuarioLogado = this.localStorageService.getItem('usuario_logado');
    if (usuarioLogado) {
      console.log(usuarioLogado);
      this.perfil = usuarioLogado;
    }
  }

  atualizarPerfil(): void {
    // Adicione a lógica de atualização aqui, se necessário
    console.log('Perfil atualizado:', this.perfil);
  }

  deslogar(): void {
    this.localStorageService.removeItem('jwt_token');
    this.localStorageService.removeItem('usuario_logado');
    this.router.navigate(['/login']);
  }

  redirecionarAlterarSenha(): void {
    this.router.navigate(['/user/alterar-senha']);
  }
}
