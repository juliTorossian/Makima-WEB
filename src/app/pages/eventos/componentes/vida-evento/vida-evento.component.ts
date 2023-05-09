import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';
import { NovedadesColor, NovedadesMensaje } from 'src/app/utilidades/novedades-mensaje';

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
    // console.log(this.config.data);
    this.evento = this.config.data;

    this.eventoService.getVidaEvento(this.evento.id).pipe(
      tap((res:any) => {console.log(res)})
    )
    .subscribe({
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
    const keys = Object.keys(NovedadesMensaje);
    const values = Object.values(NovedadesMensaje);
    let texto = "";
    keys.forEach((key, index) => {
      if (key === accion){
        texto = values[index];
      }
    });

    let evento = `<div [routerLink]="['/evento/${vida.evento.id}']"><p-badge value="${vida.evento.evento}" class="my-badge" severity="success"></p-badge></div>`;

    texto = texto.replaceAll('&usuario', vida.usuario.usuario);
    texto = texto.replaceAll('&evento', evento);
    texto = texto.replaceAll('&tarea', vida.tarea);

    // console.log(texto); 

    return texto;
  }
}
