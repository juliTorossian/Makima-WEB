import { HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  urlCarga: string = "http://localhost:4000/api/v1/evento/";


  ngOnInit() {
    this.headers.set('Content-Type', ['multipart/form-data']);
    console.log(this.config.data);

    if(this.config.data){
      this.eventoId = this.config.data.eventoId;
      this.urlCarga += this.eventoId + "/adjuntar?usuario="+this.config.data.usuarioId
    }
  }

  onUpload(event:UploadEvent) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
      

      // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  cerrar() {
    // if (this.estimacion && this.estimacion > 0){
      // let respuesta = {
      //   estimacion: this.estimacion,
      //   comentario: this.comentario
      // }
      this.ref.close(this.uploadedFiles);
    // }
  }


}
