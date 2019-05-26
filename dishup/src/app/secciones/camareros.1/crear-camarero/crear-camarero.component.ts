import { Component, OnInit, OnDestroy } from '@angular/core';

import { Camarero } from '../camarero.modelo';
import { NgForm } from '@angular/forms';
import { ServicioCamarero } from '../camarero.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-crear-camarero',
    templateUrl: './crear-camarero.component.html',
})

export class CrearCamareroComponent {
  private _id: string;
  public mode = 'create';
  public camarero: Camarero;

  constructor(public servicioCamarero: ServicioCamarero,  public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap)
      if (paramMap.has('id')){
        this.mode = 'editar';
        this._id = paramMap.get('id');
        this.servicioCamarero.getCamarero(this._id).subscribe(camareroData => {
          this.camarero = {
            _id: camareroData._id,
            nombre: camareroData.nombre,
            apellido: camareroData.apellido,
            tlfn: camareroData.tlfn,
            email: camareroData.email,
          }
        });
      } else {
        this.mode = 'create';
        this._id = null;
      }
    });
  }

  onGuardarCamarero(form: NgForm) {
    console.log('hasta aqui llego');

    if (form.invalid) {
      return;
    }

    console.log(form.value);
    const camarero: Camarero = {
      _id: null,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      tlfn: form.value.tlfn,
      email: form.value.email
    };
    if (this.mode === 'create') {
      this.servicioCamarero.addCamarero(camarero);
    } else {
      this.servicioCamarero.actualizarCamarero(this._id, camarero)
    }
  }

  onDelete(_id: string) {
    this.servicioCamarero.eliminarCamarero(_id);
  }
}
