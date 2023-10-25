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
    controlTotal: new FormControl(false),
    controlEvento: new FormControl(false),
    controlCliente: new FormControl(false),
    controlProducto: new FormControl(false),
    controlTipo: new FormControl(false),
    controlHora: new FormControl(false),
    controlUsuario: new FormControl(false)
  });

  
  permisos: any[] = [
    { clave: 'permiso1', lectura: true, escritura: false, eliminacion: false },
    { clave: 'permiso2', lectura: false, escritura: true, eliminacion: true },
    { clave: 'permiso3', lectura: true, escritura: true, eliminacion: true }
  ];
  permisosTable: any[] = [];

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let rol = this.config.data.rol;
    // Llena la tabla con los datos de los permisos
    this.permisos.forEach((permiso) => {
      this.permisosTable.push({
        clave: permiso.clave,
        lectura: permiso.lectura,
        escritura: permiso.escritura,
        eliminacion: permiso.eliminacion
      });
    });
    
    if (rol){
      this.rol.get("id")?.setValue(rol.id);
      this.rol.get("id")?.disable();
      this.rol.get("descripcion")?.setValue(rol.descripcion);
      this.rol.get("controlTotal")?.setValue(rol.controlTotal);
      this.rol.get("controlEvento")?.setValue(rol.controlEvento);
      this.rol.get("controlCliente")?.setValue(rol.controlCliente);
      this.rol.get("controlProducto")?.setValue(rol.controlProducto);
      this.rol.get("controlTipo")?.setValue(rol.controlTipo);
      this.rol.get("controlHora")?.setValue(rol.controlHora);
      this.rol.get("controlUsuario")?.setValue(rol.controlUsuario);
    }
  }

  // Evento de click de cada checkbox
  onCheckChange(event:any) {
    console.log(event);
    // Actualiza el estado del permiso
    this.permisos[event.index].lectura = event.checked;
    this.permisos[event.index].escritura = event.checked;
    this.permisos[event.index].eliminacion = event.checked;
  }

  cambioPermisos(total:boolean){
    if (total){
      const controlTotal = this.rol.get('controlTotal')?.value;
      const aux = (controlTotal) ? true : false;
      this.rol.get("controlEvento")?.setValue(aux);
      this.rol.get("controlCliente")?.setValue(aux);
      this.rol.get("controlProducto")?.setValue(aux);
      this.rol.get("controlTipo")?.setValue(aux);
      this.rol.get("controlHora")?.setValue(aux);
      this.rol.get("controlUsuario")?.setValue(aux);
    }else{
      this.rol.get("controlTotal")?.setValue( (this.rol.get('controlEvento')?.value === true &&
                                              this.rol.get('controlCliente')?.value === true &&
                                              this.rol.get('controlProducto')?.value === true &&
                                              this.rol.get('controlTipo')?.value === true &&
                                              this.rol.get('controlHora')?.value === true &&
                                              this.rol.get('controlUsuario')?.value === true)) ;
    }
  }

  accion($event:any){
    $event.preventDefault();
    const rol : any = {
      id: this.rol.get('id')?.value,
      descripcion: this.rol.get('descripcion')?.value,
      controlTotal: this.rol.get('controlTotal')?.value,
      controlEvento: this.rol.get('controlEvento')?.value,
      controlCliente: this.rol.get('controlCliente')?.value,
      controlProducto: this.rol.get('controlProducto')?.value,
      controlTipo: this.rol.get('controlTipo')?.value,
      controlHora: this.rol.get('controlHora')?.value,
      controlUsuario: this.rol.get('controlUsuario')?.value
    }

    this.ref.close(rol);
  }
}
