import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { tap } from 'rxjs';
import { HoraService } from 'src/app/servicios/hora.service';

@Component({
  selector: 'app-horas',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,

  ],
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class HorasComponent implements OnInit{

  private horaService = inject(HoraService);

  horas:any[] = [];
  seguridad!:any[];
  
  dateFilter = new Date();

  ngOnInit(){

    this.horaService.getHorasGenerales().pipe(
      // tap( (res:any) => { console.log(typeof(res)) })
    ).subscribe({
      next:(res:any) => {

        let save:any[] = [];
        let aux = Object.assign({}, res);


        for (let i = 0; i < aux.length; i++) {
          const element = aux[i];
          console.log(element)
        }

        this.seguridad = save;
        this.horas = save;
        // this.aplicarFiltroFecha(this.dateFilter);
      }
    })

  }
  aplicarFiltroFecha(fechaSel:any){
    console.log(this.seguridad);
    const save = this.seguridad;
    const fecha = new Date(fechaSel);

    let variableAuxiliar_1 = []
    for (let i = 0; i < save.length; i++) {
      const element = save[i];
      
      console.log(element)
      let registrosAux = []
      for (let j = 0; j < element.registros.length; j++) {
        const reg = element.registros[j];
        
        const fechaReg = new Date(reg.fecha);
        if ((fechaReg.getMonth() === fecha.getMonth()) && (fechaReg.getFullYear() === fecha.getFullYear())){
          // console.log(reg);
          registrosAux.push(reg);
        }
      }

      if (registrosAux.length > 0){
        element.registros = registrosAux;
        variableAuxiliar_1.push(element)
      }

    }
    console.log(variableAuxiliar_1);

  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
}
