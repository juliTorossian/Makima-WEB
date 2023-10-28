import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { permisosData } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-tabla-permisos',
  templateUrl: './tabla-permisos.component.html',
  styleUrls: ['./tabla-permisos.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TablaPermisosComponent),
      multi: true,
    },
  ],
})
export class TablaPermisosComponent {

  onChange!: (value?: any) => void;
  onTouch!: (event: any) => void;

  value: string = '';

  // permisosTabla: any[] = permisosData;
  permisosTabla: any[] = [
    {
      clave: 'EVT',
      desc: 'Eventos',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'USR',
      desc: 'Usuarios',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'MOD',
      desc: 'Modulos',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'ENT',
      desc: 'Entornos',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'PRD',
      desc: 'Productos',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'CLI',
      desc: 'Clientes',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'HOG',
      desc: 'Horas Generales',
      n1: true,
      n2: null,
      n3: null
    },
    {
      clave: 'EVD',
      desc: 'Documentos de eventos',
      n1: null,
      n2: null,
      n3: true
    },
    {
      clave: 'TAR',
      desc: 'Tareas',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'TEV',
      desc: 'Tipo de Eventos',
      n1: true,
      n2: true,
      n3: true
    },
    {
      clave: 'ROL',
      desc: 'Roles',
      n1: true,
      n2: true,
      n3: true
    },
  ]

  // Evento de click de cada checkbox
  onCheckChange(event:any) {
    console.log(event);
  }

  

  writeValue(value: any) {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  onInput(event: any) {
    if(this.onChange) {
      this.onChange(event.value);
    }
  }
  onTouched(value: any) {
    if(this.onTouch) {
      this.onTouch(value)
    }
  }

}
