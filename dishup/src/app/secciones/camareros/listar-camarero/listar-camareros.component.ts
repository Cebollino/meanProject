import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Camarero } from '../camarero.modelo';
import { ServicioCamarero } from '../camarero.service';

@Component({
  selector: 'app-listar-camareros',
  templateUrl: './listar-camareros.component.html'
})

export class ListarCamareroComponent implements OnInit, OnDestroy {
  camareros: Camarero[] = [];
  private camarerosSub: Subscription;

  constructor(public servicioCamarero: ServicioCamarero) {}

  ngOnInit() {
      this.getCamareros();
  }

  getCamareros() {
    this.servicioCamarero.getCamareros();
    this.camarerosSub = this.servicioCamarero.getCamarerosActualizadosListener()
      .subscribe((camareros: Camarero[]) => {
          this.camareros = camareros;
      });
  }

  ngOnDestroy() {
      this.camarerosSub.unsubscribe();
  }
}
