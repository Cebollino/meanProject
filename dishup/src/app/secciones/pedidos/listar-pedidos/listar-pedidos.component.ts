import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from '../pedidos.modelo';
import { ServicioPedido } from '../pedidos.service';

import { Camarero } from '../../camareros/camarero.modelo';
import { ServicioCamarero } from '../../camareros/camarero.service';

import { Mesa } from '../../mesas/mesa.modelo';
import { ServicioMesa } from '../../mesas/mesa.service';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html'
})

export class ListarPedidoComponent implements OnInit, OnDestroy {
  pedidos: Pedido[] = [];
  mesas: Mesa[] = [];
  camareros: Camarero[] = [];

  private pedidosSub: Subscription;
  private dataTable;
  private dtOptions: any;
  constructor(public servicioPedido: ServicioPedido, private chRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos() {
    this.servicioPedido.getPedidos();
    this.pedidosSub = this.servicioPedido.getPedidosActualizadasListener()
      .subscribe((pedidos: Pedido[]) => {
        console.log(pedidos);
        this.pedidos = pedidos;

        this.chRef.detectChanges();

        const table = $('#pedidos-table');
        this.dtOptions = {
          dom: 'Bfrtip',
          // Configure the buttons
          buttons: [
            'copy',
            'print',
            'csv',
            'pdf',
            'excel',
          ]
        };
        this.dataTable = table.DataTable(this.dtOptions);
      });
  }
  ngOnDestroy() {
      this.pedidosSub.unsubscribe();
  }
}
