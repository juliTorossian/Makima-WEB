import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Evento } from 'src/app/interfaces/evento';
import { RegistroHora } from 'src/app/interfaces/hora';
import { Usuario } from 'src/app/interfaces/usuario';
import { HoraService } from 'src/app/servicios/hora.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-hora-crud',
  templateUrl: './hora-crud.component.html',
  styleUrls: ['./hora-crud.component.css']
})
export class HoraCrudComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private usuarioService = inject(UsuarioService);

  modo!: any;

  evento!: Evento[];

  id!: string;
  fecha!: string;
  usuario!: Usuario;
  totalHoras: number = 0;
  horas: any[] = [];

  agregarFila() {
    this.horas.push({ id: "", evento: "", inicio: "", final: "", total: 0, observaciones: "" })
  }
  eliminarFila(horaEliminar:any) {
    this.horas = this.horas.filter((item) => item.inicio !== horaEliminar.inicio)
  }

  ngOnInit(){
    console.log(this.config.data);
    this.modo = this.config.data.modo;
    let registroHoras = this.config.data.registroHoras;
    if (registroHoras){
      this.id = registroHoras.id;
      this.fecha = registroHoras.fecha;
      this.usuario = registroHoras.usuario;
      this.totalHoras = registroHoras.totalHoras;
      this.horas = registroHoras.horas;
    }
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuario = res;
      }
    })
  }

  accion($event:any){
    $event.preventDefault();

    let date = new Date(this.fecha);
    const registroHoras : RegistroHora = {
      id: this.id,
      fecha: date.toJSON().substring(0,10),
      usuario: this.usuario.id,
      totalHoras: this.totalHoras,
      horas: this.horas
    }

    this.ref.close(registroHoras);
  }

  actualizarTotal(hora:any){
    console.log(hora);
    let diferenciaEnHoras = 0;

    if (this.comprobarHora(hora.inicio)){
      if (this.comprobarHora(hora.final)){
        if (this.comprobarFormatoHora(hora.inicio) && this.comprobarFormatoHora(hora.final)){
          // Convertir horas a objetos Date
          const date1 = new Date(`2000-01-01T${hora.inicio}:00`);
          const date2 = new Date(`2000-01-01T${hora.final}:00`);
      
          // Calcular la diferencia en horas
          const diferenciaEnMillisegundos = date2.getTime() - date1.getTime();
          diferenciaEnHoras = diferenciaEnMillisegundos / (1000 * 60 * 60);
          
        }
      }else{
        hora.final = "";
      }
    }else{
      hora.inicio = "";
    }
    hora.totalHoras = diferenciaEnHoras;

  }
  comprobarFormatoHora(hora: string): boolean {
    const regex = /^\d{2}:\d{2}$/; // Expresión regular para hh:mm
    return regex.test(hora);
  }
  comprobarHora(hora: string): boolean{
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(hora)
  }
}
