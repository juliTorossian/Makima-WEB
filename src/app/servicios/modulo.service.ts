import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
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
    return this.http.get(`${this.URL_COMPLETA}/modulo`);
  }

  setModulo(modulo: Modulo){
    return this.http.post(`${this.URL_COMPLETA}/modulo`, modulo);
  }

  putModulo(modulo: Modulo){
    return this.http.put(`${this.URL_COMPLETA}/modulo`, modulo);
  }

  deleteModulo(modulo: Modulo){
    return this.http.delete(`${this.URL_COMPLETA}/modulo/${modulo.id}`);
  }

  getModulosBusqueda(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_COMPLETA}/modulo`).pipe(
      map((response: any[]) => response.map(item => ({ value: item.id, label: `${item.id} - ${item.nombre}` })))
    );
  }
}
