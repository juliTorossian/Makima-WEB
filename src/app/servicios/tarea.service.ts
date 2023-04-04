import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getTareas(){
    return this.http.get(`${this.URL_COMPLETA}/tarea`);
  }

  setTarea(tarea: any){
    return this.http.post(`${this.URL_COMPLETA}/tarea`, tarea);
  }

  putTarea(tarea: any){
    return this.http.put(`${this.URL_COMPLETA}/tarea`, tarea);
  }

  deleteTarea(tarea: any){
    return this.http.delete(`${this.URL_COMPLETA}/tarea/${tarea.id}`);
  }
}
