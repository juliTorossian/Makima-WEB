import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modulo } from '../interfaces/modulo';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getModulos(){
    return this.http.get(`${this.URL_COMPLETA}/modulo`).pipe(map( (res:any) => res.data ));
  }

  setModulo(modulo: Modulo){
    return this.http.post(`${this.URL_COMPLETA}/modulo`, modulo).pipe(map( (res:any) => res.data ));
  }

  putModulo(modulo: Modulo){
    return this.http.patch(`${this.URL_COMPLETA}/modulo/${modulo.id}`, modulo).pipe(map( (res:any) => res.data ));
  }

  deleteModulo(modulo: Modulo){
    return this.http.delete(`${this.URL_COMPLETA}/modulo/${modulo.id}`).pipe(map( (res:any) => res.data ));
  }

  getModulosBusqueda(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_COMPLETA}/modulo`).pipe(
      
      // tap( (res:any) => console.log(res)),
      map((response:any) => response.data.map((item:any) => (item.id)))
    );
  }
  // getModulosBusqueda(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.URL_COMPLETA}/modulo`).pipe(
  //     map((response: any[]) => response.map(item => ({ value: item.id, label: `${item.id} - ${item.nombre}` })))
  //   );
  // }
}
