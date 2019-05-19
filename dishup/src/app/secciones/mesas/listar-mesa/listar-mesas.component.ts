import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mesa } from '../mesa.modelo';
import { ServicioMesa } from '../mesa.service';

@Component({
  selector: 'app-listar-mesas',
  templateUrl: './listar-mesas.component.html'
})

export class ListarMesaComponent implements OnInit, OnDestroy {
  mesas: Mesa[] = [];
  private mesasSub: Subscription;

  constructor(public servicioMesa: ServicioMesa) {}

  ngOnInit() {
      this.servicioMesa.getMesas();
      this.mesasSub = this.servicioMesa.getMesasActualizadasListener()
      .subscribe((mesas: Mesa[]) => {
          this.mesas = mesas;
      });

  }

  ngOnDestroy() {
      this.mesasSub.unsubscribe();
  }
}
