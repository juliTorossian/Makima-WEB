import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  usuario = new FormGroup({
    id: new FormControl("", [Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    mail: new FormControl("", [Validators.required, Validators.email]),
    usuario: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmPass: new FormControl("", [Validators.required]),
    color: new FormControl("", [Validators.required]),
    rol: new FormControl("", [Validators.required])
  });

  roles! : any;

  ngOnInit(){
    // console.log(this.config.data);

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
      this.usuario.get("id")?.setValue(usuario.id);
      this.usuario.get("nombre")?.setValue(usuario.nombre);
      this.usuario.get("apellido")?.setValue(usuario.apellido);
      this.usuario.get("mail")?.setValue(usuario.mail);
      this.usuario.get("usuario")?.setValue(usuario.usuario);
      this.usuario.get("password")?.setValue(usuario.password);
      this.usuario.get("color")?.setValue(usuario.color);
      this.usuario.get("rol")?.setValue(usuario.rol.codigo);

      this.usuario.get("password")?.clearValidators();
      this.usuario.get("confirmPass")?.clearValidators();

    }
  }

  accion($event:any){
    $event.preventDefault();
    
    console.log(this.usuario.get('password')?.value);
    console.log(this.usuario.get('confirmPass')?.value);
    

    if ( (this.usuario.get('password')?.value != this.usuario.get('confirmPass')?.value) && this.modo !== 'M' ){

      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Las contraseñas deben ser iguales.` });

    }else{
      
      const usuario : any = {
        id: this.usuario.get('id')?.value,
        nombre: this.usuario.get('nombre')?.value,
        apellido: this.usuario.get('apellido')?.value,
        mail: this.usuario.get('mail')?.value,
        usuario: this.usuario.get('usuario')?.value,
        password: this.usuario.get('password')?.value,
        color: this.usuario.get('color')?.value,
        rol: this.usuario.get('rol')?.value
      }
  
      this.ref.close(usuario);
      
    }

  }

}
