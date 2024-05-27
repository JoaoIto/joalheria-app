import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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
  // Método para obter uma joia pelo ID
  getJoiaById(id: number): Observable<Joia> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Joia>(url);
  }

  update(joia: Joia): Observable<Joia> {
    const url = `${this.apiUrl}/${joia.id}`; // URL da API para atualização da joia com o ID fornecido
    return this.http.put<Joia>(url, joia)
      .pipe(
        catchError(this.handleError) // Tratamento de erro
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ao processar a requisição. Por favor, tente novamente mais tarde.'); // Retornar um erro observável
  }
  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Joia>(url);
  }
  insert(joia: Partial<Joia>): Observable<any> {
    return this.http.post<Joia>(`${this.apiUrl}`, joia);
  }
}
