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

  openNew() {
    // this.evento = {};

    this.mostrarModalCrud(null, 'A');

  }

  deleteEventoSeleccionado() {
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

  editEvento(evento: Evento) {

    this.mostrarModalCrud(evento, 'M');

    // this.ref = this.dialogService.open(EventoCRUDComponent, {
    //   header: 'Editar evento',
    //   width: '70%',
    //   contentStyle: { overflow: 'auto' },
    //   baseZIndex: 10000,
    //   maximizable: true,
    //   data: evento
    // });

    // this.ref.onClose.subscribe((eventoCrud: Evento) => {
    //   if (eventoCrud) {
    //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: eventoCrud.titulo });
    //   }
    // });

    // this.evento = { ...evento };
    // this.eventoDialog = true;
  }

  deleteEvento(evento: Evento) {

    console.log('deleteEvento');
    console.log(evento);
    

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

  hideDialog() {
    this.eventoDialog = false;
    this.submitted = false;
  }

  saveEvento() {
    this.submitted = true;

    if (this.evento.id.trim()) {
      if (this.evento.id) {
        this.eventos[this.findIndexById(this.evento.id)] = this.evento;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        // this.evento.id = this.createId();
        // this.evento.image = 'product-placeholder.svg';
        this.eventos.push(this.evento);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.eventos = [...this.eventos];
      this.eventoDialog = false;
      // this.evento = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.eventos.length; i++) {
      if (this.eventos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
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
      if (eventoCrud) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: eventoCrud.titulo });
      }
    });
  }

  // createId(): string {
  //   let id = '';
  //   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
