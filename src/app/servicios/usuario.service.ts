import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getUsuarios(){
    return this.http.get(`${this.URL_COMPLETA}/usuario`);
  }
  getUsuariosRol(rol:string){
    return this.http.get(`${this.URL_COMPLETA}/usuario/rol/${rol}`);
  }

  setUsuario(usuario: any){
    return this.http.post(`${this.URL_COMPLETA}/usuario`, usuario);
  }

  putUsuario(usuario: any){
    return this.http.put(`${this.URL_COMPLETA}/usuario`, usuario);
  }

  deleteUsuario(usuario: any){
    return this.http.delete(`${this.URL_COMPLETA}/usuario/${usuario.id}`);
  }

  /* */

  login(params: any){
    return this.http.get(`${this.URL_COMPLETA}/usuario/gestion/iniciarSesion`, {params});
  }
  logout(){
    return this.cookies.delete("userToken");
  }
  getUsuarioToken(token: string) : Observable<Usuario> {
    if (token === ""){
      token = this.getToken();
    }
    return this.http.get(`${this.URL_COMPLETA}/usuario/${token}?token=true`).pipe(
      map( (res:any) => res.tokenUsuario )
    );
  }
  getUsuario(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}`).pipe(
      map( (res:any) => res.tokenUsuario )
    );
  }

  // TOKEN
  
  setToken(token: string){
    this.cookies.set("userToken", token, { expires: 0.05, path: '/' });
  }
  getToken(){
    return this.cookies.get("userToken");
  }
  delToken(key:string){
    return this.cookies.delete(key);
  }

}
