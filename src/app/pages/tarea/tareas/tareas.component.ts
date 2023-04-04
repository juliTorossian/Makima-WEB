import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaCrudComponent } from '../tarea-crud/tarea-crud.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class TareasComponent {
  tareas!: Tarea[];
  tarea!: Tarea;
  tareaSeleccionada!: Tarea[];

  ref!: DynamicDialogRef;

  private dialogService = inject(DialogService);
  private tareaService = inject(TareaService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla(){
    this.tareaService.getTareas().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.tareas = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newTarea(tarea : Tarea) {
    
    if (tarea) {
      this.tareaService.setTarea(tarea).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Tarea creada', detail: `Se creo la tarea` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear la tarea` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
    
  }

  editTarea(tarea: Tarea) {

    if (tarea) {
      this.tareaService.putTarea(tarea).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Tarea modificado', detail: `Se modifico la tarea` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar la tarea` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  deleteClienteSeleccionado() {
    console.log(this.tareaSeleccionada);
    
    this.tareaSeleccionada.map( (tarea) => {
      // console.log(tarea);
      this.deleteCliente(tarea);
    })
  }

  deleteClienteSolo(tarea : Tarea){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el cliente?',
      header: 'Eliminar Cliente',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteCliente(tarea);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino la tarea' });
      }
    });
  }

  deleteCliente(tarea: Tarea) {
    this.tareaService.deleteTarea(tarea).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Tarea Eliminada' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar la tarea` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  mostrarModalCrud(tarea: Tarea | null, modo:any){
    let tareaRes! : Tarea;
    let header = "";
    if (modo === 'A'){
      header = "Nueva Tarea";
    }else if (modo === 'M'){
      header = "Modificar Tarea";
    }

    const data = {tarea, modo}

    this.ref = this.dialogService.open(TareaCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((tareaCrud: Tarea) => {
      tareaRes = tareaCrud
      if (modo === 'M'){
        this.editTarea(tareaRes)
      }
      if (modo === 'A'){
        this.newTarea(tareaRes)
      }
    });
  }






}
