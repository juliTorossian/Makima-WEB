import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-rol-crud',
  templateUrl: './rol-crud.component.html',
  styleUrls: ['./rol-crud.component.css']
})
export class RolCrudComponent {
  modo!: any;

  rol = new FormGroup({
    id: new FormControl("", [Validators.required]), 
    descripcion: new FormControl("", [Validators.required]),
    nivel: new FormControl(0)
  });

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let rol = this.config.data.rol;
    
    if (rol){
      this.rol.get("id")?.setValue(rol.id);
      this.rol.get("id")?.disable();
      this.rol.get("descripcion")?.setValue(rol.descripcion);
      this.rol.get("nivel")?.setValue(rol.nivel);
    }
  }

  accion($event:any){
    $event.preventDefault();
    const rol : any = {
      id: this.rol.get('id')?.value,
      descripcion: this.rol.get('descripcion')?.value,
      nivel: this.rol.get('nivel')?.value
    }

    this.ref.close(rol);
  }
}
