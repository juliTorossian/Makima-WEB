import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tarea-crud',
  templateUrl: './tarea-crud.component.html',
  styleUrls: ['./tarea-crud.component.css']
})
export class TareaCrudComponent {
  modo!: any;

  roles = ['DESA', 'CONS', 'ADMIN'];
  rolesFiltrados!: any[];

  tarea = new FormGroup({
    id: new FormControl(""), 
    nombre: new FormControl("", [Validators.required]),
    rol: new FormControl("", [Validators.required])
  });

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    console.log(this.config.data);
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


  filtroRoles(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.roles.length; i++) {
      let rol = this.roles[i];
      if (rol.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(rol);
      }
    }
    this.rolesFiltrados = filtered;
}
}
