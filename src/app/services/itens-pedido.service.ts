import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemPedido } from '../interfaces/ItemPedido';

@Injectable({
  providedIn: 'root'
})
export class ItemPedidoService {

  private apiUrl = 'http://localhost:8080/itens-pedido';

  constructor(private http: HttpClient) { }

  postItemPedido(itemPedido: ItemPedido): Observable<ItemPedido[]> {
    return this.http.post<ItemPedido[]>(`${this.apiUrl}`, itemPedido);
  }
}