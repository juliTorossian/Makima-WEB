import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Entorno } from 'src/app/interfaces/entorno';
import { EntornoService } from 'src/app/servicios/entorno.service';
import { EntornoCrudComponent } from '../entorno-crud/entorno-crud.component';

@Component({
  selector: 'app-entornos',
  templateUrl: './entornos.component.html',
  styleUrls: ['./entornos.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class EntornosComponent {
  entornos!: Entorno[];
  entorno!: Entorno;
  entornoSeleccionado!: Entorno[];

  ref!: DynamicDialogRef;

  private dialogService = inject(DialogService);
  private entornoService = inject(EntornoService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla(){
    this.entornoService.getEntornos().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.entornos = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  alta(entorno : Entorno) {
    
    if (entorno) {
      this.entornoService.setEntorno(entorno).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Entorno creado', detail: `Se creo el Entorno` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el Entorno` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
    
  }

  editar(entorno: Entorno) {

    if (entorno) {
      this.entornoService.putEntorno(entorno).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Entorno modificado', detail: `Se modifico el Entorno` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el Entorno` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  deleteSeleccionado() {
    console.log(this.entornoSeleccionado);
    
    this.entornoSeleccionado.map( (entorno) => {
      // console.log(entorno);
      this.delete(entorno);
    })
  }

  deleteSolo(entorno : Entorno){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el Entorno?',
      header: 'Eliminar Entorno',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(entorno);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Entorno' });
      }
    });
  }

  delete(entorno: Entorno) {
    this.entornoService.deleteEntorno(entorno).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Entorno Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el Entorno` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  mostrarModalCrud(entorno: Entorno | null, modo:any){
    let entornoRes! : Entorno;
    let header = "";
    if (modo === 'A'){
      header = "Nuevo Entorno";
    }else if (modo === 'M'){
      header = "Modificar Entorno";
    }

    const data = {entorno, modo}

    this.ref = this.dialogService.open(EntornoCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((entornoCrud: Entorno) => {
      entornoRes = entornoCrud
      if (modo === 'M'){
        this.editar(entornoRes)
      }
      if (modo === 'A'){
        this.alta(entornoRes)
      }
    });
  }
}
