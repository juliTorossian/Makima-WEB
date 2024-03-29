import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom, tap } from 'rxjs';
import { ModalSeleccionUsuarioComponent } from 'src/app/componentes/modal-seleccion-usuario/modal-seleccion-usuario.component';
import { Evento } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { EventoAccionService } from 'src/app/servicios/evento-accion.service';
import { EventoService } from 'src/app/servicios/evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ModalEstimacionComponent } from '../componentes/modal-estimacion/modal-estimacion.component';
@Component({
  selector: 'app-eventos-usuario',
  templateUrl: './eventos-usuario.component.html',
  styleUrls: ['./eventos-usuario.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class EventosUsuarioComponent {
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  private eventoService = inject(EventoService);
  private eventoAccion = inject(EventoAccionService);
  private usuarioService = inject(UsuarioService);

  ref!: DynamicDialogRef;

  eventoDialog!: boolean;
  eventos!: Evento[];
  eventosSave!: Evento[];
  evento!: Evento;
  eventoSeleccionado!: Evento[];
  // usuario!: Usuario;

  filtroVerCerrados: boolean = false; // false no muestra los cerrados

  submitted!: boolean;
  statuses!: any[];


  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla(){
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
  muestraAvanzar(evento:Evento){
    // console.log(evento);
    let muestra = true;

    if (evento.cerrado) { muestra = false }

    if (evento.detalle?.eventoCircuito.act.tarea?.controla){
      if (!evento.detalle.eventoCircuito.act.tarea.completada){
        muestra = false;
      }
    }

    return muestra;
  }
  muestraRetroceder(evento:Evento){
    return ( (!evento.cerrado) &&
            (evento.detalle?.eventoCircuito.ant.tiene ));
  }

  muestraEstimar(evento:Evento){
  // en el caso de estimacion, la logica es cuando SI muestra
    let muestra = false;

    // if (evento.cerrado) { muestra = false }
    
    if (evento.detalle?.eventoCircuito.act.tarea?.controla){
      if (evento.detalle?.eventoCircuito.act.tarea.clave === "ESTIMAR"){
        muestra = true;
      }
    }
    return muestra;

    // return ((!evento.cerrado) &&
    //         (evento.detalle?.eventoCircuito.act.tarea?.controla === "56e8801a608c8975fe1e122c" ));
  }

  avanzar(evento:Evento){
    // console.log(evento.detalle?.eventoCircuito);

    const data = {
      rol: evento.detalle?.eventoCircuito.sig.tarea?.rol,
      reqComentario: evento.detalle?.eventoCircuito.act.tarea?.reqComentario,
      comentario: "",//evento.detalle?.eventoCircuito.act.tarea?.comentario,
      mensaje: "Proxima tarea: " +evento.detalle?.eventoCircuito.sig.tarea?.nombre
    }

    this.ref = this.dialogService.open(ModalSeleccionUsuarioComponent, {
      header: "Seleccionar usuario",
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10,
      data: data
    });

    this.ref.onClose.subscribe((res:any) => {
      // console.log(res);
      if (res){
        // console.log(res.usuarioSeleccionado);
        this.eventoAccion.avanzarEvento(evento, res.usuarioSeleccionado, res.comentario).subscribe({
          next: (res) => {
            // console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: ()=>this.llenarTabla()
        });
      }
    });
  }
  
  retroceder(evento:Evento){
    
    const data = {
      rol: evento.detalle?.eventoCircuito.ant.tarea?.rol,
      reqComentario: true,
      comentario: "",
      mensaje: "Tarea a retroceder: " +evento.detalle?.eventoCircuito.ant.tarea?.nombre
    }

    this.ref = this.dialogService.open(ModalSeleccionUsuarioComponent, {
      header: "Seleccionar usuario",
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10,
      data: data
    });

    this.ref.onClose.subscribe((res:any) => {
      if (res){
        console.log(res);
        this.eventoAccion.retrocederEvento(evento, res.usuarioSeleccionado, res.comentario).subscribe({
          next: (res) => {
            // console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: ()=>this.llenarTabla()
        });
      }
    });
  }
  
  reasignar(evento:Evento){

    // const rol = evento.detalle?.eventoCircuito.act.tarea?.rol
    
    const data = {
      rol: evento.detalle?.eventoCircuito.act.tarea?.rol,
      reqComentario: false,
      comentario: "",
      mensaje: "Evento en tarea: " +evento.detalle?.eventoCircuito.act.tarea?.nombre
    }

    this.ref = this.dialogService.open(ModalSeleccionUsuarioComponent, {
      header: "Seleccionar usuario",
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10,
      data: data
    });

    this.ref.onClose.subscribe((res: any) => {
      if (res){
        // console.log(res);
        this.eventoAccion.reasignarEvento(evento, res.usuarioSeleccionado).subscribe({
          next: (res) => {
            // console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: ()=>this.llenarTabla()
        });
      }
    });
  }
  
  estimar(evento:Evento){

    console.log(evento)

    let estimacionRol = 0;
    evento.detalle?.eventoHoras.estimacion.detalle.map( (est) => {
      console.log(est);
      if (est.rol === evento.detalle?.eventoCircuito.act.tarea?.rol){
        estimacionRol = est.estimacion;
      }
    } )

    const data = {
      estimacion: estimacionRol,
      comentario: ""
    };

    let estimacionAux = {
      evento: evento.id,
      usuario: evento.usuarioActual.id,
      rol: evento.detalle?.eventoCircuito.act.tarea?.rol,
      comentario: "",
      estimacion: 0
    }

    this.ref = this.dialogService.open(ModalEstimacionComponent, {
      header: "Estimar evento",
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10,
      data: data
    });

    this.ref.onClose.subscribe((estimacion:any) => {
      if (estimacion){
        
        estimacionAux.comentario = estimacion.comentario;
        estimacionAux.estimacion = estimacion.estimacion;

        this.eventoAccion.estimarEvento(estimacionAux).subscribe({
          next: (res) => {
            // console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: ()=>this.llenarTabla()
        });
      }
    });
  }


}
