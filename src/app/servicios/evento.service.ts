import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Evento } from '../interfaces/evento';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private http = inject(HttpClient);

  private API_BASEURL = environment.API_BASEURL;
  private API_PORT = environment.API_PORT;
  private API_VERSION = environment.API_VERSION;
  private URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;

  getEventos(){
    return this.http.get(`${this.URL_COMPLETA}/evento`).pipe(
      map( (res:any) => res.results )
    );
  }
  getEvento(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}`).pipe(
      // tap( (res) => console.log(res))
    );
  }
  getEventosUsuario(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/evento/usuario/${usuarioId}`).pipe(
      map( (res:any) => res.results )
    );
  }
  setEvento(evento: any){
    return this.http.post(`${this.URL_COMPLETA}/evento`, evento);
  }

  putEvento(evento: any){
    return this.http.put(`${this.URL_COMPLETA}/evento`, evento);
  }

  deleteEvento(evento: any){
    return this.http.delete(`${this.URL_COMPLETA}/evento/${evento.id}`);
  }

  getComentarios(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/comentarios`).pipe(
      // tap( (res) => console.log(res))
    );
  }

  getAdjuntos(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/adjuntos`).pipe(
      // tap( (res) => console.log(res))
    );
  }
  setComentario(eventoId : string, comentario:any){
    const headers = new HttpHeaders();
    headers.set('Content-Type', ['multipart/form-data']);
    return this.http.post(`${this.URL_COMPLETA}/evento/${eventoId}/comentar`, comentario, { headers });
  }
  getVidaEvento(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/vida`).pipe(
      // tap( (res) => console.log(res))
    );
  }
}
