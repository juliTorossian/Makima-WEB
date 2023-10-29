import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  
} from "ng-apexcharts";
import { generarNuevoColor } from 'src/app/helpers/color';
import { DashboardService } from 'src/app/servicios/dashboard.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  colors: string[],
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
  @Input() origen!: string;
  @Input() filtro!: string;

  private dashboardService = inject(DashboardService);
  private usuarioService = inject(UsuarioService);

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  data!: any;
  listoGrafico: boolean = false;

  ngOnInit(){

    if (this.origen === 'D'){
      // Dashboard
      this.dashboardService.getTareasPorTipo().subscribe({
        next: (res:any) => {
          this.data = res;
          this.crearGrafico();
        }
      });
    }
    if (this.origen === 'U'){
      // Usuario
      this.usuarioService.getEventosGrafico(this.filtro).subscribe({
        next: (res:any) => {
          this.data = res;
          this.crearGrafico();
        }
      });
    }

  }

  crearGrafico(){

    let series : any = [];
    let categorias : any = [];
    let colors : string[] = [];
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

      // console.log(serie);

      series.push(serie);
      colors.push(tarea.color);


    });

    // console.log(series.length);
    // console.log(categorias);
    
    // for (let i = 0; i < series.length; i++) {
    //   colors.push(generarNuevoColor())
    //   this.getColorTarea("");
    // }
    // series.map( 
    //   colors.push(generarNuevoColor())
    // )
    // console.log(colors)

    this.chartOptions = {
      series: series,
      colors: colors,
      chart: {
        type: "bar",
        height: 450,
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
        opacity: 1,
      }
    };

    this.listoGrafico = true;
  }

  getColorTarea(tarea:any){
    console.log(this.data);

  }

}

