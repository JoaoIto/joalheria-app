import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado} from "../interfaces/Estado";
import {Cidade} from "../interfaces/Cidade";

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private apiUrl = 'http://localhost:8080/cidades';

  constructor(private http: HttpClient) { }

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.apiUrl);
  }

  findById(id: string): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.apiUrl}/${id}`);
  }

  insert(municipio: Cidade): Observable<Cidade> {
    const data = {
      nome: municipio.nome,
      idEstado: municipio.estado.id
    }
    return this.http.post<Cidade>(this.apiUrl, data);
  }
  update(cidade: Cidade): Observable<Cidade> {
    const data = {
      nome: cidade.nome,
      idEstado: cidade.estado.id
    }
    return this.http.put<Cidade>(`${this.apiUrl}/${cidade.id}`, data);
  }

  delete(cidade: Cidade): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${cidade.id}`);
  }

}
