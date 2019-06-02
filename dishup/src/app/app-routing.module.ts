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

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listCamareros',
    component: ListarCamareroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editarCamarero/:id',
    component: CrearCamareroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addCamarero',
    component: CrearCamareroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listMesas',
    component: ListarMesaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editarMesa/:id',
    component: CrearMesaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addMesa',
    component: CrearMesaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listMenu',
    component: ListarMenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editarMenu/:id',
    component: CrearMenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addMenu',
    component: CrearMenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listPedidos',
    component: ListarPedidoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editarPedido/:id',
    component: CrearPedidoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addPedido',
    component: CrearPedidoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
   component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})


export class AppRoutingModule {

}
