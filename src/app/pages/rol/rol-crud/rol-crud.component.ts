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
    codigo: new FormControl("", [Validators.required]), 
    descripcion: new FormControl("", [Validators.required])
  });

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let rol = this.config.data.rol;
    
    if (rol){
      this.rol.get("codigo")?.setValue(rol.codigo);
      this.rol.get("descripcion")?.setValue(rol.descripcion);
    }
  }

  accion($event:any){
    $event.preventDefault();
    const rol : any = {
      codigo: this.rol.get('codigo')?.value,
      descripcion: this.rol.get('descripcion')?.value
    }

    this.ref.close(rol);
  }
}
