import {NgForOf, NgIf} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {Cidade} from "../../../interfaces/Cidade";
import {EstadoService} from "../../../services/estado.service";
import {CidadeService} from "../../../services/cidade.service";
import {Estado} from "../../../interfaces/Estado";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, NgForOf, MatSelectModule],
  templateUrl: './cidade-form.component.html',
})
export class CidadeFormComponent implements OnInit {

  formGroup: FormGroup;
  estados: Estado[] = [];

  constructor(private formBuilder: FormBuilder,
              private cidadeService: CidadeService,
              private estadoService: EstadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const estado: Estado = activatedRoute.snapshot.data['estado'];

    this.formGroup = formBuilder.group({
      id: [(estado && estado.id) ? estado.id : null],
      nome: [(estado && estado.nome) ? estado.nome : '',
        Validators.compose([Validators.required,
          Validators.minLength(4)])],
      sigla: [(estado && estado.sigla) ? estado.sigla : '',
        Validators.compose([Validators.required,
          Validators.minLength(2)])]
    });
  }
  ngOnInit(): void {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];

    // selecionando o estado
    const estadoId = cidade && cidade.estado ? cidade.estado.id : null

    this.formGroup = this.formBuilder.group({
      id: [(cidade && cidade.id) ? cidade.id : null],
      nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      estado: [estadoId, Validators.required]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;
      console.log(cidade)
      if (cidade.id ==null) {
        this.cidadeService.insert(cidade).subscribe({
          next: (municipioCadastrado) => {
            this.router.navigateByUrl('/cidades');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.cidadeService.update(cidade).subscribe({
          next: (municipioAlterado) => {
            this.router.navigateByUrl('/cidades');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const municipio = this.formGroup.value;
      if (municipio.id != null) {
        this.cidadeService.delete(municipio).subscribe({
          next: () => {
            this.router.navigateByUrl('/cidades');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}

