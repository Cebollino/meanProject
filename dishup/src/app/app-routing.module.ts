import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';

import { ListarCamareroComponent } from './secciones/camareros/listar-camarero/listar-camareros.component';
import { CrearCamareroComponent } from './secciones/camareros/crear-camarero/crear-camarero.component';

import { ListarMesaComponent } from './secciones/mesas/listar-mesa/listar-mesas.component';
import { CrearMesaComponent } from './secciones/mesas/crear-mesa/crear-mesa.component';

import { ListarMenuComponent } from './secciones/menu/listar-menus/listar-menus.component';
import { CrearMenuComponent } from './secciones/menu/crear-menus/crear-menus.component';

import { ListarPedidoComponent } from './secciones/pedidos/listar-pedidos/listar-pedidos.component';
import { CrearPedidoComponent } from './secciones/pedidos/crear-pedidos/crear-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'listCamareros',
    component: ListarCamareroComponent
  },
  {
    path: 'editarCamarero/:id',
    component: CrearCamareroComponent
  },
  {
    path: 'addCamarero',
    component: CrearCamareroComponent
  },
  {
    path: 'listMesas',
    component: ListarMesaComponent
  },
  {
    path: 'editarMesa/:id',
    component: CrearMesaComponent
  },
  {
    path: 'addMesa',
    component: CrearMesaComponent
  },
  {
    path: 'listMenu',
    component: ListarMenuComponent
  },
  {
    path: 'editarMenu/:id',
    component: CrearMenuComponent
  },
  {
    path: 'addMenu',
    component: CrearMenuComponent
  },
  {
    path: 'listPedidos',
    component: ListarPedidoComponent
  },
  {
    path: 'editarPedido/:id',
    component: CrearPedidoComponent
  },
  {
    path: 'addPedido',
    component: CrearPedidoComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
