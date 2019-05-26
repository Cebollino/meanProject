import { Component, OnInit, OnDestroy } from '@angular/core';

import { Menu } from '../menus.modelo';
import { NgForm } from '@angular/forms';
import { ServicioMenu } from '../menus.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';

@Component({
    selector: 'app-crear-menus',
    templateUrl: './crear-menus.component.html',
})

export class CrearMenuComponent {
  private _id: string;
  public mode = 'create';
  public menu: Menu;

  constructor(public servicioMenu: ServicioMenu,  public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap);
      if (paramMap.has('id')){
        this.mode = 'editar';
        this._id = paramMap.get('id');
        this.servicioMenu.getMenu(this._id).subscribe(menuData => {
          this.menu = {
            _id: menuData._id,
            cdg_menu: null,
            nombre: menuData.nombre,
            precio: menuData.precio,
            descripcion: menuData.descripcion,
            tipo: menuData.tipo,
          };
        });
      } else {
        this.mode = 'create';
        this._id = null;
      }
    });
  }

  onGuardarMenu(form: NgForm) {
    console.log('hasta aqui llego');

    if (form.invalid) {
      return;
    }

    console.log(form.value);
    const menu: Menu = {
      _id: null,
      cdg_menu: null,
      nombre: form.value.nombre,
      precio: form.value.precio,
      descripcion: form.value.descripcion,
      tipo: form.value.tipo
    };

    if (this.mode === 'create') {
      this.servicioMenu.addMenu(menu);
      form.resetForm();
    } else {
      this.servicioMenu.actualizarMenu(this._id, menu);
    }
  }

  onDelete(_id: string) {
    this.servicioMenu.eliminarMenu(_id);
  }
}
