import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adjunto, Comentario } from 'src/app/interfaces/comentario';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CargarArchivosComponent } from '../componentes/cargar-archivos/cargar-archivos.component';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})

export class EventoComponent implements OnInit{
  // @ViewChild("adjunto", {
  //   read: ElementRef
  // }) adjunto!: ElementRef;

  ref!: DynamicDialogRef;
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private dialogService = inject(DialogService);

  private rutActiva = inject(ActivatedRoute);
  private location = inject(Location);

  private usuarioService = inject(UsuarioService);
  private eventoService = inject(EventoService);

  refVidaEvento!: DynamicDialogRef;
  currentUrl = this.location.path();

  eventoId!: string;
  evento!: Evento;
  usuario!: Usuario;
  porcentajeAvance! : any;

  comentarios!: Comentario[];
  archivosAdjuntos!: Adjunto[];


  public Editor:any = ClassicEditor;
  comentario: string = "";

  ngOnInit(): void {

    // Recupero el evento pasado en la URL y el usuario logueado
    this.eventoId = this.rutActiva.snapshot.params['evento'];
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuario = res;
      }
    })
    this.eventoService.getEvento(this.eventoId).subscribe({
      next: (res:any) => {
        this.evento = res;
        // calculo el porcentaje de avance del evento
        this.porcentajeAvance = Math.round((res.detalle.eventoCircuito.act.etapa * 100) / res.detalle.eventoCircuito.totalEtapas)
      }
    });

    this.cargarComentarios();
    this.cargarAdjuntos();

  }


  // ADJUNTOS
  
  // Busca los archivos adjuntos del evento
  cargarAdjuntos(){
    this.eventoService.getAdjuntos(this.eventoId).pipe(
      // tap( (res:any) => console.log(res))
    )
    .subscribe({
      next: (res:any) =>{
        this.archivosAdjuntos = res;
        // console.log(this.archivosAdjuntos);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Abre la ventana para adjuntar nuevos documentos
  adjuntarDocumentos(){
    const data = {
      eventoId: this.eventoId,
      usuarioId: this.usuario.id
    }
    
    this.ref = this.dialogService.open(CargarArchivosComponent, {
      header: "Seleccionar archivos",
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((aux: any) => {
      if (aux){
        console.log("ok");
      }else{
        console.log("err");
      }
      this.cargarAdjuntos();
    });
  }

  // Visualizar un documento
  verAdjunto(event:any){
    // console.log(event);

    const url = `data:${event.tipo};base64,${event.base}`;
    fetch(url)
    .then(res => res.blob())
    .then((a) => {
      window.open(window.URL.createObjectURL(a), "NOMBRE DE TAB");
    })
  }

  // Eliminar un documento
  // TODO - [ ] ver de agregar seguridad, todos los usuarios puede eliminar un documento?
  // TODO - [ ] agregar confirmacion de eliminar
  eliminarAdjunto(event:any){
    console.log(event);
    this.confirmationService.confirm({
      message: 'Esta seguro que queres hacer una eliminacion masiva de Usuarios?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eventoService.deleteAdjunto(event.id).subscribe({
          complete: () => {
            this.cargarAdjuntos()
          },
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el documento.' });
      }
    });
  }

  // COMENTARIOS

  // Grabar nuevo comentario
  comentar(evento:any){

    let comentario = {
      "eventoId": evento.id,
      "comentario": this.comentario,
      "usuario": this.usuario.id
    } 

    this.eventoService.setComentario(evento.id, comentario).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.limpiarComentario();
        this.cargarComentarios();
      }
    })
  }

  // Busca los comentarios del evento
  cargarComentarios(){
    this.eventoService.getComentarios(this.eventoId).subscribe({
      next: (res:any) =>{
        this.comentarios = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  // Limpia el editor
  limpiarComentario(){
    this.comentario = "";
  }

}
