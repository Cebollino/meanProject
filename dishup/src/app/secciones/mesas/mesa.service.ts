import { Mesa } from './mesa.modelo';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ServicioMesa {
  private mesas: Mesa[] = [];
  private mesaActualizada = new Subject<Mesa[]>();

  constructor(private http: HttpClient) {}

  getMesas() {
    this.http.get<{message: string, mesas: any}>('http://localhost:3000/api/mesas/')
    .pipe(map((mesaData) => {
      return mesaData.mesas.map(mesa => {
        return {
          _id: mesa._id,
          num_mesa: mesa.num_mesa,
          id_sesion: mesa.id_sesion,
          id_camarero: mesa.id_camarero,
          estado: mesa.estado,
        };
      });
    }))
    .subscribe((mesaTransformada) => {
      console.log(mesaTransformada);
      this.mesas = mesaTransformada;
      this.mesaActualizada.next([...this.mesas]);
    });
  }

  getMesa(id: string) {
    return this.http.get<{_id: string, num_mesa: number, id_sesion: string, id_camarero: string, estado: string}>('http://localhost:3000/api/mesas/' + id);
  }

  getMesasActualizadasListener() {
    return this.mesaActualizada.asObservable();
  }

  addMesa(mesa: Mesa) {
    console.log(mesa);
    this.http.post<{message: string}>('http://localhost:3000/api/mesas/', mesa)
    .subscribe((responseData) => {
        console.log(responseData);
        this.mesas.push(mesa);
        console.log(mesa);
        this.mesaActualizada.next([...this.mesas]);
    });
  }

  actualizarMesa(_id: string, mesa: Mesa) {
    const mesaEdit: Mesa = {
      _id: _id,
      num_mesa: mesa.num_mesa,
      id_sesion: mesa.id_sesion,
      id_camarero: mesa.id_camarero,
      estado: mesa.estado
    };
    console.log(mesa)
    this.http.put('http://localhost:3000/api/mesas/' + _id, mesaEdit)
    .subscribe(response => {
      const mesasActializadas = [...this.mesas];
      const indiceActualizado = mesasActializadas.findIndex(m => m._id === mesaEdit._id);
      mesasActializadas[indiceActualizado] = mesaEdit;
      this.mesas = mesasActializadas;
      this.mesaActualizada.next([...this.mesas]);
    });
  }

  eliminarMesa(_id: string){
    this.http.delete('http://localhost:3000/api/mesas/' + _id)
    .subscribe(() => {
      const mesasActualizadas = this.mesas.filter(mesa => mesa._id !== _id);
      this.mesas = mesasActualizadas;
      this.mesaActualizada.next([...this.mesas]);
    })
  }
}
