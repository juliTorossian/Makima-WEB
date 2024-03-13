import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.http.post(`${this.URL_COMPLETA}/evento/${evento.id}/comentar`, comentario).pipe(
      tap( (res:any) => { console.log(comentario) })
    );
  }
  avanzarEvento(evento:Evento, usuario:Usuario, comentario:string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/circular/a?usuario=${usuario.id}&comentario=${comentario}`).pipe(
      map( (res:any) => res.data )
    );
  }
  retrocederEvento(evento:Evento, usuario:Usuario, comentario:string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/circular/r?usuario=${usuario.id}&comentario=${comentario}`).pipe(
      tap( (res:any) => {console.log(usuario.id, comentario)}),
      map( (res:any) => res.data )
    );
  }
  reasignarEvento(evento:Evento, usuario:Usuario){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/reasignar?usuario=${usuario.id}`).pipe(map( (res:any) => res.data ));
  }
  estimarEvento(estimacion:any){
    return this.http.post(`${this.URL_COMPLETA}/evento/${estimacion.evento}/estimar`, estimacion).pipe(map( (res:any) => res.data ));
  }


  accionRealizada(evento:Evento, accion:string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${evento.id}/accion?accion=${accion}`).pipe(map( (res:any) => res.data ));
  }

}
