import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Evento } from '../interfaces/evento';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class EventoAccionService {

  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;

  comentarEvento(evento:Evento, comentario:any){
    return this.http.post(`${this.URL_COMPLETA}/evento/${evento.id}/comentar`, comentario);
  }

  avanzarEvento(evento:Evento, usuario:Usuario, comentario:string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/circular/a?usuario=${usuario.id}&comentario=${comentario}`).pipe(
      tap( (res:any) => {console.log(usuario.id, comentario)})
    );
  }
  retrocederEvento(evento:Evento, usuario:Usuario, comentario:string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/circular/r?usuario=${usuario.id}`).pipe(
      tap( (res:any) => {console.log(usuario.id, comentario)})
    );
  }
  reasignarEvento(evento:Evento, usuario:Usuario){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/reasignar?usuario=${usuario.id}`);
  }
  estimarEvento(evento:Evento, estimacion:number, comentario:string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/estimar?estimado=${estimacion}&comentario=${comentario}`);
  }


  accionRealizada(evento:Evento, accion:string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/accion?accion=${accion}`).pipe(tap( (res:any) => console.log(res)));
  }

}
