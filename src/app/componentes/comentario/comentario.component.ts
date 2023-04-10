import { Component, Input } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent {

  @Input() comentario!: Comentario;

  get attachmentData(): string {
    if (this.comentario.adjunto.base) {
      // return `this.comentario.adjunto.base`;
      return `data:application/octet-stream;base64,${btoa(this.comentario.adjunto.base)}`;
    }
    return "no existe adjunto";
  }

  get commentHtml(): string {
    return this.comentario.comentario ? this.comentario.comentario.replace(/\n/g, '<br>') : '';
  }

}
