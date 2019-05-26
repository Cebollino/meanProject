import { Pedido } from './pedidos.modelo';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ServicioPedido {
  private pedidos: Pedido[] = [];
  private pedidoActualizado = new Subject<Pedido[]>();

  constructor(private http: HttpClient) {}

  getPedidos() {
    this.http.get<{message: string, pedidos: any}>('http://localhost:3000/api/pedidos/')
    .pipe(map((pedidoData) => {
      return pedidoData.pedidos.map(pedido => {
        return {
          _id: pedido._id,
          cdg_pedido: pedido.cdg_pedido,
          num_mesa: pedido.num_mesa,
          id_sesion: pedido.id_sesion,
          id_camarero: pedido.id_camarero,
          cdg_menu: pedido.cdg_menu,
          precio_menu: pedido.precio_menu
        };
      });
    }))
    .subscribe((pedidoTransformada) => {
      console.log(pedidoTransformada);
      this.pedidos = pedidoTransformada;
      this.pedidoActualizado.next([...this.pedidos]);
    });
  }

  getPedido(id: string) {
    return this.http.get<
    {
      _id: string,
      cdg_pedido: string,
      num_mesa: number,
      id_sesion: string,
      id_camarero: string,
      cdg_menu: string,
      precio_menu: number
    }>('http://localhost:3000/api/pedidos/' + id);
  }

  getPedidosActualizadasListener() {
    return this.pedidoActualizado.asObservable();
  }

  addPedido(pedido: Pedido) {
    console.log(pedido);
    this.http.post<{message: string}>('http://localhost:3000/api/pedidos/', pedido)
    .subscribe((responseData) => {
        console.log(responseData);
        this.pedidos.push(pedido);
        console.log(pedido);
        this.pedidoActualizado.next([...this.pedidos]);
    });
  }

  actualizarPedido(_id: string, pedido: Pedido) {
    const pedidoEdit: Pedido = {
      _id,
      cdg_pedido: pedido.cdg_pedido,
      num_mesa: pedido.num_mesa,
      id_sesion: pedido.id_sesion,
      id_camarero: pedido.id_camarero,
      cdg_menu: pedido.cdg_menu,
      precio_menu: pedido.precio_menu
    };
    console.log(pedido);
    this.http.put('http://localhost:3000/api/pedidos/' + _id, pedidoEdit)
    .subscribe(response => {
      const pedidosActializadas = [...this.pedidos];
      const indiceActualizado = pedidosActializadas.findIndex(m => m._id === pedidoEdit._id);
      pedidosActializadas[indiceActualizado] = pedidoEdit;
      this.pedidos = pedidosActializadas;
      this.pedidoActualizado.next([...this.pedidos]);
    });
  }

  eliminarPedido(_id: string) {
    this.http.delete('http://localhost:3000/api/pedidos/' + _id)
    .subscribe(() => {
      const pedidosActualizadas = this.pedidos.filter(pedido => pedido._id !== _id);
      this.pedidos = pedidosActualizadas;
      this.pedidoActualizado.next([...this.pedidos]);
    });
  }
}
