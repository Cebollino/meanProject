import { Component, OnInit } from '@angular/core';

import { Mesa } from '../mesa.modelo';
import { NgForm } from '@angular/forms';
import { ServicioMesa } from '../mesa.service';
import { Camarero } from '../../camareros/camarero.modelo';
import { Subscription } from 'rxjs';

import { ServicioCamarero } from '../../camareros/camarero.service';

@Component({
    selector: 'app-crear-mesa',
    templateUrl: './crear-mesa.component.html',
})

export class CrearMesaComponent {
  camareros: Camarero[] = [];

  private camareroSub: Subscription;

  constructor(public servicioMesa: ServicioMesa, public servicioCamarero: ServicioCamarero) {}

  ngOnInit() {
    this.getCamareros()
  }

  onAddMesa(form: NgForm) {
    console.log('hasta aqui llego');

    if (form.invalid) {
      return;
    }

    console.log(form.value);
    const post: Mesa = {
      id: null,
      id_sesion: null,
      id_camarero: form.value.id_camarero,
      estado: form.value.estado,
    };
    this.servicioMesa.addMesa(post);
  }

  getCamareros() {
    this.servicioCamarero.getCamareros();
    this.camareroSub = this.servicioCamarero.getCamarerosActualizadosListener()
      .subscribe((camareros: Camarero[]) => {
          this.camareros = camareros;
      });
  }
}
