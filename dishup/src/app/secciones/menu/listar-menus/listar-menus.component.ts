import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  private dataTable;

  constructor(public servicioMenu: ServicioMenu, private chRef: ChangeDetectorRef) {}

  ngOnInit() {
      this.getmenus();
  }

  getmenus() {
    this.servicioMenu.getMenus();
    this.menusSub = this.servicioMenu.getmenusActualizadosListener()
      .subscribe((menus: Menu[]) => {
          this.menus = menus;

          this.chRef.detectChanges();

          const table = $('#menu-table');
          this.dataTable = table.DataTable();
      });
  }

  ngOnDestroy() {
      this.menusSub.unsubscribe();
  }
}
