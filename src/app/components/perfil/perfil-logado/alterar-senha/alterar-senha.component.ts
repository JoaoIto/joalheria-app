import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Perfil } from 'src/app/interfaces/Perfil';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [
    CommonModule, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, NgForOf, MatSelectModule, MatExpansionModule],
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  perfil: Partial<Perfil> = {
    email: '',
    nome: '',
    perfil: '',
    token: '',
  };
  novaSenha: string = '';

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioLogado = this.localStorageService.getItem('usuario_logado');
    if (usuarioLogado) {
      this.perfil = usuarioLogado;
      // The rest of the code remains the same
    }
  }
  onSubmit(): void {
    // Chame o método de alteração de senha do AuthService com o email do usuário e a nova senha
    this.authService.alterarSenha(this.perfil.email ?? '', this.novaSenha).subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );;
  }
}