import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pulseira} from "../interfaces/Pulseira";

@Injectable({
  providedIn: 'root'
})
export class PulseiraService {

  private apiUrl = 'http://localhost:8080/pulseiras';

  constructor(private http: HttpClient) { }

  getPulseiras(): Observable<Pulseira[]> {
    return this.http.get<Pulseira[]>(this.apiUrl);
  }

  insert(pulseira: Partial<Pulseira>): Observable<any> {
    return this.http.post<Pulseira>(`${this.apiUrl}`, pulseira);
  }
}
