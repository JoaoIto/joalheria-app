import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pagamento } from '../interfaces/Pagamento';
import { PagamentoDTO } from '../interfaces/PagamentoDTO';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  private apiUrl = 'http://localhost:8080/pagamentos';

  constructor(private http: HttpClient) {}

  getPagamentos(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.apiUrl);
  }
  // Método para obter uma joia pelo ID
  realizarPagamento(pagamento: Partial<PagamentoDTO>): Observable<any> {
    return this.http.post<PagamentoDTO>(`${this.apiUrl}`, pagamento);
  }
}
