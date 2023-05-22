import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { map, tap } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { Usuario } from 'src/app/interfaces/usuario';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ClienteSeleccionComponent } from '../../cliente/cliente-seleccion/cliente-seleccion.component';
import { TipoEventoService } from 'src/app/servicios/tipo-evento.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoSeleccionComponent } from '../../producto/producto-seleccion/producto-seleccion.component';
import { Evento } from 'src/app/interfaces/evento';
import { SeleccionarEventoComponent } from 'src/app/componentes/seleccionar-evento/seleccionar-evento.component';

@Component({
  selector: 'app-evento-crud',
  templateUrl: './evento-crud.component.html',
  styleUrls: ['./evento-crud.component.css']
})
export class EventoCRUDComponent implements OnInit {
  private ref = inject(DynamicDialogRef);
  private refCliente = inject(DynamicDialogRef);
  private refProducto = inject(DynamicDialogRef);
  private dialogService = inject(DialogService);
  private config = inject(DynamicDialogConfig);

  private clienteService = inject(ClienteService);
  private productoService = inject(ProductoService);
  private usuarioService = inject(UsuarioService);
  private tipoEventoService = inject(TipoEventoService);

  usuario!: Usuario;
  modo!: any;
  tiposEvento! : any[];
  tipoEventoFiltrado! : any[];
  prioridades :any[] = [5, 4, 3, 2, 1];
  evento!: any;
  cliente: Cliente = {
    id: "",
    sigla: "",
    nombre: "",
    activo: 1
  };
  producto: Producto = {
    id:        "",
    nombre:    "",
    modulo:    {id: "", nombre: "", padre: ""},
    submodulo: {id: "", nombre: "", padre: ""},
    entorno:   {id: "", nombre: ""},
    activo: true
  };
  
  id = new FormControl("");
  tipo = new FormControl("", [Validators.required]);
  numero = new FormControl(0);
  prioridad = new FormControl(5, [Validators.required]);
  titulo = new FormControl("", [Validators.required]);
  clienteId = new FormControl("", [Validators.required]);
  // eventoHijo = new FormControl(false);
  // eventoHijo!: boolean;
  // eventoMadre!: Evento;


  ngOnInit(){

    this.tipoEventoService.getTiposEventoBusqueda().subscribe({
      next: (res:any) => {
        this.tiposEvento = res;
      }
    });
    
    
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
      this.productoService.getProducto(this.evento.producto.id).subscribe({
        next: (res:any) => {
          // console.log(res);
          this.producto = res;
        }
      });

      this.id.setValue(this.evento.id)
      this.tipo.setValue(this.evento.tipo);
      this.numero.setValue(this.evento.numero);
      this.prioridad.setValue(this.evento.prioridad);
      this.titulo.setValue(this.evento.titulo);
      this.clienteId.setValue(this.evento.cliente);
      // this.eventoHijo.setValue((this.evento.madre)!==undefined);
      // this.eventoMadre = this.evento.madre;
    }
    
  }

  accion($event:any) {
    $event.preventDefault();    

    let value :any = this.tipo.value;
    const evento = {
      id:             this.id.value,
      tipo:           value.value,
      titulo:         this.titulo.value,
      cliente:        this.cliente.id,
      producto:       this.producto.id,
      usuAlta:        this.usuario.id,
      prioridad:      this.prioridad.value,
      // madre:          this.eventoMadre.id
    }
    this.ref.close(evento);
  }

  filtroTipoEvento(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.tiposEvento.length; i++) {
      let tipoEvento = this.tiposEvento[i];
      if (tipoEvento.label.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filtered.push(tipoEvento);
      };
    }
    this.tipoEventoFiltrado = filtered;
  }

  // getDatosEvento(){
  //   // {{eventoMadre.tipo}} - {{eventoMadre.numero}} | {{eventoMadre.titulo}}
  //   if (this.eventoMadre){
  //     return `${this.eventoMadre.tipo} - ${this.eventoMadre.numero} | ${this.eventoMadre.titulo}`
  //   }else{
  //     return "";
  //   }
  // }

  selectCliente(){
    this.refCliente = this.dialogService.open(ClienteSeleccionComponent, {
      header: 'Seleccionar cliente',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 11000
    });

    this.refCliente.onClose.subscribe((cliente: Cliente) => {
      // console.log(cliente);
      if (cliente){
        this.cliente = cliente;
      }
    });
  }

  selectProducto(){
    this.refProducto = this.dialogService.open(ProductoSeleccionComponent, {
      header: 'Seleccionar producto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 11000
    });

    this.refProducto.onClose.subscribe((producto: Producto) => {
      // console.log(producto);
      if (producto){
        this.producto = producto;
      }
    });
  }

  // selectEventoMadre(){
  //   this.refCliente = this.dialogService.open(SeleccionarEventoComponent, {
  //     header: 'Seleccionar Evento',
  //     width: '70%',
  //     contentStyle: { overflow: 'auto' },
  //     baseZIndex: 11000
  //   });

  //   this.refCliente.onClose.subscribe((evento: Evento) => {
  //     console.log(evento);
  //     this.eventoMadre = evento;
  //   });
  // }
}
