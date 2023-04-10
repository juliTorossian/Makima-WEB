import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { DashboardService } from 'src/app/servicios/dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-grafico-tipos',
  templateUrl: './grafico-tipos.component.html',
  styleUrls: ['./grafico-tipos.component.css']
})
export class GraficoTiposComponent implements OnInit{
  private dashboardService = inject(DashboardService);

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  data!: any;
  listoGrafico: boolean = false;

  ngOnInit(){

    this.dashboardService.getTareasPorTipo().subscribe({
      next: (res:any) => {
        this.data = res;
        this.crearGrafico();
      }
    })

  }

  crearGrafico(){

    let series : any = [];
    let categorias : any = [];
    this.data.tipos.map( (tipo:any) => { categorias.push(tipo.id) });

    this.data.tareas.map( (tarea:any) => {

      let dataAux: any = [];

      this.data.tipos.map( (tipo:any) => {
        let valor = 0;
        this.data.data.map( (ttp:any) => {
          if ((ttp.tipo === tipo.id) && (ttp.tarea === tarea.nombre)){
            valor = ttp.cantidad;
          }
        });

        dataAux.push(valor);

      });
        
      let serie = {
        "name": tarea.nombre,
        "data": dataAux
      };

      series.push(serie);

    });

    // console.log(series);
    // console.log(categorias);
    

    this.chartOptions = {
      series: series,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            total: {
              enabled: true,
              style: {
              fontSize: "13px",
              fontWeight: 900,
              },
            },
          },
        }
      },
      xaxis: {
        type: "category",
        categories: categorias
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };

    this.listoGrafico = true;
  }

}
