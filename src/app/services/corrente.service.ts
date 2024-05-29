import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Colecao} from "../interfaces/Colecao";
import {Corrente} from "../interfaces/Corrente";

@Injectable({
  providedIn: 'root'
})
export class CorrenteService {

  private apiUrl = 'http://localhost:8080/correntes';

  constructor(private http: HttpClient) { }

  getCorrentes(): Observable<Corrente[]> {
    return this.http.get<Corrente[]>(this.apiUrl);
  }

  insert(corrente: Partial<Corrente>): Observable<any> {
    return this.http.post<Corrente>(`${this.apiUrl}`, corrente);
  }
}
