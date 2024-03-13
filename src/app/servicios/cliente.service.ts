import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getClientes(){
    return this.http.get(`${this.URL_COMPLETA}/cliente/`).pipe(map( (res:any) => res.data ));
  }

  getCliente(clienteId : string){
    return this.http.get(`${this.URL_COMPLETA}/cliente/${clienteId}`).pipe(map( (res:any) => res.data ));
  }

  setCliente(cliente: any){
    return this.http.post(`${this.URL_COMPLETA}/cliente/`, cliente).pipe(map( (res:any) => res.data ));
  }

  putCliente(cliente: any){
    return this.http.patch(`${this.URL_COMPLETA}/cliente/${cliente.id}`, cliente).pipe(map( (res:any) => res.data ));
  }

  deleteCliente(cliente: any){
    return this.http.delete(`${this.URL_COMPLETA}/cliente/${cliente.id}`).pipe(map( (res:any) => res.data ));
  }

  reactivarCliente(cliente: any){
    return this.http.get(`${this.URL_COMPLETA}/cliente/${cliente.id}/reactivar`).pipe(map( (res:any) => res.data ));
  }
}
