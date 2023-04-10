import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit{
  @ViewChild("adjunto", {
    read: ElementRef
  }) adjunto!: ElementRef;

  private rutActiva = inject(ActivatedRoute);
  private location = inject(Location);
  private formBuilder = inject(FormBuilder);

  private usuarioService = inject(UsuarioService);
  private eventoService = inject(EventoService);

  
  currentUrl = this.location.path();
  evento!: Evento;
  usuario!: Usuario;
  porcentajeAvance! : any;

  comentarios!: Comentario[];

  public Editor:any = ClassicEditor;

  // comentarioForm = new FormGroup({
  //   comentario: new FormControl(""),
  //   adjunto: new FormControl("")
  // });

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


}
