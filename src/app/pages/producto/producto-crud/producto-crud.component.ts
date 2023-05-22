import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { Entorno } from 'src/app/interfaces/entorno';
import { Modulo } from 'src/app/interfaces/modulo';
import { EntornoService } from 'src/app/servicios/entorno.service';
import { ModuloService } from 'src/app/servicios/modulo.service';

@Component({
  selector: 'app-producto-crud',
  templateUrl: './producto-crud.component.html',
  styleUrls: ['./producto-crud.component.css']
})
export class ProductoCrudComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private moduloService = inject(ModuloService);
  private entornoService = inject(EntornoService);

  modo!: any;

  modulos!: Modulo[];
  submodulos!: Modulo[];
  entornos!: Entorno[];

  producto = new FormGroup({
    id: new FormControl("", [Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    modulo: new FormControl("", [Validators.required]),
    submodulo: new FormControl(""),
    entorno: new FormControl("", [Validators.required]),
  });


  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let producto = this.config.data.producto;

    this.moduloService.getModulos().subscribe({
      next: (res:any) => {
        this.modulos = res;
        this.submodulos = res;
        this.submodulos.unshift({ 
          id:     null,
          nombre: null,
          padre:  null
        })
      }
    });
    this.entornoService.getEntornos().subscribe({
      next: (res:any) => {
        this.entornos = res;
      }
    });
    
    if (producto){
      this.producto.get("id")?.setValue(producto.id);
      this.producto.get("nombre")?.setValue(producto.nombre);
      this.producto.get("modulo")?.setValue(producto.modulo.id);
      this.producto.get("submodulo")?.setValue(producto.submodulo.id);
      this.producto.get("entorno")?.setValue(producto.entorno.id);

    }
  }

  accion($event:any){
    $event.preventDefault();

      
    const producto : any = {
      id: this.producto.get('id')?.value,
      nombre: this.producto.get('nombre')?.value,
      modulo: this.producto.get('modulo')?.value,
      submodulo: this.producto.get('submodulo')?.value,
      entorno: this.producto.get('entorno')?.value
    }

    this.ref.close(producto);
    

  }
}
