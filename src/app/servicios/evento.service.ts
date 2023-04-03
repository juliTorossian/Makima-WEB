import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Evento } from '../interfaces/evento';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getEventos(){
    return this.http.get(`${this.URL_COMPLETA}/evento`).pipe(
      map( (res:any) => res.results )
    );
  }
  getEventosUsuario(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/evento/usuario/${usuarioId}`).pipe(
      map( (res:any) => res.results )
    );
  }
}
