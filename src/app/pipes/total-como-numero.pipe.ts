import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalComoNumero'
})
export class TotalComoNumeroPipe implements PipeTransform {

  transform(value: number): string {

    const diferenciaEnHoras: number = value;

    const horas = Math.floor(diferenciaEnHoras);
    const minutos = Math.floor((diferenciaEnHoras - horas) * 60);
    const diferenciaFormateada = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`; 

    return diferenciaFormateada; 
  }
}
