import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: boolean): string {
    let res;

    if (value){
      res = 'ACTIVO';
    }else{
      res = 'INACTIVO';
    }

    return res;
  }

  function mostrarDiferenciaFormateada(diferenciaEnHoras){ 
    const horas = Math.floor(diferenciaEnHoras);
    const minutos = Math.floor((diferenciaEnHoras - horas) * 60);
    const diferenciaFormateada = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`; 
    return diferenciaFormateada; 
  }
}
