import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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
    return this.http.get(`${this.URL_COMPLETA}/cliente`);
  }

  setCliente(cliente: any){
    return this.http.post(`${this.URL_COMPLETA}/cliente`, cliente);
  }

  putCliente(cliente: any){
    return this.http.put(`${this.URL_COMPLETA}/cliente`, cliente);
  }

  deleteCliente(cliente: any){
    return this.http.delete(`${this.URL_COMPLETA}/cliente/${cliente.id}`);
  }

  reactivarCliente(cliente: any){
    return this.http.get(`${this.URL_COMPLETA}/cliente/${cliente.id}/reactivar`);
  }
}
