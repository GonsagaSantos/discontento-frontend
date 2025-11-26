import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoInterface, PedidoGravadoInterface } from '../interfaces/pedido.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080';

  constructor( private http: HttpClient ) {}

  public getPedidosById(id: number): Observable<PedidoGravadoInterface[]> {
    return this.http.get<PedidoGravadoInterface[]>(`${this.apiUrl}/api/pedido/user/${id}`);
  }

  public finalizarPedido(novoPedido: PedidoInterface): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/pedido/`, novoPedido, { responseType: 'text' as 'json' });
  }

  public confirmarPedidoPorHash(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/api/cliente/efetivar/${id}`);
  }
}
