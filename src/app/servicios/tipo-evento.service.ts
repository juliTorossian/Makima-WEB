import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getTipoEventos(){
    return this.http.get(`${this.URL_COMPLETA}/tipoEvento`).pipe(map( (res:any) => res.data ));
  }
  setTipoEvento(tipoEvento: any){
    return this.http.post(`${this.URL_COMPLETA}/tipoEvento`, tipoEvento).pipe(map( (res:any) => res.data ));
  }
  putTipoEvento(tipoEvento: any){
    return this.http.patch(`${this.URL_COMPLETA}/tipoEvento/${tipoEvento.id}`, tipoEvento).pipe(map( (res:any) => res.data ));
  }
  deleteTipoEvento(tipoEvento: any){
    return this.http.delete(`${this.URL_COMPLETA}/tipoEvento/${tipoEvento.id}`).pipe(map( (res:any) => res.data ));
  }

  getTiposEventoBusqueda(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_COMPLETA}/tipoEvento`).pipe(
      // map((response: any[]) => response.map(item => ({ value: item.id, label: `${item.id} - ${item.descripcion}` })))
      // tap( (res:any) => console.log(res)),
      map((response:any) => response.data.map((item:any) => (item.id)))
    );
  }
}
