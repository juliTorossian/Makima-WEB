import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let response = '';
    if (value === '' || value === undefined){
      return value;
    }

    if (value === 1){
      response = `<p-tag severity="success" value="Activo"></p-tag>`
    }else{
      response = `<p-tag severity="danger" value="No Activo"></p-tag>`
    }
    return response;
  }

}
