import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/servicios/evento.service';

@Component({
  selector: 'app-seleccionar-evento',
  templateUrl: './seleccionar-evento.component.html',
  styleUrls: ['./seleccionar-evento.component.css']
})
export class SeleccionarEventoComponent  implements OnInit {
  private eventoService = inject(EventoService)
  public ref = inject(DynamicDialogRef)

  eventos!: Evento[];

  ngOnInit() {
    this.eventoService.getEventos().subscribe({
      next: (res : any) => {
        console.log(res);
        this.eventos = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  select(eventoSel: Evento) {
    let evento = {id: eventoSel.id, "evento": `${eventoSel.tipo}-${eventoSel.numero}`}
    this.ref.close(evento);
  }
}
