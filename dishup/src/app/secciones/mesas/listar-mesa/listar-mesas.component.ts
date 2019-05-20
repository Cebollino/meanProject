import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private camareroSub: Subscription;

  constructor(public servicioMesa: ServicioMesa, public servicioCamarero: ServicioCamarero) {}

  ngOnInit() {
    this.getMesas();
    this.getCamareros();
  }

  getMesas() {
    this.servicioMesa.getMesas();
    this.mesasSub = this.servicioMesa.getMesasActualizadasListener()
      .subscribe((mesas: Mesa[]) => {
          this.mesas = mesas;
      });
  }

  getCamareros() {
    this.servicioCamarero.getCamareros();
    this.camareroSub = this.servicioCamarero.getCamarerosActualizadosListener()
      .subscribe((camareros: Camarero[]) => {
          this.camareros = camareros;
      });
  }
  ngOnDestroy() {
      this.mesasSub.unsubscribe();
  }
}
