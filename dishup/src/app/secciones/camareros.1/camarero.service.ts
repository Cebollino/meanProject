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
          _id: camarero._id,
          nombre: camarero.nombre,
          apellido: camarero.apellido,
          tlfn: camarero.tlfn,
          email: camarero.email
        }
      })
    }))
    .subscribe((camareroTransformado) => {
      this.camareros = camareroTransformado;
      this.camareroActalizado.next([...this.camareros]);
    })
  }

  getCamarero(id: string) {
    return this.http.get<{_id: string, nombre: string, apellido: string, tlfn: string, email: string}>('http://localhost:3000/api/camareros/' + id);
  }

  actualizarCamarero(_id: string, camarero: Camarero) {
    const camareroEdit: Camarero = {
      _id: _id,
      nombre: camarero.nombre,
      apellido: camarero.apellido,
      tlfn: camarero.tlfn,
      email: camarero.email
    };
    console.log(camarero)
    this.http.put('http://localhost:3000/api/camareros/' + _id, camareroEdit)
    .subscribe(response => {
      const camareroActalizado = [...this.camareros];
      const indiceActualizado = camareroActalizado.findIndex(m => m._id === camareroEdit._id);
      camareroActalizado[indiceActualizado] = camareroEdit;
      this.camareros = camareroActalizado;
      this.camareroActalizado.next([...this.camareros]);
    });
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

  eliminarCamarero(_id: string){
    this.http.delete('http://localhost:3000/api/camareros/' + _id)
    .subscribe(() => {
      const camarerosActuliazados = this.camareros.filter(mesa => mesa._id !== _id);
      this.camareros = camarerosActuliazados;
      this.camareroActalizado.next([...this.camareros]);
    })
  }
}
