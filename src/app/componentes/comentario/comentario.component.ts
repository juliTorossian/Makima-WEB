import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit{
  @Input() comentario!: Comentario;
  // @ViewChild("outsideElement", {static: true}) outsideElement! : ElementRef;
  // @ViewChild('modalView', {static: true}) modalView$! : ElementRef;
  @ViewChild('file', {static: true}) fileView! : ElementRef;
  // @ViewChild('link') fileView! : ElementRef;

  ngOnInit(): void {
    // console.log(this.fileView.nativeElement.data);
    // console.log(this.fileView.nativeElement.type);
    // this.fileView.nativeElement.data = `data:${this.comentario.adjunto.tipo};base64,${this.comentario.adjunto.base}`
    // this.fileView.nativeElement.type = this.comentario.adjunto.tipo

    console.log(this.fileView)
    if (this.fileView){
      const blob = new Blob([this.comentario.adjunto.base], { type: this.comentario.adjunto.tipo });
      const url = window.URL.createObjectURL(blob);
  
      this.fileView.nativeElement.href = url;
    }
  }

  get commentHtml(): string {
    return this.comentario.comentario ? this.comentario.comentario.replace(/\n/g, '<br>') : '';
  }

  // openModal() {
  //   console.log(this.fileView.nativeElement.data);
  //   console.log(this.fileView.nativeElement.type);
  //   this.modalView$.nativeElement.classList.add('visible');
  // }

  // closeModal() {
  //   this.modalView$.nativeElement.classList.remove('visible');
  // }

  // @HostListener('document:click', ['$event.target'])
  // public onClick(targetElement:any) {
  //   const outsideElement = this.outsideElement.nativeElement.contains(targetElement);
  //   if (outsideElement) {
  //     this.modalView$.nativeElement.classList.remove('visible');
  //   } 
  // }

  getAdjuntoUrl(adjunto:any){
    // return `data:${adjunto.tipo};base64,${adjunto.base}`
    const blob = new Blob([adjunto.base], { type: adjunto.tipo });
    const url = window.URL.createObjectURL(blob);
    return url
  }

}
