import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { Usuario } from '../interfaces/Usuario';
import { CadastroDTO } from '../interfaces/Cadastro';
import { Perfil } from '../interfaces/Perfil';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';
  private usuarioLogadoKey = 'usuario_logado';
  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient, 
              private localStorageService: LocalStorageService, 
              private jwtHelper: JwtHelperService) {

    this.initUsuarioLogado();

  }

  private initUsuarioLogado() {
    const usuario = localStorage.getItem(this.usuarioLogadoKey);
    if (usuario) {
      const usuarioLogado = JSON.parse(usuario);

      this.setUsuarioLogado(usuarioLogado);
      this.usuarioLogadoSubject.next(usuarioLogado);
    }
  }

  getUsuarioLogadoHttp(): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.baseURL}/usuarioLogado`);
  }

  cadastro(cadastroData: CadastroDTO): Observable<any> {
    return this.http.post(`${this.baseURL}/cadastro`, cadastroData, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('Authorization') ?? '';
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = res.body;
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
          }
        }
      })
    );
  }

  login(email: string, senha: string): Observable<any> {
    const params = {
      email: email,
      senha: senha,
    }

    //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.http.post(`${this.baseURL}`, params, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('Authorization') ?? '';
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = res.body;
          console.log(usuarioLogado);
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
          }
        }
      })
    );
  }

  

  alterarSenha(email: string, novaSenha: string): Observable<any> {
    const params = { novaSenha: novaSenha }; // Ajuste para enviar novaSenha como 'novaSenha'
    return this.http.put(`${this.baseURL}/trocarSenha?email=${email}`, null, { params }); // Envie email como QueryParam
  }

  setUsuarioLogado(usuario: Usuario): void {
    this.localStorageService.setItem(this.usuarioLogadoKey, usuario);
  }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  getUsuarioLogado(): Perfil {
    return this.localStorageService.getItem('usuario_logado');
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  removeUsuarioLogado(): void {
    this.localStorageService.removeItem(this.usuarioLogadoKey);
    this.usuarioLogadoSubject.next(null);
  }

  // isTokenExpired(): boolean {
  //   const token = this.getToken();
  //   // Verifica se o token é nulo ou está expirado
  //   return !token || this.jwtHelper.isTokenExpired(token);
  //   // npm install @auth0/angular-jwt
  // }

  isTokenExpired(): boolean {
    const token = this.getToken();
    console.error('token: ' + token);
    if (!token) {
      return true;
    }
    
    try {
      console.error('jwtHelper: ' + this.jwtHelper.isTokenExpired(token));
      return this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return true; 
    }
  }

}