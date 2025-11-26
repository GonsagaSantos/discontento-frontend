import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, Usuario, UsuarioGravar, EmailRequest } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class Dados {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/api/cliente`);
  }

  public salvarUsuario(usuario: UsuarioGravar): Observable<UsuarioGravar> {
    return this.http.post<UsuarioGravar>(`${this.apiUrl}/api/cliente`, usuario);
  }

  public confirmarCadastroUsuario(id: string): Observable<UsuarioGravar> {
    return this.http.get<UsuarioGravar>(`${this.apiUrl}/api/cliente/efetivar/${id}`);
  }

  public loginUsuario(usuario: Login): Observable<UsuarioGravar> {
    return this.http.post<UsuarioGravar>(`${this.apiUrl}/api/cliente/login`, usuario);
  }

  public solicitarRedefinicaoSenha(email: string): Observable<any> {
    const payload: EmailRequest = { email: email }
    return this.http.post<UsuarioGravar>(`${this.apiUrl}/api/cliente/redefinir-senha/`, payload);
  }

  public enviarNovaSenha(token: string, novaSenha: string): Observable<any> {
    const payload = { senha: novaSenha }
    return this.http.post<UsuarioGravar>(`${this.apiUrl}/api/cliente/redefinir-senha/${token}`, payload);
  }
}