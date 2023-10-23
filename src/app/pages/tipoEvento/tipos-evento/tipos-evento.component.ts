import { Component, HostListener, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Shortcut } from 'src/app/interfaces/shortcut';
import { TipoEvento } from 'src/app/interfaces/tipo-evento';
import { TipoEventoService } from 'src/app/servicios/tipo-evento.service';
import { TipoEventoCrudComponent } from '../tipo-evento-crud/tipo-evento-crud.component';

@Component({
  selector: 'app-tipos-evento',
  templateUrl: './tipos-evento.component.html',
  styleUrls: ['./tipos-evento.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class TiposEventoComponent {
  @HostListener('window:'+Shortcut.ALTA, ['$event'])
  sc_alta(event: KeyboardEvent) {
    event.preventDefault();
    this.mostrarModalCrud(null, 'A');
  }

  tipoEventos!: TipoEvento[];
  tipoEvento!: TipoEvento;
  tipoEventoSeleccionado!: TipoEvento[];

  ref!: DynamicDialogRef;

  private dialogService = inject(DialogService);
  private tipoEventoService = inject(TipoEventoService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  
  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla(){
    this.tipoEventoService.getTipoEventos().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.tipoEventos = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  alta(tipoEvento : TipoEvento) {
    
    if (tipoEvento) {
      this.tipoEventoService.setTipoEvento(tipoEvento).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Tipo de evento creado', detail: `Se creo el Tipo de Evento` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el Tipo de Evento` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
    
  }

  editar(tipoEvento: TipoEvento) {

    if (tipoEvento) {
      this.tipoEventoService.putTipoEvento(tipoEvento).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Tipo de Evento modificado', detail: `Se modifico el Tipo de Evento` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el Tipo de Evento` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  deleteSeleccionado() {
    console.log(this.tipoEventoSeleccionado);
    
    this.tipoEventoSeleccionado.map( (tipoEvento) => {
      // console.log(tipoEvento);
      this.deleteTipoEvento(tipoEvento);
    })
  }

  deleteSolo(tipoEvento : TipoEvento){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el Tipo de Evento?',
      header: 'Eliminar Cliente',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteTipoEvento(tipoEvento);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Tipo de Evento' });
      }
    });
  }

  deleteTipoEvento(tipoEvento: TipoEvento) {
    this.tipoEventoService.deleteTipoEvento(tipoEvento).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Tipo de Evento Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el Tipo de Evento` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  mostrarModalCrud(tipoEvento: TipoEvento | null, modo:any){
    let tipoEventoRes! : TipoEvento;
    let header = "";
    if (modo === 'A'){
      header = "Nuevo Tipo de Evento";
    }else if (modo === 'M'){
      header = "Modificar Tipo de Evento";
    }

    const data = {tipoEvento, modo}

    this.ref = this.dialogService.open(TipoEventoCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: data
    });

    this.ref.onClose.subscribe((tipoEventoCrud: TipoEvento) => {
      tipoEventoRes = tipoEventoCrud
      if (modo === 'M'){
        this.editar(tipoEventoRes)
      }
      if (modo === 'A'){
        this.alta(tipoEventoRes)
      }
    });
  }
  
  getSeverity(status: boolean) {
    if (status){
      return 'success';
    }else{
      return 'danger';
    } 
  }
}
