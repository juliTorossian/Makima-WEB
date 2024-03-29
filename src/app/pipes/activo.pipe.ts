import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
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
}
