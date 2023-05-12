import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-cliente-seleccion',
  templateUrl: './cliente-seleccion.component.html',
  styleUrls: ['./cliente-seleccion.component.css']
})

export class ClienteSeleccionComponent implements OnInit {
  clientes!: Cliente[];

  private clienteService = inject(ClienteService)
  public ref = inject(DynamicDialogRef)

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.clientes = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  select(cliente: Cliente) {
    this.ref.close(cliente);
  }
}
