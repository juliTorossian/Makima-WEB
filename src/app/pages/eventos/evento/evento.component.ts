import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit{
  private rutActiva = inject(ActivatedRoute);

  private eventoService = inject(EventoService);

  evento!: Evento;
  porcentajeAvance! : any;

  comentarios!: Comentario[];

  public Editor:any = ClassicEditor;
  public nuevoComentario!: string;

  ngOnInit(): void {
    
    const eventoId = this.rutActiva.snapshot.params['evento'];

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

  comentar(){
    console.log(this.nuevoComentario);
  }

}
