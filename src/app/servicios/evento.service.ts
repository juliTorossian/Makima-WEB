import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Evento } from '../interfaces/evento';
import { environment } from 'src/environments/environment';

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

  // Comentarios

  getComentarios(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/comentarios`).pipe(
      // tap( (res) => console.log(res))
    );
  }
  setComentario(eventoId : string, comentario:any){
    // console.log(comentario);
    return this.http.post(`${this.URL_COMPLETA}/evento/${eventoId}/comentar`, comentario);
  }

  // Adjuntos
  setAdjuntos(eventoId: string, usuario: string, adjuntos: any) {
    // Crea una nueva instancia del objeto FormData
    const formData = new FormData();
  
    // Agrega el archivo al objeto FormData
    formData.append('files', adjuntos);
  
    // Crea los headers de la petición HTTP
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
  
    // Realiza la petición HTTP
    return this.http.post(`${this.URL_COMPLETA}/evento/${eventoId}/adjuntar?usuario=${usuario}`, formData, {headers: headers});
  }
  // setAdjuntos(eventoId : string, adjuntos: any){
  //   console.log(adjuntos)
  //   let headers = new HttpHeaders();
  //   headers.set('Content-Type', 'multipart/form-data')
  //   return this.http.post(`${this.URL_COMPLETA}/evento/${eventoId}/adjuntar`, adjuntos, {headers: headers});
  // }
  getAdjuntos(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/adjuntos`).pipe(
      // tap( (res) => console.log(res))
    );
  }
  deleteAdjunto(adicionId: any){
    return this.http.delete(`${this.URL_COMPLETA}/evento/adjunto/${adicionId}`);
  }

  // Vida
  getVidaEvento(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/vida`).pipe(
      // tap( (res) => console.log(res))
    );
  }

  // Horas
  getHorasEvento(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/horas`).pipe(
      // tap( (res) => console.log(res))
    );
  }
}
