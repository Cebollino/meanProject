import { Mesa } from './mesa.modelo';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ServicioMesa {
  private mesas: Mesa[] = []
  private mesaActualizada = new Subject<Mesa[]>()

  constructor(private http: HttpClient) {}

  getMesas() {
    this.http.get<{message: string, mesas: any}>('http://localhost:3000/api/mesas')
    .pipe(map((mesaData) => {
      return mesaData.mesas.map(mesa => {
        return {
          id: mesa._id,
          id_sesion: mesa.id_sesion,
          id_camarero: mesa.id_camarero,
          estado: mesa.estado,
        }
      })
    }))
    .subscribe((mesaTransformada) => {
      this.mesas = mesaTransformada
      this.mesaActualizada.next([...this.mesas])
    })
  }

  getMesasActualizadasListener() {
    return this.mesaActualizada.asObservable()
  }

  addMesa(mesa: Mesa) {
    console.log(mesa)
    this.http.post<{message: string}>('http://localhost:3000/api/mesas', mesa)
    .subscribe((responseData) => {
        console.log(responseData)
        this.mesas.push(mesa)
        console.log(mesa)
        this.mesaActualizada.next([...this.mesas])
    })
  }
}
