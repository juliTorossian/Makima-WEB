import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Rol } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;

  getRoles(){
    return this.http.get(`${this.URL_COMPLETA}/rol`);
  }

  setRol(rol: Rol){
    return this.http.post(`${this.URL_COMPLETA}/rol`, rol);
  }

  putRol(rol: Rol){
    return this.http.put(`${this.URL_COMPLETA}/rol`, rol);
  }

  deleteRol(rol: Rol){
    return this.http.delete(`${this.URL_COMPLETA}/rol/${rol.id}`);
  }
}
