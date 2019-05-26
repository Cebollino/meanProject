import { Component, OnInit, OnDestroy } from '@angular/core';

import { Mesa } from '../mesa.modelo';
import { NgForm, ControlContainer } from '@angular/forms';
import { ServicioMesa } from '../mesa.service';
import { Camarero } from '../../camareros/camarero.modelo';
import { Subscription } from 'rxjs';

import { ServicioCamarero } from '../../camareros/camarero.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-crear-mesa',
    templateUrl: './crear-mesa.component.html',
})

export class CrearMesaComponent implements OnInit, OnDestroy {
  public camareros: Camarero[] = [];
  public mode = 'create';
  public mesa: Mesa;
  public camareroExiste = true;
  private _id: string;
  private camareroSub: Subscription;

  constructor(public servicioMesa: ServicioMesa, public servicioCamarero: ServicioCamarero, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log('dsdasdssssss');
      console.log(paramMap);
      if (paramMap.has('id')) {
        this.mode = 'editar';
        this._id = paramMap.get('id');
        this.servicioMesa.getMesa(this._id).subscribe(mesaData => {
          this.mesa = {
            _id: mesaData._id,
            num_mesa: mesaData.num_mesa,
            id_sesion: mesaData.id_sesion,
            id_camarero: mesaData.id_camarero,
            estado: mesaData.estado,
          };
          this.camareros.forEach(element => {
            if (element._id === this.mesa.id_camarero) {
              this.camareroExiste = false;
            }
          });
        });
      } else {
        this.mode = 'create';
        this._id = null;
      }
    });
    this.getCamareros();
  }

  onGuardarMesa(form: NgForm) {
    console.log('hasta aqui llego');

    if (form.invalid) {
      return;
    }
    const mesa: Mesa = {
      _id: null,
      num_mesa: form.value.num_mesa,
      id_sesion: null,
      id_camarero: form.value.id_camarero,
      estado: form.value.estado,
    };

    console.log(form.value);
    if (this.mode === 'create') {
      this.servicioMesa.addMesa(mesa);
    } else {
      console.log(mesa);
      this.servicioMesa.actualizarMesa(this._id, mesa);
    }
    form.resetForm();
  }

  getCamareros() {
    this.servicioCamarero.getCamareros();
    this.camareroSub = this.servicioCamarero.getCamarerosActualizadosListener()
      .subscribe((camareros: Camarero[]) => {
          this.camareros = camareros;
      });
  }

  onDelete(_id: string) {
    this.servicioMesa.eliminarMesa(_id);
  }

  ngOnDestroy() {
    this.camareroSub.unsubscribe();
  }
}
