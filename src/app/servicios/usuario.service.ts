import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PermisoClave, PermisoRol, Rol, Usuario, UsuarioPreferencia } from '../interfaces/usuario';
import { environment } from 'src/environments/environment';
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
    return this.http.patch(`${this.URL_COMPLETA}/usuario/${usuario.id}`, usuario);
  }

  deleteUsuario(usuario: any){
    return this.http.delete(`${this.URL_COMPLETA}/usuario/${usuario.id}`);
  }

  reactivarUsuario(usuario: any){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuario.id}/reactivar`);
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
  getUsuarioPreferencias(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}/preferencias`);
  }
  setDelUsuarioPreferencias(usuarioId: string, preferencia: UsuarioPreferencia){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}/preferencias/${preferencia.clave}`);
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

  normalizarPermisos(usuario:Usuario) : PermisoRol[] {
    let permisos : PermisoRol[] = []
    if (usuario ){
      usuario.rol.map( (r:Rol) => {

        r.permisos.map( (rp) => {
          let aux = permisos.some((a) => a.clave === rp.clave)
          if (aux){
            permisos.map( (p) => {
              if (p.clave == rp.clave && p.nivel! < rp.nivel!){
                p.nivel = rp.nivel
              }
            })
          }else{
            permisos.push(rp);
          }
        })
      });
    }
    
    // console.log(permisos);
    return permisos;
  }

  getNivelPermiso(clave:PermisoClave, usuario:Usuario) : number {
    let permisos = this.normalizarPermisos(usuario);
    let aux = permisos.find( (p) => p.clave === clave);
    let nivel = (aux) ? aux!.nivel : 0;
    let admin = permisos.some( (p) => p.clave === PermisoClave.ADMIN);
    return (admin) ? 9 : nivel!;
  }

  getEventosGrafico(usuarioId:string){
    return this.http.get(`${this.URL_COMPLETA}/usuario/estadisticas/${usuarioId}`);
  }

}
