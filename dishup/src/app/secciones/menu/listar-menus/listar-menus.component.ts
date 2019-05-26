import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from '../menus.modelo';
import { ServicioMenu } from '../menus.service';

@Component({
  selector: 'app-listar-menus',
  templateUrl: './listar-menus.component.html'
})

export class ListarMenuComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  private menusSub: Subscription;

  constructor(public servicioMenu: ServicioMenu) {}

  ngOnInit() {
      this.getmenus();
  }

  getmenus() {
    this.servicioMenu.getMenus();
    this.menusSub = this.servicioMenu.getmenusActualizadosListener()
      .subscribe((menus: Menu[]) => {
          this.menus = menus;
      });
  }

  ngOnDestroy() {
      this.menusSub.unsubscribe();
  }
}
