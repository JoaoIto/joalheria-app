import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemCarrinho } from '../interfaces/ItemCarrinho';
import { Carrinho } from '../interfaces/Carrinho';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) { }

  getCarrinho(): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(`${this.apiUrl}/usuarioLogado`);
  }
}
