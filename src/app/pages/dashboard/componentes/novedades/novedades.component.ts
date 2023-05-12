import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/servicios/dashboard.service';
import { NovedadesColor, NovedadesMensaje } from 'src/app/utilidades/novedades-mensaje';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  novedades! : any[];

  ngOnInit(){
    this.dashboardService.getNovedades(7).subscribe({
      next: (res:any) => {
        // console.log(res)
        this.novedades = res;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  getTexto(accion:string, novedad:any){
    // console.log(novedad);
    const keys = Object.keys(NovedadesMensaje);
    const values = Object.values(NovedadesMensaje);
    let texto = "";
    keys.forEach((key, index) => {
      if (key === accion){
        texto = values[index];
      }
    });

    // let evento = `<div [routerLink]="['/evento/${novedad.evento.id}']"><p-badge value="${novedad.evento.evento}" class="my-badge" severity="success"></p-badge></div>`;

    texto = texto.replaceAll('&usuario', novedad.usuario.usuario);
    texto = texto.replaceAll('&evento', novedad.evento.evento);
    texto = texto.replaceAll('&tarea', novedad.tarea);

    // console.log(texto); 

    return texto;
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
}
