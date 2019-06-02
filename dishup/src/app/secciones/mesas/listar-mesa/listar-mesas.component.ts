import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mesa } from '../mesa.modelo';
import { ServicioMesa } from '../mesa.service';

import { Camarero } from '../../camareros/camarero.modelo';
import { ServicioCamarero } from '../../camareros/camarero.service';
@Component({
  selector: 'app-listar-mesas',
  templateUrl: './listar-mesas.component.html'
})

export class ListarMesaComponent implements OnInit, OnDestroy {
  mesas: Mesa[] = [];
  camareros: Camarero[] = [];

  private mesasSub: Subscription;
  private dataTable;

  constructor(public servicioMesa: ServicioMesa, public servicioCamarero: ServicioCamarero, private chRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getMesas();
  }

  getMesas() {
    this.servicioMesa.getMesas();
    this.mesasSub = this.servicioMesa.getMesasActualizadasListener()
      .subscribe((mesas: Mesa[]) => {
          this.mesas = mesas;

          this.chRef.detectChanges();

          const table = $('#mesa-table');
          this.dataTable = table.DataTable();
      });
  }

  ngOnDestroy() {
      this.mesasSub.unsubscribe();
  }
}
