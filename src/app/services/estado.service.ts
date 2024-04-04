import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Estado} from "../interfaces/Estado";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private apiUrl = 'http://localhost:8080/estados';

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.apiUrl);
  }
}
