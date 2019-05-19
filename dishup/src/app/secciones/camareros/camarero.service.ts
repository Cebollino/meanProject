import { Camarero } from './camarero.modelo';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ServicioCamarero {
  private camareros: Camarero[] = []
  private camareroActalizado = new Subject<Camarero[]>()

  constructor(private http: HttpClient) {}

  getCamareros() {
    this.http.get<{message: string, camareros: any}>('http://localhost:3000/api/camareros')
    .pipe(map((camareroData) => {
      return camareroData.camareros.map(camarero => {
        return {
          id: camarero._id,
          nombre: camarero.nombre,
          apellido: camarero.apellido,
          tlfn: camarero.tlfn,
          email: camarero.email
        }
      })
    }))
    .subscribe((camareroTransformado) => {
      this.camareros = camareroTransformado
      this.camareroActalizado.next([...this.camareros])
    })
  }

  getCamarerosActualizadosListener() {
    return this.camareroActalizado.asObservable()
  }

  addCamarero(camarero: Camarero) {
    this.http.post<{message: string}>('http://localhost:3000/api/camareros', camarero)
    .subscribe((responseData) => {
        console.log(responseData)
        this.camareros.push(camarero)
        this.camareroActalizado.next([...this.camareros])
    })
  }
}
