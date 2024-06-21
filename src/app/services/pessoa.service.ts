import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Estado} from "../interfaces/Estado";
import {Pessoa} from "../interfaces/Pessoa";
import { Endereco } from '../interfaces/Endereco';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  addEndereco(pessoaId: number, endereco: Endereco): Observable<any> {
    return this.http.post(`${this.apiUrl}/pessoas/${pessoaId}/enderecos`, endereco);
  }
}
