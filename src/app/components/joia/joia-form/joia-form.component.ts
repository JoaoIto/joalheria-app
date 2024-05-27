import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Enum } from '../../../interfaces/Enum';
import { Cor } from 'src/app/enums/Cor';
import { Pedra } from 'src/app/enums/Pedra';
import { JoiaService } from 'src/app/services/joia.service';
import { NgForOf, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Joia } from 'src/app/interfaces/Joia';

@Component({
  selector: 'app-joia-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    NgForOf,
    MatSelectModule,
    MatExpansionModule,
  ],
  templateUrl: './joia-form.component.html',
  styleUrls: ['./joia-form.component.css'],
})
export class JoiaFormComponent implements OnInit {
  formGroup: FormGroup;
  cores: Enum[] = [];
  pedras: Enum[] = [];
  materiais: Enum[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private joiaService: JoiaService
  ) {
    this.formGroup = formBuilder.group({
      nome: ['', Validators.required],
      idMaterial: ['', Validators.required],
      descricao: ['', Validators.required],
      listaIdsPedras: [[], Validators.required],
      preco: ['', Validators.required],
      estoque: ['', Validators.required],
      idCor: ['', Validators.required],
      peso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cores = Object.values(Cor)
      .filter((value) => typeof value === 'number')
      .map((value) => {
        return {
          id: value as number,
          label: Cor[value as number],
          value: Cor[value as number],
        };
      });

    this.pedras = Object.values(Pedra)
      .filter((value) => typeof value === 'number')
      .map((value) => {
        return {
          id: value as number,
          label: Pedra[value as number],
          value: Pedra[value as number],
        };
      });

    // Assumindo que você tenha um serviço para obter materiais
    this.materiais = this.getMateriais();
  }

  getMateriais(): Enum[] {
    // Implementar lógica para obter materiais
    return [
      { id: 1, label: 'Ouro', value: 'Ouro' },
      { id: 2, label: 'Prata', value: 'Prata' },
      { id: 3, label: 'Platina', value: 'Platina' },
    ];
  }

  voltar(): void {
    this.router.navigate(['/joias']);
  }

  salvar(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup);
      const joia: Joia = {
        nome: this.formGroup.get('nome')?.value,
        idMaterial: parseInt(this.formGroup.get('idMaterial')?.value),
        descricao: this.formGroup.get('descricao')?.value,
        listaIdsPedras: this.formGroup.get('listaIdsPedras')?.value.map((id: string) => parseInt(id)),
        preco: this.formGroup.get('preco')?.value,
        estoque: this.formGroup.get('estoque')?.value,
        idCor: parseInt(this.formGroup.get('idCor')?.value),
        peso: this.formGroup.get('peso')?.value,
      };
  
      this.joiaService.insert(joia).subscribe(
        (response) => {
          console.log('Joia inserida com sucesso:', response);
          window.alert('Joia inserida com sucesso!');
          setTimeout(() => {
            window.location.href = '/joias';
          }, 1500);
        },
        (error) => {
          console.error('Erro ao inserir joia:', error);
        }
      );
    }
  }
}
