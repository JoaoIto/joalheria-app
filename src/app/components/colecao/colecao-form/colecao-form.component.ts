import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ColecaoService } from 'src/app/services/colecao.service';
import { Pessoa } from 'src/app/interfaces/Pessoa'; // Garanta que a interface Pessoa está corretamente definida
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colecao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './colecao-form.component.html',
  styleUrls: ['./colecao-form.component.css'],
})
export class ColecaoFormComponent implements OnInit {
  formGroup: FormGroup;
  pessoas: Pessoa[] = []; // Lista de pessoas para seleção

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private colecaoService: ColecaoService,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      pessoaId: [null, Validators.required] // Campo de pessoaId para seleção
    });
  }

  ngOnInit(): void {
    this.pessoaService.getPessoas().subscribe(pessoas => {
      this.pessoas = pessoas; 
      console.log(pessoas);
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      console.log(this.formGroup);
      
      const colecaoData = this.formGroup.value;
      this.colecaoService.insert(colecaoData).subscribe({
        next: (response) => {
          console.log('Coleção cadastrada com sucesso!', response);
          this.router.navigateByUrl('/colecoes'); // Ajuste conforme necessário
        },
        error: (error) => {
          console.error('Erro ao cadastrar coleção', error);
        },
      });
    }
  }
}
