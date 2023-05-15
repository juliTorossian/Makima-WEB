import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Rol, Usuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private router = inject(Router);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;

  // {this.URL_COMPLETA}/usuario = localhost:4000/usario
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
      catchError(err => {
        this.errorUsuario();
        throw 'error: '+err;
      }),
      tap( (res:any) => res),
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

  // ERRORES

  errorUsuario(){
    this.router.navigate(['login']);
  }

  // PERMISOS

  getPermisos(usuario:Usuario) : Rol{
    let permisos : Rol = {
      id : "permisos",
      descipcion: "permisos",
      controlTotal: false,
      controlEvento: false,
      controlCliente: false,
      controlProducto: false,
      controlTipo: false,
      controlHora: false,
      controlUsuario: false
    }

    usuario.rol.map( (r:Rol) => {
      permisos.controlTotal = (!permisos.controlTotal && !r.controlTotal) ? false : true;
      permisos.controlEvento = (!permisos.controlEvento && !r.controlEvento) ? false : true;
      permisos.controlCliente = (!permisos.controlCliente && !r.controlCliente) ? false : true;
      permisos.controlProducto = (!permisos.controlProducto && !r.controlProducto) ? false : true;
      permisos.controlTipo = (!permisos.controlTipo && !r.controlTipo) ? false : true;
      permisos.controlHora = (!permisos.controlHora && !r.controlHora) ? false : true;
      permisos.controlUsuario = (!permisos.controlUsuario && !r.controlUsuario) ? false : true;
    });
    
    return permisos;
  }

}
