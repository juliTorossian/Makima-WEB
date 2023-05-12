import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-entorno-crud',
  templateUrl: './entorno-crud.component.html',
  styleUrls: ['./entorno-crud.component.css']
})
export class EntornoCrudComponent {
  modo!: any;

  entorno = new FormGroup({
    id: new FormControl("", [Validators.required]), 
    nombre: new FormControl("", [Validators.required])
  });

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let entorno = this.config.data.entorno;
    
    if (entorno){
      this.entorno.get("id")?.setValue(entorno.id);
      this.entorno.get("nombre")?.setValue(entorno.nombre);
    }
  }

  accion($event:any){
    $event.preventDefault();
    const entorno : any = {
      id: this.entorno.get('id')?.value,
      nombre: this.entorno.get('nombre')?.value
    }

    this.ref.close(entorno);
  }

}
