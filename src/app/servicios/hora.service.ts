import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HoraService {
  private http = inject(HttpClient);

  private API_BASEURL = environment.API_BASEURL;
  private API_PORT = environment.API_PORT;
  private API_VERSION = environment.API_VERSION;
  private URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;

  getHoras(){
    return this.http.get(`${this.URL_COMPLETA}/hora`);
  }
  getHora(horaId : string){
    return this.http.get(`${this.URL_COMPLETA}/hora/${horaId}`);
  }
  getHorasUsuario(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/hora/usuario/${usuarioId}`);
  }
  
  setHora(hora: any){
    return this.http.post(`${this.URL_COMPLETA}/hora`, hora);
  }

  putHora(hora: any){
    return this.http.put(`${this.URL_COMPLETA}/hora`, hora);
  }

  deleteHora(hora: any){
    return this.http.delete(`${this.URL_COMPLETA}/hora/${hora.id}`);
  }
}
