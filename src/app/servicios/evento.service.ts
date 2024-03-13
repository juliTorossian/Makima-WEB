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
      // tap( (res) => console.log(res)),
      map( (res:any) => res.data.results )
    );
  }
  getEvento(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}`).pipe(map( (res:any) => res.data ));
  }
  getEventosUsuario(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/evento/usuario/${usuarioId}`).pipe(map( (res:any) => res.data.results ))
  }
  setEvento(evento: any){
    return this.http.post(`${this.URL_COMPLETA}/evento`, evento).pipe(map( (res:any) => res.data ));
  }

  putEvento(evento: any){
    return this.http.patch(`${this.URL_COMPLETA}/evento/${evento.id}`, evento).pipe(map( (res:any) => res.data ));
  }

  deleteEvento(evento: any){
    return this.http.delete(`${this.URL_COMPLETA}/evento/${evento.id}`).pipe(map( (res:any) => res.data ));
  }

  // Comentarios

  getComentarios(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/comentarios`).pipe(map( (res:any) => res.data ));
  }
  setComentario(eventoId : string, comentario:any){
    return this.http.post(`${this.URL_COMPLETA}/evento/${eventoId}/comentar`, comentario).pipe(map( (res:any) => res.data ));
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
    return this.http.post(`${this.URL_COMPLETA}/evento/${eventoId}/adjuntar?usuario=${usuario}`, formData, {headers: headers}).pipe(map( (res:any) => res.data ));
  }
  // setAdjuntos(eventoId : string, adjuntos: any){
  //   console.log(adjuntos)
  //   let headers = new HttpHeaders();
  //   headers.set('Content-Type', 'multipart/form-data')
  //   return this.http.post(`${this.URL_COMPLETA}/evento/${eventoId}/adjuntar`, adjuntos, {headers: headers});
  // }
  getAdjuntos(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/adjuntos`).pipe(map( (res:any) => res.data ));
  }
  deleteAdjunto(adicionId: any){
    return this.http.delete(`${this.URL_COMPLETA}/evento/adjunto/${adicionId}`).pipe(map( (res:any) => res.data ));
  }

  // Vida
  getVidaEvento(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/vida`).pipe(map( (res:any) => res.data ));
  }

  // Horas
  getHorasEvento(eventoId : string){
    return this.http.get(`${this.URL_COMPLETA}/evento/${eventoId}/horas`).pipe(map( (res:any) => res.data ));
  }
}
