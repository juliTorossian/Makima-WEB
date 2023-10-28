import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PermisoClave, PermisoRol, permisosData, Rol } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-rol-crud',
  templateUrl: './rol-crud.component.html',
  styleUrls: ['./rol-crud.component.css']
})
export class RolCrudComponent implements OnInit, AfterViewInit {
  modo!: any;

  EVT = {
    desc:  'Eventos',
    clave: 'EVT',
    nivel: 0
  }
  USR = {
    desc: 'Usuarios',
    clave: 'USR',
    nivel: 0
  }
  MOD = {
    desc: 'Modulos',
    clave: 'MOD',
    nivel: 0
  }
  ENT = {
    desc: 'Entornos',
    clave: 'ENT',
    nivel: 0
  }
  PRD = {
    desc: 'Productos',
    clave: 'PRD',
    nivel: 0
  }
  CLI = {
    desc: 'Clientes',
    clave: 'CLI',
    nivel: 0
  }
  HOG = {
    desc: 'Horas Generales',
    clave: 'HOG',
    nivel: 0
  }
  EVD = {
    desc: 'Documentos de eventos',
    clave: 'EVD',
    nivel: 0
  }
  TAR = {
    desc: 'Tareas',
    clave: 'TAR',
    nivel: 0
  }
  TEV = {
    desc: 'Tipo de Eventos',
    clave: 'TEV',
    nivel: 0
  }
  ROL = {
    desc: 'Roles',
    clave: 'ROL',
    nivel: 0
  }

  rol: Rol = {
    id: "",
    descripcion: "",
    permisos: []
  }

  options: any[] = [
    {
      "desc": "Nada",
      "nivel": 0
    },
    {
      "desc": "Leer",
      "nivel": 1
    },
    {
      "desc": "Leer y Escribir",
      "nivel": 2
    },
    {
      "desc": "Leer, Escribir y Eliminar",
      "nivel": 3
    }
  ];

  permisos: PermisoRol[] = permisosData;
  permisosRol: PermisoRol[] = [];

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let rol = this.config.data.rol;
    
    if (rol){
      console.log(rol)
      this.rol.id = rol.id;
      this.rol.descripcion = rol.descripcion
      this.permisos.map( (p) => {
        rol.permisos.map( (pr:PermisoRol) => {
          if (p.clave === pr.clave){
            p.nivel = pr.nivel;
          }
        })
        this.rol.permisos.push(p);
      })
      
    }
  }

  ngAfterViewInit(): void {
    this.rol.permisos.map( (p) => {
      console.log(p.clave)
      let aux = document.getElementById(p.clave) as HTMLInputElement;
      if (aux){
        aux.value = this.options[p.nivel]
        console.log(aux)
      }
    })
  }

  onCheckChange(event:any, clave:string) {
    this.permisos.map( (p) => {
      if (p.clave === clave){
        p.nivel = event.value.nivel;
      }
    });
  } 

  // cambioPermisos(total:boolean){
  //   if (total){
  //     const controlTotal = this.rol.get('controlTotal')?.value;
  //     const aux = (controlTotal) ? true : false;
  //     this.rol.get("controlEvento")?.setValue(aux);
  //     this.rol.get("controlCliente")?.setValue(aux);
  //     this.rol.get("controlProducto")?.setValue(aux);
  //     this.rol.get("controlTipo")?.setValue(aux);
  //     this.rol.get("controlHora")?.setValue(aux);
  //     this.rol.get("controlUsuario")?.setValue(aux);
  //   }else{
  //     this.rol.get("controlTotal")?.setValue( (this.rol.get('controlEvento')?.value === true &&
  //                                             this.rol.get('controlCliente')?.value === true &&
  //                                             this.rol.get('controlProducto')?.value === true &&
  //                                             this.rol.get('controlTipo')?.value === true &&
  //                                             this.rol.get('controlHora')?.value === true &&
  //                                             this.rol.get('controlUsuario')?.value === true)) ;
  //   }
  // }

  accion($event:any){
    $event.preventDefault();
    let rol = this.rol;

    this.permisos.map( (p) => {
      if (p.nivel > 0){
        rol.permisos.push({
          clave: p.clave,
          nivel: p.nivel
        })
      }
    })


    console.log(rol);
    // this.ref.close(rol);
  }
}
