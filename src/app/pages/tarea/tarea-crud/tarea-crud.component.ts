import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { generarNuevoColor } from 'src/app/helpers/color';
import { TareaClave } from 'src/app/interfaces/tarea';
import { RolService } from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-tarea-crud',
  templateUrl: './tarea-crud.component.html',
  styleUrls: ['./tarea-crud.component.css']
})
export class TareaCrudComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private rolService = inject(RolService);

  modo!: any;
  roles! : any;

  claves = ["", ...Object.keys(TareaClave).filter((v) => isNaN(Number(v)))];

  tarea = new FormGroup({
    id: new FormControl(""), 
    nombre: new FormControl("", [Validators.required]),
    rol: new FormControl("", [Validators.required]),
    controla: new FormControl(false),
    clave: new FormControl(""),
    comentario: new FormControl(false),
    color: new FormControl(generarNuevoColor())
  });


  ngOnInit(){
    // console.log(this.claves);
    this.rolService.getRoles().subscribe({
      next: (res) => {
        // console.log(res);
        this.roles = res;
      }
    })

    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let tarea = this.config.data.tarea;
    
    if (tarea){
      this.tarea.get("id")?.setValue(tarea.id);
      this.tarea.get("nombre")?.setValue(tarea.nombre);
      this.tarea.get("rol")?.setValue(tarea.rol);
      this.tarea.get("controla")?.setValue(tarea.controla);
      this.tarea.get("clave")?.setValue(tarea.clave);
      this.tarea.get("comentario")?.setValue(tarea.comentario);
      if (tarea.color){
        this.tarea.get("color")?.setValue(tarea.color);
      }
    }
  }

  accion($event:any){
    $event.preventDefault();
    const tarea : any = {
      id: this.tarea.get('id')?.value,
      nombre: this.tarea.get('nombre')?.value,
      rol: this.tarea.get('rol')?.value,
      controla: this.tarea.get('controla')?.value,
      clave: ((this.tarea.get('controla')?.value) ? this.tarea.get('clave')?.value : null),
      comentario: this.tarea.get('comentario')?.value,
      color: this.tarea.get('color')?.value
    }
    // console.log(tarea);

    this.ref.close(tarea);
  }
}
