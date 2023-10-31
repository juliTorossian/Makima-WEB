import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario, UsuarioPreferencia, PreferenciasData } from 'src/app/interfaces/usuario';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  private rutActiva = inject(ActivatedRoute);

  private usuarioService = inject(UsuarioService);
  private rolService = inject(RolService);

  usuarioLogeado!: Usuario;
  usuarioAVer!: string;
  usuarioPreferencias!: UsuarioPreferencia[];
  preferencias: UsuarioPreferencia[] = PreferenciasData;

  usuario!: Usuario;
  usuarioMod = {
    id: "",
    nombre: "",
    apellido: "",
    mail: "",
    usuario: "",
    color: ""
  };
  roles!: any;

  ngOnInit() {
    this.identificarUsuario();

    this.rolService.getRoles().pipe(
    ).subscribe({
      next: (res) => {
        this.roles = res;
      }
    });
    
    this.getUsuario();
  }

  getUsuario(){
    this.usuarioAVer = this.rutActiva.snapshot.params['usuario'];
    this.usuarioService.getUsuario(this.usuarioAVer).subscribe({
      next: (res:any) => {
        this.usuario = res;
        this.setUserMod();
      }
    });
  }

  identificarUsuario(){
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuarioLogeado = res;
      },
      complete: () => {
        this.usuarioService.getUsuarioPreferencias(this.usuarioLogeado.id).subscribe({
          next: (res:any) => {
            this.preferencias.map( (p) => {
              res.map( (r:any) => {
                if (p.clave === r){
                  p.activo = true;
                }
              })
            })
          }
        })
      }
    });
  }

  esUsuario(){
    // console.log(this.usuarioLogeado);
    // console.log(this.usuarioAVer);
    return this.usuarioLogeado.id === this.usuarioAVer;
  }

  setUserMod(){
    this.usuarioMod.id = this.usuario.id;
    this.usuarioMod.nombre = this.usuario.nombre;
    this.usuarioMod.apellido = this.usuario.apellido;
    this.usuarioMod.mail = this.usuario.mail;
    this.usuarioMod.usuario = this.usuario.usuario;
    this.usuarioMod.color = this.usuario.color;
  }

  modificarUsuario(){
    this.usuarioService.putUsuario(this.usuarioMod).subscribe({
      // next: (res:any) => {
      //   console.log(res);
      // },
      complete: ()=>{
        this.getUsuario();
      }
    });
  }

  actualizarPreferencia(preferencia:UsuarioPreferencia) {
    console.log(preferencia);
    this.usuarioService.setDelUsuarioPreferencias(this.usuario.id, preferencia).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

}
