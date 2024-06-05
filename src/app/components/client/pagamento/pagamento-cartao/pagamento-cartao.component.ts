import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoService } from 'src/app/services/pagamento.service';
import { Router } from '@angular/router';
import { PagamentoDTO } from 'src/app/interfaces/PagamentoDTO';

@Component({
  selector: 'app-pagamento-cartao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamento-cartao.component.html',
  styleUrls: ['./pagamento-cartao.component.css']
})
export class PagamentoCartaoComponent {
  constructor(private pagamentoService: PagamentoService, private router: Router) { }

  realizarPagamento(): void {
    // Obter o ID do pedido do localStorage
    const pedidoJson = localStorage.getItem('pedido');
    
    if (!pedidoJson) {
      console.error('Pedido não encontrado no localStorage.');
      return;
    }

    // Converter o JSON para objeto
    const pedido = JSON.parse(pedidoJson);
    console.log(pedido);
    // Criar o objeto de pagamento com o método e ID do pedido
    const pagamentoData: PagamentoDTO = {
      metodo: 'CARTAO_DE_CREDITO', // ou qualquer outro método desejado
      idPedido: pedido.pedidoResponseDTO.id
    };

    // Enviar os dados para a rota /pagamentos
    this.pagamentoService.realizarPagamento(pagamentoData).subscribe(() => {
      // Redirecionar para outra rota após o pagamento ser realizado com sucesso
      window.alert("Pagamento Realizado!")
      this.router.navigate(['/']);
    }, error => {
      console.error('Erro ao realizar o pagamento:', error);
      // Tratar erros ou mostrar uma mensagem de erro para o usuário
    });
  }
}
