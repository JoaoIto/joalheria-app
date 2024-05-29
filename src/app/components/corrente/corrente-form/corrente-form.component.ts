import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CorrenteService } from 'src/app/services/corrente.service';
import { Enum } from 'src/app/interfaces/Enum';
import { Cor } from 'src/app/enums/Cor';
import { Pedra } from 'src/app/enums/Pedra';
import { Corrente } from 'src/app/interfaces/Corrente';
import { CommonModule, NgForOf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Joia } from 'src/app/interfaces/Joia';
import { Pingente } from 'src/app/interfaces/Pingente';
import { PingenteService } from 'src/app/services/pingente.service';

@Component({
  selector: 'app-corrente-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCardModule, MatToolbarModule, RouterModule,
    NgForOf, MatSelectModule, MatExpansionModule,
  ],
  templateUrl: './corrente-form.component.html',
  styleUrls: ['./corrente-form.component.css']
})
export class CorrenteFormComponent implements OnInit {
  formGroup: FormGroup;
  materiais: Enum[] = [];
  cores: Enum[] = [];
  pedras: Enum[] = [];
  elos: Enum[] = [];
  fechos: Enum[] = [];
  pingentes: Pingente[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private correnteService: CorrenteService,
    private pingenteService: PingenteService
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
      comprimento: ['', Validators.required],
      imgCorrente: ['', Validators.required],
      idFecho: ['', Validators.required],
      idElo: ['', Validators.required],
      idPingente: ['', Validators.required]
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
    this.elos = this.getElos();
    this.fechos = this.getFechos();
    this.pingentes = this.getPingentes();
  }

  getPingentes(): Pingente[] {
    this.pingenteService.getPingentes().subscribe(
      (pingentes: Pingente[]) => {
        this.pingentes = pingentes;
        return this.pingentes;
      },
      (error) => {
        console.error('Erro ao obter pingentes:', error);
      }
    );
    return [];  // Return an empty array if the subscription is not yet resolved.
  }

  getElos(): Enum[] {
    return [
      { id: 1, label: 'Elo Groselha', value: 'Elo Groselha' },
      { id: 2, label: 'Elo Cadeado', value: 'Elo Cadeado' },
      { id: 3, label: 'Elo Marinheiro', value: 'Elo Marinheiro' },
    ];
  }

  getFechos(): Enum[] {
    return [
      { id: 1, label: 'Fecho de Gancho', value: 'Fecho de Gancho' },
      { id: 2, label: 'Fecho de Mola', value: 'Fecho de Mola' },
      { id: 3, label: 'Fecho de Fecho', value: 'Fecho de Fecho' },
    ];
  }
  
  getMateriais(): Enum[] {
    return [
      { id: 1, label: 'Ouro', value: 'Ouro' },
      { id: 2, label: 'Prata', value: 'Prata' },
      { id: 3, label: 'Platina', value: 'Platina' },
    ];
  }

  voltar(): void {
    this.router.navigate(['/correntes']);
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
      const corrente: Partial<Corrente> = {
        joiaDTO,
        comprimento: this.formGroup.get('comprimento')?.value,
        imgCorrente: this.formGroup.get('imgCorrente')?.value,
        idFecho: parseInt(this.formGroup.get('idFecho')?.value, 10),
        idElo: parseInt(this.formGroup.get('idElo')?.value, 10),
        idPingente: parseInt(this.formGroup.get('idPingente')?.value, 10)
      };

      this.correnteService.insert(corrente).subscribe(
        (response) => {
          console.log('Corrente criada com sucesso:', response);
          window.alert('Corrente criada com sucesso!');
          this.router.navigate(['/correntes']);
        },
        (error) => {
          console.error('Erro ao criar corrente:', error);
        }
      );
    } else {
      console.error('Formulário inválido');
      console.log(this.formGroup)
    }
  }
}
