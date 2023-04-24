import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { HoraService } from 'src/app/servicios/hora.service';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class HorasComponent implements OnInit{

  private horaService = inject(HoraService);

  horas:any[] = [];
  horasSave!:any[];
  
  dateFilter = new Date();

  ngOnInit(){

    this.horaService.getHorasGenerales().pipe(
      tap( (res:any) => { console.log(res) })
    ).subscribe({
      next:(res:any) => {
        this.horasSave = res;
        this.horas = this.horasSave;
        // this.aplicarFiltroFecha(this.dateFilter);
      }
    })

  }
  aplicarFiltroFecha(fechaSel:any){
    const save = this.horasSave;
    console.log(save);
    console.log(this.horasSave);
    this.horas = this.horasSave;
    const aux = new Date(fechaSel);

    this.horas.map( (reg) => {
      console.log(reg);
      let regAux = reg;
      regAux.registros = reg.registros.filter( (r:any) => { 
        const d = new Date(r.fecha);
        return (d.getMonth() === aux.getMonth()) && (d.getFullYear() === aux.getFullYear())
      });
      this.horas.push(regAux);
    })
    console.log(this.horas);  
    this.horasSave = save;

    // this.horas = this.horasSave.filter( (r) => {
    //   console.log(r);
    //   let si = false;
    //   r.registros.map( (h:any) => {
    //     console.log(h)
    //     const a = new Date(h.fecha)
    //     si = (a.getMonth() === aux.getMonth()) && (a.getFullYear() === aux.getFullYear())
    //   })
    // })
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
}
