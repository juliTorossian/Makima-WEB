import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { map, tap } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { Usuario } from 'src/app/interfaces/usuario';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ClienteSeleccionComponent } from '../../cliente/cliente-seleccion/cliente-seleccion.component';

@Component({
  selector: 'app-evento-crud',
  templateUrl: './evento-crud.component.html',
  styleUrls: ['./evento-crud.component.css']
})
export class EventoCRUDComponent implements OnInit {
  usuario!: Usuario;
  modo!: any;

  tiposEvento : any[] = ["CUS", "CAS", "TEC", "ORG", "MEG"];
  tipoEventoFiltrado! : any[];

  prioridades :any[] = [1, 2, 3, 4, 5];

  evento!: any;

  private ref = inject(DynamicDialogRef);
  private refCliente = inject(DynamicDialogRef);
  private dialogService = inject(DialogService);
  private config = inject(DynamicDialogConfig);
  private clienteService = inject(ClienteService);
  private usuarioService = inject(UsuarioService);

  cliente: Cliente = {
    id: "",
    sigla: "",
    nombre: "",
    activo: 1
  };
  // producto!: Producto;

  // crudEvento = new FormGroup({
  //   tipo: new FormControl("", [Validators.required]),
  //   prioridad: new FormControl("", [Validators.required]),
  //   titulo: new FormControl("", [Validators.required]),
  //   clienteId: new FormControl('', [Validators.required]),
  // });

  id = new FormControl("");
  tipo = new FormControl("", [Validators.required]);
  numero = new FormControl(0);
  prioridad = new FormControl("", [Validators.required]);
  titulo = new FormControl("", [Validators.required]);
  clienteId = new FormControl("", [Validators.required]);


  ngOnInit(){
    
    
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    this.evento = this.config.data.evento;

    this.usuarioService.getUsuarioToken("").subscribe({
      next: (res:Usuario) => {
        this.usuario = res;
      }
    });
    
    if (this.evento){
      this.clienteService.getCliente(this.evento.cliente.id).subscribe({
        next: (res:any) => {
          // console.log(res);
          this.cliente = res;
        }
      });

      this.tipo.setValue(this.evento.tipo);
      this.numero.setValue(this.evento.numero);
      this.prioridad.setValue(this.evento.prioridad);
      this.titulo.setValue(this.evento.titulo);
      this.clienteId.setValue(this.evento.cliente);
    }
    
  }
  /*
    id:             string;
    tipo:           string;
    numero:         number;
    titulo:         string;
    cliente:        string;
    producto:       string;
    usuarioAlta:    UsuarioCorto;
  */



  accion($event:any) {
    $event.preventDefault();

    console.log(this.cliente);
    

    const evento = {
      id:             this.id.value,
      tipo:           this.tipo.value,
      titulo:         this.titulo.value,
      cliente:        this.cliente.id,
      // producto:       this.productoId.value,
      usuarioAlta:    this.usuario.id
    }


    this.ref.close(evento);
  }

  filtroTipoEvento(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.tiposEvento.length; i++) {
      let tipoEvento = this.tiposEvento[i];
      if (tipoEvento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tipoEvento);
      }
    }

    console.log(filtered);

    this.tipoEventoFiltrado = filtered;
  }

  selectCliente(){
    this.refCliente = this.dialogService.open(ClienteSeleccionComponent, {
      header: 'Seleccionar cliente',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 11000,
      maximizable: true
    });

    this.refCliente.onClose.subscribe((cliente: Cliente) => {
      // console.log(cliente);
      this.cliente = cliente;
    });

  }

}
