import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: '/tabs.component.html'
})

export class TabsComponent {
  tabs: string[] = ['Camareros', 'Mesas', 'Menu', 'Pedidos'];
  tabSelecionada = this.tabs[0];
}
