import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pagamento } from '../interfaces/Pagamento';

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
   insert(joia: Partial<Pagamento>): Observable<any> {
    return this.http.post<Pagamento>(`${this.apiUrl}`, joia);
  }
}
