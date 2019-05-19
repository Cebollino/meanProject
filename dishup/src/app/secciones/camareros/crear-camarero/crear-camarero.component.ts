import { Component } from '@angular/core';

import { Camarero } from '../camarero.modelo';
import { NgForm } from '@angular/forms';
import { ServicioCamarero } from '../camarero.service';

@Component({
    selector: 'app-crear-camarero',
    templateUrl: './crear-camarero.component.html',
})

export class CrearCamareroComponent {
  constructor(public servicioCamarero: ServicioCamarero) {}

  onAddCamarero(form: NgForm) {
    console.log("hasta aqui llego")

    if (form.invalid) {
      return
    }

    console.log(form.value)
    const post: Camarero = {
      id: null,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      tlfn: form.value.tlfn,
      email: form.value.email
    }
    this.servicioCamarero.addCamarero(post);
  }
}
