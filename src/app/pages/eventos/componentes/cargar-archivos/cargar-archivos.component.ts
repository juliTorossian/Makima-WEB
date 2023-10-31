import { HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getURL } from 'src/app/helpers/url';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-cargar-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.css']
})
export class CargarArchivosComponent implements OnInit{
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  
  uploadedFiles: any[] = [];
  headers: HttpHeaders = new HttpHeaders;

  eventoId!: string;
  // urlCarga: string = "http://localhost:4000/api/v1/evento/";
  urlCarga: string = getURL() +'/evento/';

  chooseLabel: string = "Seleccionar";
  uploadLabel: string = "Enviar";
  cancelLabel: string = "Cancelar";


  ngOnInit() {
    this.headers.set('Content-Type', ['multipart/form-data']);
    console.log(this.config.data);

    if(this.config.data){
      this.eventoId = this.config.data.eventoId;
      this.urlCarga += this.eventoId + "/adjuntar?usuario="+this.config.data.usuarioId
    }
  }

  onUpload(event:UploadEvent) {
    // console.log(event);
    this.cerrar(true);
  }
  onError(event:any){
    // console.log(event);
    this.cerrar(false);
  }

  cerrar(ok:boolean) {
    this.ref.close(ok);
  }


}
