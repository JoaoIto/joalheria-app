import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pingente} from "../interfaces/Pingente";

@Injectable({
  providedIn: 'root'
})
export class PingenteService {

  private apiUrl = 'http://localhost:8080/pingente';

  constructor(private http: HttpClient) { }

  getPingentes(): Observable<Pingente[]> {
    return this.http.get<Pingente[]>(this.apiUrl);
  }
}
