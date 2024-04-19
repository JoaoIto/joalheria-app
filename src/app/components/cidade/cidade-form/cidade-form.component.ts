// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
//
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { NgIf } from '@angular/common';
//
// import { MatToolbarModule } from '@angular/material/toolbar';
//
// import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import { MatIconModule } from '@angular/material/icon';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CidadeService } from '../../../services/cidade.service';
// import { Cidade } from '../../../interfaces/Cidade';
// import { EstadoService } from '../../../services/estado.service';
// import { Estado } from '../../../interfaces/Estado';
// import {MatSelectModule} from '@angular/material/select';
//
// @Component({
//   selector: 'app-cidade-form',
//   standalone: true,
//   providers: [provideNativeDateAdapter()],
//   imports: [
//     NgIf,
//     MatToolbarModule,
//     MatButtonModule,
//     RouterModule,
//     MatExpansionModule,
//     MatFormFieldModule,
//     MatDatepickerModule,
//     MatInputModule,
//     MatAccordion,
//     MatIconModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatSelectModule
//   ],
//   templateUrl: './cidade-form.component.html',
// })
// export class CidadeFormComponent implements OnInit {
//   @ViewChild(MatAccordion) accordion: MatAccordion;
//
//   formGroup: FormGroup;
//   estados: Estado[] = [];
//   estado: any;
//
//   constructor(
//     private formBuilder: FormBuilder,
//     private cidadeService: CidadeService,
//     private estadoService: EstadoService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute
//   ) {
//     this.accordion = new MatAccordion();
//
//     this.formGroup = formBuilder.group({
//       id: [null],
//       nome: ['', Validators.required],
//       estado: [null],
//     });
//   }
//   ngOnInit(): void {
//     this.estadoService.getEstados().subscribe((data) => {
//       this.estados = data;
//       this.initializeForm();
//     });
//   }
//
//   initializeForm() {
//     const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];
//
//     //selecionando o estado
//     const estado = this.estados.find(
//       (estado) => estado.id === (cidade?.estado?.id || null)
//     );
//
//     this.formGroup = this.formBuilder.group({
//       id: [(cidade && cidade.id) ? cidade.id : null],
//       nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
//       estado: [estado]
//     });
//   }
//
//   salvar() {
//     if (this.formGroup.valid) {
//       const cidade = this.formGroup.value;
//       if (cidade.id == null) {
//         this.cidadeService.insert(cidade).subscribe({
//           next: (cidadeCadastrado) => {
//             this.router.navigateByUrl('/estados_cidades');
//           },
//           error: (err) => {
//             console.log('Erro ao Incluir' + JSON.stringify(err));
//           },
//         });
//       } else {
//         this.cidadeService.update(cidade).subscribe({
//           next: (cidadeAlterado) => {
//             this.router.navigateByUrl('/estados_cidades');
//           },
//           error: (err) => {
//             console.log('Erro ao Editar' + JSON.stringify(err));
//           },
//         });
//       }
//     }
//   }
//
//   excluir() {
//     if (this.formGroup.valid) {
//       const cidade = this.formGroup.value;
//       if (cidade.id != null) {
//         this.cidadeService.delete(cidade).subscribe({
//           next: () => {
//             this.router.navigateByUrl('/cidades');
//           },
//           error: (err) => {
//             console.log('Erro ao Excluir' + JSON.stringify(err));
//           },
//         });
//       }
//     }
//   }
// }

import {NgForOf, NgIf} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {MatExpansionModule} from "@angular/material/expansion";

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, NgForOf, MatSelectModule, MatExpansionModule],
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {

  formGroup: FormGroup;
  estados: Estado[] = [];

  constructor(private formBuilder: FormBuilder,
              private cidadeService: CidadeService,
              private estadoService: EstadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      estado: [null]
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
    const estado = this.estados
      .find(estado => estado.id === (estado?.id || null));


    this.formGroup = this.formBuilder.group({
      id: [(cidade && cidade.id) ? cidade.id : null],
      nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      estado: [estado]
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
