import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  idCliente: number;
  nome: string;
  email: string;
  documento: string;
  ativo: number;
}

export interface UsuarioGravar {
  nome: string;
  email: string;
  documento: string;
  senha: string;
  ativo: number;
}

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

}