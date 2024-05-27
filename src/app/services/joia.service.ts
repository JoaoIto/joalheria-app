import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joia } from '../interfaces/Joia';

@Injectable({
  providedIn: 'root',
})
export class JoiaService {
  private apiUrl = 'http://localhost:8080/joias';

  constructor(private http: HttpClient) {}

  getJoias(): Observable<Joia[]> {
    return this.http.get<Joia[]>(this.apiUrl);
  }
  insert(joia: Joia): Observable<any> {
    return this.http.post<Joia>(`${this.apiUrl}`, joia);
  }
}
