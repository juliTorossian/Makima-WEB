import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VidaEventoComponent } from '../componentes/vida-evento/vida-evento.component';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class EventoComponent implements OnInit{
  @ViewChild("adjunto", {
    read: ElementRef
  }) adjunto!: ElementRef;

  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  private rutActiva = inject(ActivatedRoute);
  private location = inject(Location);

  private usuarioService = inject(UsuarioService);
  private eventoService = inject(EventoService);

  refVidaEvento!: DynamicDialogRef;
  
  currentUrl = this.location.path();
  evento!: Evento;
  usuario!: Usuario;
  porcentajeAvance! : any;

  comentarios!: Comentario[];

  public Editor:any = ClassicEditor;

  comentario: string = "";

  ngOnInit(): void {    
    const eventoId = this.rutActiva.snapshot.params['evento'];
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuario = res;
      }
    })

    this.eventoService.getEvento(eventoId).subscribe({
      next: (res:any) => {
        // console.log(res);
        this.evento = res;
        this.porcentajeAvance = Math.round((res.detalle.eventoCircuito.act.etapa * 100) / res.detalle.eventoCircuito.totalEtapas)
        // console.log(this.porcentajeAvance);
      }
    });

    this.eventoService.getComentarios(eventoId).subscribe({
      next: (res:any) =>{
        this.comentarios = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  onUpload($event:any){
    const uploadedFiles = $event.files;
    console.log(uploadedFiles);
  }

  comentar(evento:any){
    // console.log(this.comentarioForm.get("comentario")?.value);
    // console.log(this.comentarioForm.get("adjunto")?.value);
    console.log(this.adjunto.nativeElement.files);
    console.log(this.adjunto.nativeElement.files[0]);
    let comentarioAux = {
      "eventoId": evento.id,
      "comentario": this.comentario,
      "usuario": this.usuario.id
    } 
    const comentario = {
      "comentario": comentarioAux,
      "file": this.adjunto.nativeElement.files[0]
    }

    console.log(comentario);
    this.eventoService.setComentario(evento.id, comentario).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  verVidaEvento(evento:Evento){

    this.refVidaEvento = this.dialogService.open(VidaEventoComponent, {
      header: 'Vida del evento',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: evento
    });

    // this.refVidaEvento.onClose.subscribe((eventoCrud: Evento) => {
    // });
  }

}
