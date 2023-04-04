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

  login(params: any){
    /*
    {
      "usuario": usuario,
      "password": password
    }
    */
    return this.http.get(`${this.URL_COMPLETA}/usuario/gestion/iniciarSesion`, {params});
  }
  
  getUsuarioToken(token: string) : Observable<Usuario> {
    if (token === ""){
      token = this.getToken();
    }
    return this.http.get(`${this.URL_COMPLETA}/usuario/${token}?token=true`).pipe(
      tap( (res:any) => console.log(res)),
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

}
