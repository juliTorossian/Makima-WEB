import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PermisoClave, PermisoRol, permisosData, Rol } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-rol-crud',
  templateUrl: './rol-crud.component.html',
  styleUrls: ['./rol-crud.component.css']
})
export class RolCrudComponent implements OnInit {
  modo!: any;

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

  permisos: PermisoRol[] = [];
  administrador: boolean = false;

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    for (let i = 0; i < permisosData.length; i++) {
      const p = permisosData[i];
      this.permisos.push({clave:p.clave, nivel:p.nivel});
    }

    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    let rol = this.config.data.rol;
    
    if (rol){
      this.rol.id = rol.id;
      this.rol.descripcion = rol.descripcion
      console.log(rol)
      this.permisos.map( (p) => {
        rol.permisos.map( (pr:PermisoRol) => {
          if (pr.clave === 'ADM'){
            this.administrador = true;
          }
          if (p.clave === pr.clave && p.nivel! < pr.nivel!){
            p.nivel = pr.nivel;
          }
        })
        this.rol.permisos.push(p);
      })
      
    }
  }

  accion($event:any){
    $event.preventDefault();
    let rol = this.rol;
    rol.permisos = [];

    if(this.administrador){
      rol.permisos.push({clave:'ADM', nivel:null})
    }else{
      this.permisos.map( (p) => {
        if (p.nivel! > 0){
          rol.permisos.push({
            clave: p.clave,
            nivel: +p.nivel!
          })
        }
      });
    }


    console.log(rol);
    this.ref.close(rol);
  }
}
