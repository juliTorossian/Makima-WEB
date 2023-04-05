import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modulo-crud',
  templateUrl: './modulo-crud.component.html',
  styleUrls: ['./modulo-crud.component.css']
})
export class ModuloCrudComponent {
  modo!: any;

  modulo = new FormGroup({
    id: new FormControl("", [Validators.required]), 
    nombre: new FormControl("", [Validators.required]),
    padre: new FormControl("")
  });

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let modulo = this.config.data.modulo;
    
    if (modulo){
      this.modulo.get("id")?.setValue(modulo.id);
      this.modulo.get("nombre")?.setValue(modulo.nombre);
      this.modulo.get("padre")?.setValue(modulo.padre);
    }
  }

  accion($event:any){
    $event.preventDefault();
    const modulo : any = {
      id: this.modulo.get('id')?.value,
      nombre: this.modulo.get('nombre')?.value,
      padre: this.modulo.get('padre')?.value
    }

    this.ref.close(modulo);
  }
}
