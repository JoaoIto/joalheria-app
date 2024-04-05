import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Estado} from "../interfaces/Estado";
import {Pessoa} from "../interfaces/Pessoa";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }
}
