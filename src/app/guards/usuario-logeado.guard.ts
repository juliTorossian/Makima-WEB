import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogeadoGuard implements CanActivate {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  canActivate() {
    if (this.usuarioService.getToken() == '') {
      console.log('No estás logueado');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
