import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagamento } from 'src/app/interfaces/Pagamento';
import { PagamentoService } from 'src/app/services/pagamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoConfirmacaoComponent {
  pagamentos: Pagamento[] = [];

  constructor(private pagamentoService: PagamentoService, private router: Router) { }

  ngOnInit(): void {
    this.getPagamentos();
  }

  getPagamentos(): void {
    this.pagamentoService.getPagamentos().subscribe((pagamentos: Pagamento[]) => {
      this.pagamentos = pagamentos;
    });
  }
}
