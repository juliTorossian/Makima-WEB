import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { map } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento';
import { TotalComoNumeroPipe } from 'src/app/pipes/total-como-numero.pipe';
import { EventoService } from 'src/app/servicios/evento.service';
import { EventoCRUDComponent } from '../evento-crud/evento-crud.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Rol, Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})

export class EventosComponent implements OnInit {
  private dialogService = inject(DialogService);
  private eventoService = inject(EventoService);
  private usuarioService = inject(UsuarioService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  
  ref!: DynamicDialogRef;
  submitted!: boolean;
  statuses!: any[];

  eventoDialog!: boolean;
  eventos!: Evento[];
  eventosSave!: Evento[];
  evento!: Evento;
  eventoSeleccionado!: Evento[];

  usuario!: Usuario;
  permisos!: Rol;

  filtroVerCerrados: boolean = false; // false no muestra los cerrados

  ngOnInit() {
    this.identificarUsuario();
    this.llenarTabla()
  }

  identificarUsuario(){
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        console.log(res);
        this.usuario = res;
        this.permisos = this.usuarioService.getPermisos(this.usuario);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  tieneControl():boolean{
    return (this.permisos) && (this.permisos.controlTotal || this.permisos.controlEvento)
  }

  llenarTabla(){
    this.eventoService.getEventos().subscribe((res) => {
      console.log(res);
      this.eventosSave = res;
      this.eventos = this.eventosSave.filter((r:any) => r.cerrado === 0);
    });
  }

  alta(evento : Evento) {
    console.log("alta: ");
    console.log(evento);
    if (evento) {
      this.eventoService.setEvento(evento).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Evento creado', detail: `Se creo el evento` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el evento` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  editar(evento: Evento) {
    // console.log("editar: ");
    // console.log(evento);
    if (evento) {
      this.eventoService.putEvento(evento).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Evento modificado', detail: `Se modifico el Evento` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el Evento` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }
  
  deleteSeleccion() {
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar masivamente?',
      header: 'Eliminar Eventos',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eventoSeleccionado.map( (evento) => {
          // console.log(evento);
          this.delete(evento);
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se eliminaron los eventos' });
      }
    });
  }
  
  deleteSolo(evento: Evento) {
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el evento?',
      header: 'Eliminar Evento',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(evento);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el evento' });
      }
    });
  }

  delete(evento : Evento){
    this.eventoService.deleteEvento(evento).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Evento Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el Evento` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
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
        if (modo === 'M'){
          this.editar(eventoCrud)
        }else if (modo === 'A'){
          this.alta(eventoCrud)
        }
      }
    });
  }



  esPositivo(detalle:any){
    return (detalle.detalle?.eventoHoras?.estimacion - detalle.detalle?.eventoHoras?.total) > 0;
  }
}
