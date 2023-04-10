import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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

  opcionesTareas : any[] = [{ label: "Ingreso", value: "ing" },
                            { label: "Desarrollo", value: "desa" },
                            { label: "Testeo", value: "test" },];

  countTareas:number = 1;

  tareas!: Tarea[];
  tareasFiltradas!: Tarea[];


  id!: string;
  descripcion!: string;
  color!: string;
  activo: boolean = true;
  propio: boolean = false;
  tareasAsignadas: any[] = [
    { etapa: 1, tarea: '', rollback: null }
  ];
  

  agregarTarea() {
    this.tareasAsignadas.push({
      etapa: (this.tareasAsignadas[this.tareasAsignadas.length-1].etapa + 1),
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
  getTareasForm(){
  }

  ngOnInit(){

    this.tareaService.getTareas().subscribe({
      next: (res:any) => {
        this.tareas = res;
        this.tareasFiltradas = this.tareas;
      }
    })

    console.log(this.config.data);
    this.modo = this.config.data.modo;
    let tipoEvento = this.config.data.tipoEvento;
    
    if (tipoEvento){
      this.id = tipoEvento.id;
      this.descripcion = tipoEvento.descripcion;
      this.color = tipoEvento.color;
      this.propio = tipoEvento.propio;
      this.tareasAsignadas = tipoEvento.tareas;
    }
  }

  accion($event:any){
    $event.preventDefault();
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

}
