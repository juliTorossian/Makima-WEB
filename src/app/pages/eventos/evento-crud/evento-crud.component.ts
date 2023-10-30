import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { Usuario } from 'src/app/interfaces/usuario';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ClienteSeleccionComponent } from '../../cliente/cliente-seleccion/cliente-seleccion.component';
import { TipoEventoService } from 'src/app/servicios/tipo-evento.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoSeleccionComponent } from '../../producto/producto-seleccion/producto-seleccion.component';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { MessageService } from 'primeng/api';

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
  private messageService = inject(MessageService);

  private clienteService = inject(ClienteService);
  private productoService = inject(ProductoService);
  private usuarioService = inject(UsuarioService);
  private tipoEventoService = inject(TipoEventoService);
  private moduloService = inject(ModuloService);

  usuario!: Usuario;
  modo!: any;
  tiposEvento! : any[];
  tipoEventoFiltrado! : any[];
  prioridades :any[] = [5, 4, 3, 2, 1];
  modulos! : any[];
  modulosFiltrados! : any[];

  clientes!: Cliente[];
  clientesFiltrado!: Cliente[];
  clienteSel!: Cliente;

  evento!: any;

  producto: Producto = {
    id:        "",
    sigla:     "",
    nombre:    "-",
    entorno:   {id: "-", nombre: ""},
    activo: true
  };
  
  id = new FormControl("");
  tipo = new FormControl("", [Validators.required]);
  numero = new FormControl({value:0, disabled:true});
  prioridad = new FormControl(5, [Validators.required]);
  titulo = new FormControl("", [Validators.required]);
  modulo = new FormControl("");
  clienteFc = new FormControl({ id: "", sigla: "", nombre: "", activo: 0});
  descripcion = new FormControl("");
  adjunto!: File | null;
  // eventoHijo = new FormControl(false);
  // eventoHijo!: boolean;
  // eventoMadre!: Evento;


  ngOnInit(){

    this.tipoEventoService.getTiposEventoBusqueda().subscribe({
      next: (res:any) => {
        this.tiposEvento = res;
      }
    });
    this.clienteService.getClientes().subscribe({
      next: (res:any) => {
        // console.log(res);
        this.clientes = res;
      }
    })
    this.moduloService.getModulosBusqueda().subscribe({
      next: (res:any) => {
        this.modulos = res;
      },
    });
    this.usuarioService.getUsuarioToken("").subscribe({
      next: (res:Usuario) => {
        this.usuario = res;
      }
    });
    
    this.modo = this.config.data.modo;
    this.evento = this.config.data.evento;
    // console.log(this.config.data.evento);
    
    if (this.evento){

      // console.log(this.evento);

      this.actualizarCliente(this.evento.cliente.id);

      this.productoService.getProducto(this.evento.producto.id).subscribe({
        next: (res:any) => {
          // console.log(res);
          this.producto = res;
        }
      });

      this.id.setValue(this.evento.id)
      this.tipo.setValue(this.evento.tipo.id);
      this.numero.setValue(this.evento.numero);
      this.prioridad.setValue(this.evento.prioridad);
      this.titulo.setValue(this.evento.titulo);
      // this.clienteId.setValue(this.evento.cliente);
      this.modulo.setValue(this.evento.modulo);
      // this.eventoHijo.setValue((this.evento.madre)!==undefined);
      // this.eventoMadre = this.evento.madre;
    }
    
  }

  actualizarCliente(clienteId:any){
    this.clienteService.getCliente(clienteId).subscribe({
      next: (res:any) => {
        // console.log(res);
        this.clienteFc.setValue(res);
      }
    });
  }

  accion($event:any) {
    $event.preventDefault();    
    let ok = true;
    
    let aux = document.getElementById('adjunto') as HTMLInputElement;
    this.adjunto = aux.files![0];

    console.log(this.adjunto)

    // console.log(this.clienteId); 

    let tipo :any = this.tipo.value;
    let modulo :any = this.modulo.value;
    // let clienteAux = 

    if (this.tiposEvento.some((te) => te.toLowerCase() == tipo.toLowerCase()) ){
      if (this.modulos.some((te) => te.toLowerCase() == modulo.toLowerCase()) ){


        if (this.clienteFc.value){
          if (this.producto.id){
            if (this.titulo.valid){
              let evento = {
                id:             this.id.value,
                tipo:           tipo,
                titulo:         this.titulo.value,
                cliente:        this.clienteFc.value!.id,
                producto:       this.producto.id,
                modulo:         modulo,
                usuAlta:        this.usuario.id,
                prioridad:      this.prioridad.value,
                descripcion:    this.descripcion.value,
                // madre:          this.eventoMadre.id
                adjunto:        this.adjunto
              }
              console.log(this.adjunto);
              console.log(evento);
              // this.ref.close(evento);
            }else{
              this.messageService.add({ severity: 'warn', summary: '', detail: 'Debe ingresar un titulo al evento' });
            }
          }else{
            this.messageService.add({ severity: 'warn', summary: '', detail: 'Debe seleccionar un producto' });
          }
        }else{
          this.messageService.add({ severity: 'warn', summary: '', detail: 'Debe seleccionar un cliente' });
        }

      }else{
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se existe el Modulo seleccionado' });
      }
    }else{
      this.messageService.add({ severity: 'warn', summary: '', detail: 'No se existe el Tipo de Evento seleccionado' });
    }
  }

  filtroTipoEvento(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.tiposEvento.length; i++) {
      let tipoEvento = this.tiposEvento[i];
      // if (tipoEvento.label.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      if (tipoEvento.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filtered.push(tipoEvento);
      };
    }
    this.tipoEventoFiltrado = filtered;
  }

  filtroModulo(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.modulos.length; i++) {
      let modulo = this.modulos[i];
      // if (modulo.label.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      if (modulo.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filtered.push(modulo);
      };
    }
    this.modulosFiltrados = filtered;
  }

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
        this.actualizarCliente(cliente.id)
      }
    });
  }
  selCliente(event:any){
    // console.log(event);
    // this.clienteFc.setV = event;
    this.actualizarCliente(event.id)
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

  filtroCliente(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.clientes.length; i++) {
      let clienteAux = this.clientes[i];
      // if (clienteAux.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      if (clienteAux.nombre.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(clienteAux);
      }
    }

    this.clientesFiltrado = filtered;
  }

  onUpload(event:any){
    console.log(event)
  }
  onSelect(event:any){
    console.log(event)
    console.log(event.currentFiles)
    this.adjunto = event.currentFiles;
  }

  onFileSelected(event: any) {
    const file = event.target!.files[0];
    this.adjunto = file;
  }

  onFileCanceled() {
    this.adjunto = null;
  }

}
