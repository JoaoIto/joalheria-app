import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Perfil } from 'src/app/interfaces/Perfil';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router, RouterLink } from '@angular/router';
import { Endereco } from 'src/app/interfaces/Endereco';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-perfil-logado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil-logado.component.html',
  styleUrls: ['./perfil-logado.component.css']
})
export class PerfilLogadoComponent implements OnInit {
  perfil: Partial<Perfil> = {
    email: '',
    nome: '',
    pessoa: {
      cpf: '',
      listaEndereco: [] as Endereco[]
    },
    perfil: '',
    token: ''
  };

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private pessoaService: PessoaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUsuarioLogadoHttp().subscribe(
      (usuarioLogado: Perfil) => {
        console.log(usuarioLogado);
        this.perfil = usuarioLogado;
        this.localStorageService.setItem('usuario_logado', usuarioLogado);
        if (!this.perfil.pessoa) {
          this.perfil.pessoa = {
            id: 0,
            cpf: '',
            listaEndereco: []
          };
        } else if (!this.perfil.pessoa.listaEndereco) {
          this.perfil.pessoa.listaEndereco = [] as Endereco[];
        }
      },
      (error) => {
        console.error('Erro ao carregar dados do usuário logado:', error);
      }
    );
  }

  redirecionarAdicionarEndereco(): void {
    this.router.navigate(['/user/endereco/adicionar']);
  }

  atualizarPerfil(): void {
    console.log('Perfil atualizado:', this.perfil);
  }

  novoEndereco: Endereco = {
    cidade: { id: 0, nome: '', estado: {
      id: 0,
      nome: '',
      sigla: ''
    } },
    cep: '',
    numero: 0,
    bairro: '',
    logradouro: '',
    complemento: ''
  };

  adicionarEndereco(): void {
    if (this.perfil.pessoa && this.perfil.pessoa.id !== undefined) {
      const pessoaId = this.perfil.pessoa.id;
      this.pessoaService.addEndereco(pessoaId, this.novoEndereco).subscribe(
        (response) => {
          console.log('Endereço adicionado:', response);
          if (this.perfil.pessoa && this.perfil.pessoa.listaEndereco) {
            this.perfil.pessoa.listaEndereco.push(this.novoEndereco);
          }
          this.novoEndereco = {
            cidade: { id: 0, nome: '', estado: {
              id: 0,
              nome: '',
              sigla: ''
            } },
            cep: '',
            numero: 0,
            bairro: '',
            logradouro: '',
            complemento: ''
          };
        },
        (error) => {
          console.error('Erro ao adicionar endereço:', error);
        }
      );
    } else {
      console.error('Pessoa não encontrada ou ID da pessoa indefinido.');
    }
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
