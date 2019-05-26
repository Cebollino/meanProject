import { Menu } from './menus.modelo';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ServicioMenu {
  private menus: Menu[] = [];
  private menuActualizado = new Subject<Menu[]>();

  constructor(private http: HttpClient) {}

  getMenus() {
    this.http.get<{message: string, menus: any}>('http://localhost:3000/api/menus')
    .pipe(map((menuData) => {
      return menuData.menus.map(menu => {
        return {
          _id: menu._id,
          cdg_menu: menu.cdg_menu,
          nombre: menu.nombre,
          precio: menu.precio,
          descripcion: menu.descripcion,
          tipo: menu.tipo
        };
      });
    }))
    .subscribe((mesaTransformada) => {
      this.menus = mesaTransformada;
      this.menuActualizado.next([...this.menus]);
    });
  }

  getMenu(id: string) {
    return this.http.get<{_id: string,cdg_menu: string, nombre: string, precio: number, descripcion: string, tipo: string}>('http://localhost:3000/api/menus/' + id);
  }

  actualizarMenu(_id: string, menu: Menu) {
    const menuEdit: Menu = {
      _id: _id,
      cdg_menu: menu.cdg_menu,
      nombre: menu.nombre,
      precio: menu.precio,
      descripcion: menu.descripcion,
      tipo: menu.tipo
    };
    console.log(menu);
    this.http.put('http://localhost:3000/api/menus/' + _id, menuEdit)
    .subscribe(response => {
      const menuActualizado = [...this.menus];
      const indiceActualizado = menuActualizado.findIndex(m => m._id === menuEdit._id);
      menuActualizado[indiceActualizado] = menuEdit;
      this.menus = menuActualizado;
      this.menuActualizado.next([...this.menus]);
    });
  }

  getmenusActualizadosListener() {
    return this.menuActualizado.asObservable();
  }

  addMenu(menu: Menu) {
    console.log(menu)
    this.http.post<{message: string}>('http://localhost:3000/api/menus', menu)
    .subscribe((responseData) => {
        console.log(responseData);
        this.menus.push(menu);
        this.menuActualizado.next([...this.menus]);
    });
  }

  eliminarMenu(_id: string){
    this.http.delete('http://localhost:3000/api/menus/' + _id)
    .subscribe(() => {
      const menusActuliazados = this.menus.filter(mesa => mesa._id !== _id);
      this.menus = menusActuliazados;
      this.menuActualizado.next([...this.menus]);
    });
  }
}
