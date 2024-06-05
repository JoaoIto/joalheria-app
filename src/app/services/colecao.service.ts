import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cidade} from "../interfaces/Cidade";
import {Colecao} from "../interfaces/Colecao";

@Injectable({
  providedIn: 'root'
})
export class ColecaoService {

  private apiUrl = 'http://localhost:8080/colecao';

  constructor(private http: HttpClient) { }

  getColecoes(): Observable<Colecao[]> {
    return this.http.get<Colecao[]>(this.apiUrl);
  }

  findById(id: string): Observable<Colecao> {
    return this.http.get<Colecao>(`${this.apiUrl}/${id}`);
  }

  insert(colecao: Colecao): Observable<Colecao> {
    const data = {
      nome: colecao.nome,
      descricao: colecao.descricao,
      idPessoa: colecao.pessoa.id
    }
    return this.http.post<Colecao>(this.apiUrl, data);
  }
  /* update(colecao: Colecao): Observable<Colecao> {
    const data = {
      nome: colecao.nome,
      descricao: colecao.descricao,
      idPessoa: colecao.pessoa.id
    }
    return this.http.put<Colecao>(`${this.apiUrl}/${colecao.id}`, data);
  } */

 /*  delete(colecao: Colecao): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${colecao.id}`);
  } */

}
