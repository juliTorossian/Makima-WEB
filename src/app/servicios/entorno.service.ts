import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entorno } from '../interfaces/entorno';

@Injectable({
  providedIn: 'root'
})
export class EntornoService {
  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getEntornos(){
    return this.http.get(`${this.URL_COMPLETA}/entorno`).pipe(map( (res:any) => res.data ));
  }

  setEntorno(entorno: Entorno){
    return this.http.post(`${this.URL_COMPLETA}/entorno`, entorno).pipe(map( (res:any) => res.data ));
  }

  putEntorno(entorno: Entorno){
    return this.http.patch(`${this.URL_COMPLETA}/entorno/${entorno.id}`, entorno).pipe(map( (res:any) => res.data ));
  }

  deleteEntorno(entorno: Entorno){
    return this.http.delete(`${this.URL_COMPLETA}/entorno/${entorno.id}`).pipe(map( (res:any) => res.data ));
  }
}
