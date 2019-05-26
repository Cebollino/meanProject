import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgForm, ControlContainer } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Pedido } from '../pedidos.modelo';
import { ServicioPedido } from '../pedidos.service';
import { Camarero } from '../../camareros/camarero.modelo';
import { ServicioCamarero } from '../../camareros/camarero.service';
import { Mesa } from '../../mesas/mesa.modelo';
import { ServicioMesa } from '../../mesas/mesa.service';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { ServicioMenu } from '../../menu/menus.service';
import { Menu } from '../../menu/menus.modelo';

@Component({
    selector: 'app-crear-pedidos',
    templateUrl: './crear-pedidos.component.html',
})

export class CrearPedidoComponent implements OnInit, OnDestroy {
  private _id: string;
  private mesaSub: Subscription;
  private menusSub: Subscription;
  public mode = 'create';
  public pedido: Pedido;
  public camareros: Camarero[] = [];
  public mesas: Mesa[] = [];
  public menus: Menu[] = [];
  public sesionExiste = true;

  constructor(
    public servicioPedido: ServicioPedido,
    public servicioMesa: ServicioMesa,
    public servicioMenu: ServicioMenu,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.getMesas();
      this.getMenus();
      if (paramMap.has('id')) {
        this.mode = 'editar';
        this._id = paramMap.get('id');
        this.servicioPedido.getPedido(this._id).subscribe(pedidoData => {
          this.pedido = {
            _id: pedidoData._id,
            cdg_pedido: pedidoData.cdg_pedido,
            num_mesa: pedidoData.num_mesa,
            id_sesion: pedidoData.id_sesion,
            id_camarero: pedidoData.id_camarero,
            cdg_menu: pedidoData.cdg_menu,
            precio_menu: pedidoData.precio_menu
          };
          this.mesas.forEach(element => {
            console.log(this.pedido.id_sesion);
            if (element.id_sesion === this.pedido.id_sesion) {
              this.sesionExiste = false;
            }
          });
          console.log(this.sesionExiste);
          // this.sesionExiste = this.mesas.indexOf("") > -1;
        });
      } else {
        this.mode = 'create';
        this._id = null;
      }
    });
  }

  onGuardarPedido(form: NgForm) {
    console.log('hasta aqui llego');

    if (form.invalid) {
      return;
    }
    const pedido: Pedido = {
      _id: null,
      cdg_pedido: null,
      num_mesa: null,
      id_sesion: form.value.id_sesion,
      id_camarero: null,
      cdg_menu: form.value.cdg_menu,
      precio_menu: null
    };

    console.log(form.value);
    if (this.mode === 'create') {
      this.servicioPedido.addPedido(pedido);
    } else {
      console.log(pedido);
      this.servicioPedido.actualizarPedido(this._id, pedido);
    }
    form.resetForm();
  }

  getMesas() {
    this.servicioMesa.getMesas();
    this.mesaSub = this.servicioMesa.getMesasActualizadasListener()
      .subscribe((mesas: Mesa[]) => {
        console.log(mesas);
        this.mesas = mesas.filter(mesa => mesa.id_sesion !== 'NO SESION');
        // this.mesas = mesas;
      });
  }

  getMenus() {
    this.servicioMenu.getMenus();
    this.menusSub = this.servicioMenu.getmenusActualizadosListener()
      .subscribe((menus: Menu[]) => {
          this.menus = menus;
      });
  }

  onDelete(_id: string) {
    this.servicioPedido.eliminarPedido(_id);
  }

  ngOnDestroy() {
    this.mesaSub.unsubscribe();
    this.menusSub.unsubscribe();
  }
}
