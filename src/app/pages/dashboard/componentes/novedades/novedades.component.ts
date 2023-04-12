import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/servicios/dashboard.service';

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
        console.log(res)
        this.novedades = res;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
