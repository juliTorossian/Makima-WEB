import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { Rol } from 'src/app/interfaces/usuario';
import { RolService } from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css']
})
export class UsuarioCrudComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private messageService = inject(MessageService);

  private rolService = inject(RolService);

  modo!: any;

  // usuario = new FormGroup({
  //   id: new FormControl("", [Validators.required]),
  //   nombre: new FormControl("", [Validators.required]),
  //   apellido: new FormControl("", [Validators.required]),
  //   mail: new FormControl("", [Validators.required, Validators.email]),
  //   usuario: new FormControl("", [Validators.required]),
  //   password: new FormControl("", [Validators.required]),
  //   confirmPass: new FormControl("", [Validators.required]),
  //   color: new FormControl("", [Validators.required]),
  //   rol: new FormArray([], [Validators.required])
  // });

  id!:string;
  nombre!:string;
  apellido!:string;
  mail!:string;
  usuario!:string;
  password!:string;
  confirmPass!:string;
  color!:string;
  rol!:any[];

  roles! : any;

  ngOnInit(){
    console.log(this.config.data);

    this.rolService.getRoles().pipe(
      tap( (res) => console.log(res))
    ).subscribe({
      next: (res) => {
        this.roles = res;
      }
    })

    this.modo = this.config.data.modo;
    let usuario = this.config.data.usuario;

    if (usuario){

      this.id = usuario.id;
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      this.mail = usuario.mail;
      this.usuario = usuario.usuario;
      this.color = usuario.color;
      // this.rol = usuario.rol;
      
      let rolAux: any[] = [];
      usuario.rol.map( (r:any) => {
        rolAux.push(r.id)
      })
      this.rol = rolAux;

      // this.usuario.get("id")?.setValue(usuario.id);
      // this.usuario.get("nombre")?.setValue(usuario.nombre);
      // this.usuario.get("apellido")?.setValue(usuario.apellido);
      // this.usuario.get("mail")?.setValue(usuario.mail);
      // this.usuario.get("usuario")?.setValue(usuario.usuario);
      // this.usuario.get("password")?.setValue(usuario.password);
      // this.usuario.get("color")?.setValue(usuario.color);

      // usuario.rol.map( (r:any) => {
      //   this.rolesForm.push(r.id)
      // })

      // this.usuario.get("password")?.clearValidators();
      // this.usuario.get("confirmPass")?.clearValidators();

    }
  }

  accion($event:any){
    $event.preventDefault();
    
    // console.log(this.usuario.get('password')?.value);
    // console.log(this.usuario.get('confirmPass')?.value);

    console.log(this.rol);
    

    if ( (this.password != this.confirmPass) && this.modo !== 'M' ){

      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Las contraseñas deben ser iguales.` });

    }else{


      
      const usuario : any = {
        id: this.id,
        nombre: this.nombre,
        apellido: this.apellido,
        mail: this.mail,
        usuario: this.usuario,
        password: this.password,
        color: this.color,
        rol: this.rol
      }
      console.log(usuario);
  
      this.ref.close(usuario);
      
    }

  }

}
