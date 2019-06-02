import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';

import { CrearCamareroComponent } from './secciones/camareros/crear-camarero/crear-camarero.component';
import { ListarCamareroComponent } from './secciones/camareros/listar-camarero/listar-camareros.component';

import { CrearMesaComponent } from './secciones/mesas/crear-mesa/crear-mesa.component';
import { ListarMesaComponent } from './secciones/mesas/listar-mesa/listar-mesas.component';

import { CrearMenuComponent } from './secciones/menu/crear-menus/crear-menus.component';
import { ListarMenuComponent } from './secciones/menu/listar-menus/listar-menus.component';

import { CrearPedidoComponent } from './secciones/pedidos/crear-pedidos/crear-pedidos.component';
import { ListarPedidoComponent } from './secciones/pedidos/listar-pedidos/listar-pedidos.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TabsComponent,

    CrearCamareroComponent,
    ListarCamareroComponent,

    CrearMesaComponent,
    ListarMesaComponent,

    CrearMenuComponent,
    ListarMenuComponent,

    CrearPedidoComponent,
    ListarPedidoComponent,

    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
