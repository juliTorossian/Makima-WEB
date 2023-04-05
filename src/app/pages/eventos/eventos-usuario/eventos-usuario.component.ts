import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { EventoService } from 'src/app/servicios/evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-eventos-usuario',
  templateUrl: './eventos-usuario.component.html',
  styleUrls: ['./eventos-usuario.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class EventosUsuarioComponent {

  eventoDialog!: boolean;
  eventos!: Evento[];
  eventosSave!: Evento[];
  evento!: Evento;
  eventoSeleccionado!: Evento[];
  // usuario!: Usuario;

  filtroVerCerrados: boolean = false; // false no muestra los cerrados

  submitted!: boolean;
  statuses!: any[];

  private eventoService = inject(EventoService);
  private usuarioService = inject(UsuarioService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    const token = this.usuarioService.getToken();
    this.usuarioService.getUsuarioToken(token).subscribe({
      next: (usuario) => {
        this.eventoService.getEventosUsuario(usuario.id).subscribe((res) => {
          // console.log(res);
          this.eventosSave = res;
          this.eventos = this.eventosSave.filter((r:any) => r.cerrado === 0);
        });    
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openNew() {
    // this.evento = {};
    this.submitted = false;
    this.eventoDialog = true;
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
    this.evento = { ...evento };
    this.eventoDialog = true;
  }

  deleteEvento(evento: Evento) {
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
    if (this.filtroVerCerrados){
      this.eventos = this.eventosSave;
    }else{
      this.eventos = this.eventosSave.filter((r:any) => r.cerrado === 0);
    }
  }
}
