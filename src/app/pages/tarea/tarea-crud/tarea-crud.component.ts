import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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

  tarea = new FormGroup({
    id: new FormControl(""), 
    nombre: new FormControl("", [Validators.required]),
    rol: new FormControl("", [Validators.required])
  });


  ngOnInit(){
    this.rolService.getRoles().subscribe({
      next: (res) => {
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
    }
  }

  accion($event:any){
    $event.preventDefault();
    const tarea : any = {
      id: this.tarea.get('id')?.value,
      nombre: this.tarea.get('nombre')?.value,
      rol: this.tarea.get('rol')?.value
    }

    this.ref.close(tarea);
  }
}
