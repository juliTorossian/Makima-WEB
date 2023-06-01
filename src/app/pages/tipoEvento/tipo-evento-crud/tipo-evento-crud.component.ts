import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { generarNuevoColor } from 'src/app/helpers/color';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-tipo-evento-crud',
  templateUrl: './tipo-evento-crud.component.html',
  styleUrls: ['./tipo-evento-crud.component.css']
})
export class TipoEventoCrudComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private tareaService = inject(TareaService);

  modo!: any;

  tareas!: Tarea[];
  tareasFiltradas!: Tarea[];

  id!: string;
  descripcion!: string;
  color: string = generarNuevoColor();
  activo: boolean = true;
  propio: boolean = false;
  tareasAsignadas: any[] = [
    { etapa: 1, tarea: '', rollback: null }
  ];

  agregarTarea() {
    let etapa = 0;
    if (this.tareasAsignadas.length >= 1){
      etapa = (this.tareasAsignadas[this.tareasAsignadas.length-1].etapa + 1);
    }else{
      etapa = 1;
    }
    this.tareasAsignadas.push({
      etapa: etapa,
      tarea: "",
      rollback: null
    })
  }
  eliminarTarea(tareaEliminar:any) {
    this.tareasAsignadas = this.tareasAsignadas.filter((item) => item.etapa !== tareaEliminar.etapa)
    let count = 1;
    this.tareasAsignadas.map( (item) => {
      item.etapa = count;
      count++;
    });
  }

  ngOnInit(){

    this.tareaService.getTareas().subscribe({
      next: (res:any) => {
        this.tareas = res;
        this.tareasFiltradas = this.tareas;
      }
    })

    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let tipoEvento = this.config.data.tipoEvento;
    
    if (tipoEvento){
      this.id = tipoEvento.id;
      this.descripcion = tipoEvento.descripcion;
      this.color = tipoEvento.color;
      this.propio = tipoEvento.propio;
      if(tipoEvento.tareas){
        this.tareasAsignadas = tipoEvento.tareas;
      }
    }
  }

  accion($event:any){
    $event.preventDefault();
    if(this.propio){
      this.tareasAsignadas = [];
    }
    const tipoEvento : any = {
      id: this.id,
      descripcion: this.descripcion,
      activo: this.activo,
      color: this.color,
      propio: this.propio,
      tareas: this.tareasAsignadas
    }

    this.ref.close(tipoEvento);
  }

  // bloquearPantalla(){
  //   this.bloquearTareas = !this.bloquearTareas;
  // }
}
