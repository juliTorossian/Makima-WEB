import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';
import { EventoCRUDComponent } from '../evento-crud/evento-crud.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})

export class EventosComponent implements OnInit {
  eventoDialog!: boolean;
  eventos!: Evento[];
  eventosSave!: Evento[];
  evento!: Evento;
  eventoSeleccionado!: Evento[];

  filtroVerCerrados: boolean = false; // false no muestra los cerrados

  ref!: DynamicDialogRef;
  submitted!: boolean;
  statuses!: any[];

  // constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  private dialogService = inject(DialogService);
  private eventoService = inject(EventoService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.eventoService.getEventos().pipe(
    ).subscribe((res) => {
      // console.log(res);
      this.eventosSave = res;
      this.eventos = this.eventosSave.filter((r:any) => r.cerrado === 0);
    });
  }

  alta(evento : Evento) {

  }

  editar(evento: Evento) {
 
  }
  
  deleteSeleccion() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventos = this.eventos.filter((val) => !this.eventoSeleccionado.includes(val));
        // this.eventoSeleccionado = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }
  
  deleteSolo(evento: Evento) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + evento.tipo +evento.numero.toString() + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventos = this.eventos.filter((val) => val.id !== evento.id);
        // this.evento = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  delete(evento : Evento){
    
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  filtraEventosCerrado(){
    console.log(this.filtroVerCerrados);
    if (this.filtroVerCerrados){
      this.eventos = this.eventosSave;
    }else{
      this.eventos = this.eventosSave.filter((r:any) => r.cerrado === 0);
    }
  }

  mostrarModalCrud(evento: Evento | null, modo:any){

    const data = {evento, modo}

    this.ref = this.dialogService.open(EventoCRUDComponent, {
      header: 'Editar evento',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((eventoCrud: Evento) => {
      console.log(eventoCrud);
      
      if (eventoCrud) {
        if (modo === 'M'){
          this.editar(eventoCrud)
        }else if (modo === 'A'){
          this.alta(eventoCrud)
        }
      }
    });
  }
}
