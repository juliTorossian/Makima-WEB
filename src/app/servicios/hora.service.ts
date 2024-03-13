import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.get(`${this.URL_COMPLETA}/hora`).pipe(map( (res:any) => res.data ));
  }
  getHora(horaId : string){
    return this.http.get(`${this.URL_COMPLETA}/hora/${horaId}`).pipe(map( (res:any) => res.data ));
  }
  getHorasUsuario(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/hora/usuario/${usuarioId}`).pipe(map( (res:any) => res.data ));
  }
  getHorasGenerales(){
    return this.http.get(`${this.URL_COMPLETA}/hora/generales`).pipe(map( (res:any) => res.data ));
  }
  
  setHora(hora: any){
    return this.http.post(`${this.URL_COMPLETA}/hora`, hora).pipe(map( (res:any) => res.data ));
  }

  putHora(hora: any){
    return this.http.patch(`${this.URL_COMPLETA}/hora/${hora.id}`, hora).pipe(map( (res:any) => res.data ));
  }

  deleteHora(hora: any){
    return this.http.delete(`${this.URL_COMPLETA}/hora/${hora.id}`).pipe(map( (res:any) => res.data ));
  }
}
