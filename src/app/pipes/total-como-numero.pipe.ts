import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalComoNumero'
})
export class TotalComoNumeroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
