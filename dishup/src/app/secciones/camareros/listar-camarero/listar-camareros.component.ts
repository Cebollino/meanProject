import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Camarero } from '../camarero.modelo';
import { ServicioCamarero } from '../camarero.service';

@Component({
  selector: 'app-listar-camareros',
  templateUrl: './listar-camareros.component.html'
})

export class ListarCamareroComponent implements OnInit, OnDestroy {
  camareros: Camarero[] = [];
  private camarerosSub: Subscription;
  public dataTable;
  public dtOptions: any = {};
  constructor(public servicioCamarero: ServicioCamarero, private chRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getCamareros();
  }

  getCamareros() {
    this.servicioCamarero.getCamareros();
    this.camarerosSub = this.servicioCamarero.getCamarerosActualizadosListener()
      .subscribe((camareros: Camarero[]) => {
          this.camareros = camareros;

          this.chRef.detectChanges();

          const table = $('#camarero-table');
          this.dtOptions = {
            dom: 'Bfrtip',
            // Configure the buttons
            buttons: [
              'copy',
              'print',
              'csv',
              'excel',
              'pdf'
            ]
          };

          this.dataTable = table.DataTable(this.dtOptions);
      });
  }

  ngOnDestroy() {
      this.camarerosSub.unsubscribe();
  }
}
