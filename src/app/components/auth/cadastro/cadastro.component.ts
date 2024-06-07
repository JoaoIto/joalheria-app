import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CadastroDTO } from 'src/app/interfaces/Cadastro';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, NgForOf, MatSelectModule, MatExpansionModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Obtém a URL de retorno se houver
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const cadastroData: CadastroDTO = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha
    };

    this.authService.cadastro(cadastroData).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
      }
    );
  }
}
