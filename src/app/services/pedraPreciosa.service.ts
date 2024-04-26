import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, catchError} from "rxjs";
import {Joia} from "../interfaces/Joia";
import {PedraPreciosa} from "../interfaces/PedraPreciosa";

@Injectable({
  providedIn: 'root'
})
export class PedraPreciosaService {

  private apiUrl = 'http://localhost:8080/pedrasPreciosas';

  constructor(private http: HttpClient) { }

  getPedrasPreciosas(): Observable<PedraPreciosa[]> {
    return this.http.get<PedraPreciosa[]>(this.apiUrl);
  }

  insert(pedraPreciosa: PedraPreciosa): Observable<any> {
    return this.http.post<PedraPreciosa>(`${this.apiUrl}`, pedraPreciosa)
  }
}
