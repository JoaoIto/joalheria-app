import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Corrente} from "../interfaces/Corrente";
import {Anel} from "../interfaces/Anel";

@Injectable({
  providedIn: 'root'
})
export class AnelService {

  private apiUrl = 'http://localhost:8080/aneis';

  constructor(private http: HttpClient) { }

  getAneis(): Observable<Anel[]> {
    return this.http.get<Anel[]>(this.apiUrl);
  }

  insert(anel: Partial<Anel>): Observable<any> {
    return this.http.post<Anel>(`${this.apiUrl}`, anel);
  }
}
