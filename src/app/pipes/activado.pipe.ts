import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'activado'
})
export class ActivadoPipe implements PipeTransform {

  transform(value: boolean): string {
    let res;
    if (value){
      res = 'SI';
    }else{
      res = 'NO';
    }
    return res;
  }

}
