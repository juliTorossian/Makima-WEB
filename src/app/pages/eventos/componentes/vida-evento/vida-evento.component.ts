import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';

@Component({
  selector: 'app-vida-evento',
  templateUrl: './vida-evento.component.html',
  styleUrls: ['./vida-evento.component.css']
})
export class VidaEventoComponent implements OnInit{
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private eventoService = inject(EventoService);

  vidaEvento! :any[];
  evento!: Evento;

  ngOnInit(){
    console.log(this.config.data);
    this.evento = this.config.data;

    this.eventoService.getVidaEvento(this.evento.id).subscribe({
      next: (res:any) => {
        this.vidaEvento = res;
      }
    });
  }
  obtenerColor(accion:string) :string{
    let color = "";
    if (accion === 'CREO'){
      color = "#1e8c93";
    }
    if (accion === 'AVANZO'){
      color = "#dbd8a2";
    }
    if (accion === 'COMENTO'){
      color = "#4b3e4d";
    }
    return color;
  }
}
