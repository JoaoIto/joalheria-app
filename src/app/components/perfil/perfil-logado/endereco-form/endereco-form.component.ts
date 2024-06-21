import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Endereco } from 'src/app/interfaces/Endereco';
import { Cidade } from 'src/app/interfaces/Cidade';
import { PessoaService } from 'src/app/services/pessoa.service';
import { CidadeService } from 'src/app/services/cidade.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adicionar-endereco',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class AdicionarEnderecoComponent implements OnInit {
  novoEndereco: any = {
    idCidade: 0,
    cep: '',
    numero: 0,
    bairro: '',
    logradouro: '',
    complemento: ''
  };
  cidades: Cidade[] = [];

  constructor(
    private pessoaService: PessoaService, 
    private router: Router,
    private cidadeService: CidadeService
  ) {}

  ngOnInit(): void {
    this.loadCidades();
  }

  loadCidades(): void {
    this.cidadeService.getCidades().subscribe(
      (data: Cidade[]) => {
        this.cidades = data;
      },
      (error) => {
        console.error('Erro ao carregar cidades:', error);
      }
    );
  }

  onCidadeChange(event: any): void {
    const cidadeId = event.target.value;
    this.novoEndereco.idCidade = cidadeId;
  }

  adicionarEndereco(): void {
    const usuarioLogado = localStorage.getItem('usuario_logado');
    if (usuarioLogado) {
      const usuario = JSON.parse(usuarioLogado);
      const pessoaId = usuario.pessoa?.id;
      
      if (pessoaId) {
        this.pessoaService.addEndereco(pessoaId, this.novoEndereco).subscribe(
          (response) => {
            console.log('Endereço adicionado:', response);
            this.router.navigate(['/user']);
          },
          (error) => {
            console.error('Erro ao adicionar endereço:', error);
          }
        );
      } else {
        console.error('ID da pessoa não encontrado.');
      }
    } else {
      console.error('Usuário não encontrado no local storage.');
    }
  }
}
