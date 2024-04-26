import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedraPreciosa } from "../../../interfaces/PedraPreciosa";
import { Enum } from "../../../interfaces/Enum";
import { Cor } from 'src/app/enums/Cor';
import { Pedra } from 'src/app/enums/Pedra';
import { PedraPreciosaService } from 'src/app/services/pedraPreciosa.service';
import { NgForOf, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pedras-preciosas-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, NgForOf, MatSelectModule, MatExpansionModule],
  templateUrl: './pedras-preciosas-form.html',
  styleUrls: ['./pedras-preciosas-form.css']
})
export class PedrasPreciosasFormComponent implements OnInit {

  formGroup: FormGroup;
  cores: Enum[] = [];
  pedras: Enum[] = [];

  constructor(private formBuilder: FormBuilder, private pedrasPreciosasService: PedraPreciosaService) {

    this.formGroup = formBuilder.group({
      idPedra: ['', Validators.required],
      peso: ['', Validators.required],
      quantidade: ['', Validators.required],
      idCor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cores = Object.values(Cor).filter(value => typeof value === 'number').map(value => {
        return {
          id: value as number,
          label: Cor[value as number],
          value: Cor[value as number]
        };
      });
    
      this.pedras = Object.values(Pedra).filter(value => typeof value === 'number').map(value => {
        return {
          id: value as number,
          label: Pedra[value as number],
          value: Pedra[value as number]
        };
      });
  }
   

  salvar() {
    if (this.formGroup.valid) {
        console.log(this.formGroup);
        
      // Get form control values
      const pedraId = parseInt(this.formGroup.get('idPedra')?.value);
      const peso = this.formGroup.get('peso')?.value;
      const quantidade = this.formGroup.get('quantidade')?.value;
      const corId = parseInt(this.formGroup.get('idCor')?.value);
  
      // Check if controls have values before accessing properties
      if (pedraId !== null && corId !== null) {
        // Create a new PedraPreciosa object with converted values
        const pedraPreciosa: PedraPreciosa = {
          idPedra: pedraId,
          peso: peso,
          quantidade: quantidade,
          idCor: corId
        };
  
        // Call service to insert pedra preciosa
        this.pedrasPreciosasService.insert(pedraPreciosa).subscribe(
          response => {
            console.log('Pedra preciosa inserida com sucesso:', response);
          },
          error => {
            console.error('Erro ao inserir pedra preciosa:', error);
          }
        );
      } else {
        console.error('Controles de cores e/ou pedras não encontrados.');
      }
    }
  }
  
}
