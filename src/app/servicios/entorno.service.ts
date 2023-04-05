import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
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
    return this.http.get(`${this.URL_COMPLETA}/entorno`);
  }

  setEntorno(entorno: Entorno){
    return this.http.post(`${this.URL_COMPLETA}/entorno`, entorno);
  }

  putEntorno(entorno: Entorno){
    return this.http.put(`${this.URL_COMPLETA}/entorno`, entorno);
  }

  deleteEntorno(entorno: Entorno){
    return this.http.delete(`${this.URL_COMPLETA}/entorno/${entorno.id}`);
  }
}
