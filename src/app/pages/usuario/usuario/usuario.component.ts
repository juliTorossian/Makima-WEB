import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  private rutActiva = inject(ActivatedRoute);

  private usuarioService = inject(UsuarioService);

  usuario!: Usuario;

  ngOnInit() {
    const usuarioId = this.rutActiva.snapshot.params['usuario'];
    this.usuarioService.getUsuario(usuarioId).subscribe({
      next: (res:any) => {
        this.usuario = res;
      }
    })
  }

}
