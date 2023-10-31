import { Component, inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';
import { NovedadesColor, NovedadesMensaje, VidaMensaje } from 'src/app/utilidades/novedades-mensaje';

@Component({
  selector: 'app-vida-evento',
  templateUrl: './vida-evento.component.html',
  styleUrls: ['./vida-evento.component.css']
})
export class VidaEventoComponent implements OnInit{
  @Input() eventoId: string = "";

  // private ref = inject(DynamicDialogRef);
  // private config = inject(DynamicDialogConfig);

  private eventoService = inject(EventoService);
  private sanitizer = inject(DomSanitizer);

  vidaEvento! :any[];
  evento!: Evento;

  ngOnInit(){
    this.eventoService.getEvento(this.eventoId).subscribe({
      next: (res:any) => {
        this.evento = res;
        this.getVida();
      }
    })
  }
  getVida(){
    this.eventoService.getVidaEvento(this.evento.id).subscribe({
      next: (res:any) => {
        this.vidaEvento = res;
      }
    });
  }
  obtenerColor(accion:string) :string{
    // console.log(novedad);
    const keys = Object.keys(NovedadesColor);
    const values = Object.values(NovedadesColor);
    let texto = "";
    keys.forEach((key, index) => {
      if (key === accion){
        texto = values[index];
      }
    });
    return texto;
  }

  getTexto(accion:string, vida:any){
    // console.log(novedad);
    const keys = Object.keys(VidaMensaje);
    const values = Object.values(VidaMensaje);
    let texto = "";
    keys.forEach((key, index) => {
      if (key === accion){
        texto = values[index];
      }
    });

    // <app-badge color="#002d00" text="Ejemplo" url="/ruta-de-destino"></app-badge>
    let usuario = `<app-badge color="#002d00" text="${vida.usuario.usuario}" url="/usuario/${vida.usuario.id}"></app-badge>`
    
    texto = texto.replaceAll('&usuario', vida.usuario.usuario);
    texto = texto.replaceAll('&tarea', vida.tarea);
    
    // console.log(texto); 
    // this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
    let safeTexto = this.sanitizer.bypassSecurityTrustHtml(texto);
    // console.log(safeTexto);

    return safeTexto;
  }

  getBadgeHTML(): string {
    const text = 'hola';
    const color = '#000';
  
    return `<p><app-badge text="${text}" color="${color}"></app-badge> como va</p>`;
  }
}


