import { Component, OnInit, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, tap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-modal-seleccion-usuario',
  templateUrl: './modal-seleccion-usuario.component.html',
  styleUrls: ['./modal-seleccion-usuario.component.css']
})
export class ModalSeleccionUsuarioComponent implements OnInit{
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private usuarioService = inject(UsuarioService);

  usuarios! :Usuario[];
  usuario! :Usuario;

  reqComentario: boolean = false;
  comentario!: string;

  ngOnInit(): void { 
    // console.log(this.config.data);
    this.reqComentario = this.config.data.reqComentario;
    this.comentario = this.config.data.comentario;
    this.usuarioService.getUsuariosRol(this.config.data.rol).pipe(
      // tap( (res:any) => console.log(res))
    ).subscribe({
      next: ( (res:any) => {
        this.usuarios = res;
      })
    })
  }

  seleccionar($event:any){
    if (this.usuario){

      let res = {
        usuarioSeleccionado: this.usuario,
        comentario: (this.reqComentario) ? this.comentario : ""
      }

      this.ref.close(res);
    }
  }

}
