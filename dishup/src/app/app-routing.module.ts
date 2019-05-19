import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';
import { ListarCamareroComponent } from './secciones/camareros/listar-camarero/listar-camareros.component';
import { CrearCamareroComponent } from './secciones/camareros/crear-camarero/crear-camarero.component';
import { ListarMesaComponent } from './secciones/mesas/listar-mesa/listar-mesas.component'
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
    path: 'addCamarero',
    component: CrearCamareroComponent
  },
  {
    path: 'listMesas',
    component: ListarMesaComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
