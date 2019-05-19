import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { CrearCamareroComponent } from './camareros/crear-camarero/crear-camarero.component';
import { ListarCamareroComponent } from './camareros/listar-camarero/listar-camareros.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrearCamareroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
