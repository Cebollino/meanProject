import { Component } from '@angular/core';

import { Mesa } from '../mesa.modelo';
import { NgForm } from '@angular/forms';
import { ServicioMesa } from '../mesa.service';

@Component({
    selector: 'app-crear-mesa',
    templateUrl: './crear-mesa.component.html',
})

export class CrearMesaComponent {
  constructor(public servicioMesa: ServicioMesa) {}

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
}
