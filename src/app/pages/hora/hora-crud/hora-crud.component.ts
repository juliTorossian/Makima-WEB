import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Evento } from 'src/app/interfaces/evento';
import { RegistroHora } from 'src/app/interfaces/hora';
import { Usuario } from 'src/app/interfaces/usuario';
import { EventoService } from 'src/app/servicios/evento.service';
import { HoraService } from 'src/app/servicios/hora.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SeleccionarEventoComponent } from '../../../componentes/seleccionar-evento/seleccionar-evento.component';

@Component({
  selector: 'app-hora-crud',
  templateUrl: './hora-crud.component.html',
  styleUrls: ['./hora-crud.component.css']
})
export class HoraCrudComponent implements OnInit{
  private ref = inject(DynamicDialogRef);
  private refEvento = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);

  private usuarioService = inject(UsuarioService);

  @ViewChild('inputInicio') horaInicio!: ElementRef;
  @ViewChild('inputFinal') horaFinal!: ElementRef;

  private eventoService = inject(EventoService);

  modo!: any;

  evento!: Evento[];
  eventos!: Evento[];
  eventosFiltrados!: Evento[];

  id!: string;
  fecha: Date = new Date();
  usuario!: Usuario;
  totalHoras: number = 0;
  horas: any[] = [{ id: "", evento: {id: "", evento: ""}, inicio: "", final: "", total: 0, observaciones: "" }];

  agregarFila() {
    this.horas.push({ id: "", evento: {id: "", evento: ""}, inicio: "", final: "", total: 0, observaciones: "" })
  }
  eliminarFila(horaEliminar:any) {
    this.horas = this.horas.filter((item) => item.inicio !== horaEliminar.inicio)
  }

  ngOnInit(){
    // console.log(this.config.data.hora.registroHoras);

    this.eventoService.getEventos().subscribe({
      next: (res) => {
        this.eventos = res;
      }
    })

    this.modo = this.config.data.modo;
    let registroHoras = this.config.data.hora;
    if (registroHoras){
      this.id = registroHoras.id;
      this.fecha = new Date(registroHoras.fecha);
      this.usuario = registroHoras.usuario;
      this.totalHoras = registroHoras.totalHoras;

      // console.log(registroHoras.horas);
      this.horas = [];
      registroHoras.horas.map( (h:any) => {
        console.log(h);
        this.horas.push( { id: h.id, evento: {id: h.evento.id, evento: `${h.evento.tipo}-${h.evento.numero}`}, inicio: h.inicio, final: h.final, total: h.total, observaciones: h.observaciones } )
      })

      // this.horas = registroHoras.horas;
    }
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuario = res;
      }
    })
  }

  accion($event:any){
    $event.preventDefault();
    let ok = true;

    this.horas.map( (h) => {
      if (h.evento.id === ""){
        this.messageService.add({ severity: 'warn', summary: '', detail: `El campo "Evento" no puede quedar vacio.` });
        ok = false;
      }
      if (h.inicio === "" || h.final === ""){
        this.messageService.add({ severity: 'warn', summary: '', detail: `Los campos "Inicio" y "Final" no pueden quedar vacios` });
        ok = false;
      }
    })

    let sumaHoras = 0;

    // console.log(this.fecha)
    this.horas.map( (hora) => {
      sumaHoras += hora.total
    })

    // let date = new Date(this.fecha);
    const registroHoras : RegistroHora = {
      id: this.id,
      fecha: this.fecha.toJSON().substring(0,10),
      usuario: this.usuario.id,
      totalHoras: sumaHoras,
      horas: this.horas
    }

    console.log(registroHoras);
    if (ok){
      // this.ref.close(registroHoras);
    }
  }

  actualizarTotal(hora:any){
    console.log("onComplete");
    console.log(hora);
    let diferenciaEnHoras = 0;

    if (this.comprobarHora(hora.inicio)){
      if (this.comprobarHora(hora.final)){
        diferenciaEnHoras = this.getDiferenciaHoras(hora.inicio, hora.final)
      }
      // else{
      //   hora.final = "";
      // }
    }
    // else{
    //   hora.inicio = "";
    // }
    hora.total = diferenciaEnHoras;

  }
  getDiferenciaHoras(inicio:string, final:string){
    let diferenciaEnHoras = 0;
    if (this.comprobarFormatoHora(inicio) && this.comprobarFormatoHora(final)){
      
      const date1 = new Date(`2000-01-01T${inicio}:00`);
      const date2 = new Date(`2000-01-01T${final}:00`);
  
      const diferenciaEnMillisegundos = date2.getTime() - date1.getTime();
      diferenciaEnHoras = diferenciaEnMillisegundos / (1000 * 60 * 60);
    }
    return diferenciaEnHoras;
  }
  comprobarFormatoHora(hora: string): boolean {
    const regex = /^\d{2}:\d{2}$/; // Expresión regular para hh:mm
    return regex.test(hora);
  }
  comprobarHora(hora: string): boolean{
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(hora)
  }


  seleccionarEvento(hora:any){

    // const data = {hora, modo}

    this.refEvento = this.dialogService.open(SeleccionarEventoComponent, {
      header: 'Editar hora',
      width: '85%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      // data: data
    });

    this.refEvento.onClose.subscribe((eventoSel: any) => {
      // console.log(eventoSel);
      if(eventoSel){
        let aux = {id: eventoSel.id, "evento": `${eventoSel.tipo}-${eventoSel.numero}`}
        hora.evento = aux;
      }
    });

  }
  completarHora(index:any){
    console.log(this.horas[index])
    // console.log(hora)
    let horaAux = this.horas[index].inicio.replaceAll('_', '0');

    // if (cual === 'inicio'){
      this.horas[index].inicio = horaAux
    // }else{
    //   hora.final = horaAux+':00'
    // }
    // console.log(hora)
    this.actualizarTotal(this.horas[index]);  
  }

  filtroEvento(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.eventos.length; i++) {
      let EventoAux = this.eventos[i];
      // if (clienteAux.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      if (EventoAux.busqueda.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(EventoAux);
      }
    }

    this.eventosFiltrados = filtered;
  }
  selEvento(event:any){
    console.log(event);
    this.actualizarEvento(event)
  }
  actualizarEvento(evento:any){
    this.evento = evento;
  }

}
