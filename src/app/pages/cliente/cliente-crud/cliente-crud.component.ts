import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent  implements OnInit {

  modo!: any;
  // cliente!: any;

  cliente = new FormGroup({
    id: new FormControl(""), 
    sigla: new FormControl("", [Validators.required]),
    nombre: new FormControl("", [Validators.required]),
    activo: new FormControl(true)
  });

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    console.log(this.config.data);
    this.modo = this.config.data.modo;
    let cliente = this.config.data.cliente;
    
    if (cliente){
      this.cliente.get("id")?.setValue(cliente.id);
      this.cliente.get("sigla")?.setValue(cliente.sigla);
      this.cliente.get("nombre")?.setValue(cliente.nombre);
      this.cliente.get("activo")?.setValue(cliente.activo);
    }
  }

  crearCliente(){
    const cliente : any = {
      id: this.cliente.get('id')?.value,
      sigla: this.cliente.get('sigla')?.value,
      nombre: this.cliente.get('nombre')?.value,
      activo: this.cliente.get('activo')?.value
    }

    this.ref.close(cliente);
  }

}
