import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component'
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component'

import { CrearCamareroComponent } from './secciones/camareros/crear-camarero/crear-camarero.component';
import { ListarCamareroComponent } from './secciones/camareros/listar-camarero/listar-camareros.component';

import { CrearMesaComponent } from './secciones/mesas/crear-mesa/crear-mesa.component';
import { ListarMesaComponent } from './secciones/mesas/listar-mesa/listar-mesas.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TabsComponent,

    CrearCamareroComponent,
    ListarCamareroComponent,

    CrearMesaComponent,
    ListarMesaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
