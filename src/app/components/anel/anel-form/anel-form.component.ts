import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Anel } from 'src/app/interfaces/Anel';
import { Joia } from 'src/app/interfaces/Joia';
import { Cor } from 'src/app/enums/Cor';
import { Enum } from 'src/app/interfaces/Enum';
import { AnelService } from 'src/app/services/anel.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Pedra } from 'src/app/enums/Pedra';

@Component({
  selector: 'app-anel-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCardModule, MatToolbarModule, RouterModule,
    NgForOf, MatSelectModule, MatExpansionModule,],
  templateUrl: './anel-form.component.html',
  styleUrls: ['./anel-form.component.css']
})
export class AnelFormComponent implements OnInit{
  formGroup: FormGroup;
  materiais: Enum[] = [];
  cores: Enum[] = [];
  pedras: Enum[] = [];
  elos: Enum[] = [];
  fechos: Enum[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private anelSevice: AnelService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      idMaterial: ['', Validators.required],
      descricao: ['', Validators.required],
      listaIdsPedras: [[], Validators.required],
      preco: ['', Validators.required],
      estoque: ['', Validators.required],
      idCor: ['', Validators.required],
      peso: ['', Validators.required],
      tamanho: ['', Validators.required],
      imgAnel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cores = Object.values(Cor)
      .filter((value) => typeof value === 'number')
      .map((value) => ({
        id: value as number,
        label: Cor[value as number],
        value: Cor[value as number],
      }));

      this.pedras = Object.values(Pedra)
      .filter((value) => typeof value === 'number')
      .map((value) => ({
        id: value as number,
        label: Pedra[value as number],
        value: Pedra[value as number],
      }));

    this.materiais = this.getMateriais();
  }
  
  getMateriais(): Enum[] {
    return [
      { id: 1, label: 'Ouro', value: 'Ouro' },
      { id: 2, label: 'Prata', value: 'Prata' },
      { id: 3, label: 'Platina', value: 'Platina' },
    ];
  }

  voltar(): void {
    this.router.navigate(['/aneis']);
  }

  salvar(): void {
    if (this.formGroup.valid) {
     const joiaDTO: Partial<Joia> = {
        nome: this.formGroup.get('nome')?.value,
        idMaterial: parseInt(this.formGroup.get('idMaterial')?.value, 10),
        descricao: this.formGroup.get('descricao')?.value,
        listaIdsPedras: this.formGroup.get('listaIdsPedras')?.value.map((id: string) => parseInt(id, 10)),
        preco: this.formGroup.get('preco')?.value,
        estoque: this.formGroup.get('estoque')?.value,
        idCor: parseInt(this.formGroup.get('idCor')?.value, 10),
        peso: this.formGroup.get('peso')?.value,
      }
      const pulseira: Partial<Anel> = {
        joiaDTO,
        tamanho: this.formGroup.get('tamanho')?.value,
        imgAnel: this.formGroup.get('imgAnel')?.value,
      };

      this.anelSevice.insert(pulseira).subscribe(
        (response) => {
          console.log('Anel criado com sucesso:', response);
          window.alert('Anel criado com sucesso!');
          this.router.navigate(['/aneis']);
        },
        (error) => {
          console.error('Erro ao criar anel:', error);
        }
      );
    } else {
      console.error('Formulário inválido');
      console.log(this.formGroup)
    }
  }
}
