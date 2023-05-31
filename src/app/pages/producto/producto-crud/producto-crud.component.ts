import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Entorno } from 'src/app/interfaces/entorno';
import { EntornoService } from 'src/app/servicios/entorno.service';

@Component({
  selector: 'app-producto-crud',
  templateUrl: './producto-crud.component.html',
  styleUrls: ['./producto-crud.component.css']
})
export class ProductoCrudComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private entornoService = inject(EntornoService);

  modo!: any;

  entornos!: Entorno[];

  producto = new FormGroup({
    id: new FormControl("", [Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    entorno: new FormControl("", [Validators.required]),
  });


  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let producto = this.config.data.producto;

    this.entornoService.getEntornos().subscribe({
      next: (res:any) => {
        this.entornos = res;
      }
    });
    
    if (producto){
      this.producto.get("id")?.setValue(producto.id);
      this.producto.get("nombre")?.setValue(producto.nombre);
      this.producto.get("entorno")?.setValue(producto.entorno.id);

    }
  }

  accion($event:any){
    $event.preventDefault();

      
    const producto : any = {
      id: this.producto.get('id')?.value,
      nombre: this.producto.get('nombre')?.value,
      entorno: this.producto.get('entorno')?.value
    }

    this.ref.close(producto);
    

  }
}
