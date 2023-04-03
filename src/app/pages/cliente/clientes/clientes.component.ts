import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ClientesComponent {
  clienteDialog!: boolean;
  clientes!: Cliente[];
  cliente!: Cliente;
  clienteSeleccionado!: Cliente[];

  // filtroVerCerrados: boolean = false; // false no muestra los cerrados

  ref!: DynamicDialogRef;
  submitted!: boolean;
  // statuses!: any[];

  // // constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  private dialogService = inject(DialogService);
  private clienteService = inject(ClienteService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

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

  openNew() {
    // this.evento = {};
    this.submitted = false;
    this.clienteDialog = true;
  }

  deleteClienteSeleccionado() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientes = this.clientes.filter((val) => !this.clienteSeleccionado.includes(val));
        // this.eventoSeleccionado = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editCliente(cliente: Cliente) {

    console.log(cliente);

    // this.ref = this.dialogService.open(EventoCRUDComponent, {
    //   header: 'Editar evento',
    //   width: '70%',
    //   contentStyle: { overflow: 'auto' },
    //   baseZIndex: 10000,
    //   maximizable: true,
    //   data: {"evento": cliente}
    // });

    // this.ref.onClose.subscribe((clienteCrud: Cliente) => {
    //   if (clienteCrud) {
    //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: clienteCrud.nombre });
    //   }
    // });

  //   this.ref.onMaximize.subscribe((value) => {
  //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
  //   });
    

  //   // this.evento = { ...evento };
  //   // this.eventoDialog = true;
  }

  deleteCliente(cliente: Cliente) {

    console.log('deleteCliente');
    console.log(cliente);
    

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + cliente.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientes = this.clientes.filter((val) => val.id !== cliente.id);
        // this.evento = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  // hideDialog() {
  //   this.eventoDialog = false;
  //   this.submitted = false;
  // }

  // saveEvento() {
  //   this.submitted = true;

  //   if (this.evento.id.trim()) {
  //     if (this.evento.id) {
  //       this.eventos[this.findIndexById(this.evento.id)] = this.evento;
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
  //     } else {
  //       // this.evento.id = this.createId();
  //       // this.evento.image = 'product-placeholder.svg';
  //       this.eventos.push(this.evento);
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
  //     }

  //     this.eventos = [...this.eventos];
  //     this.eventoDialog = false;
  //     // this.evento = {};
  //   }
  // }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.eventos.length; i++) {
  //     if (this.eventos[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  // filtraEventosCerrado(){
  //   console.log(this.filtroVerCerrados);
  //   if (this.filtroVerCerrados){
  //     this.eventos = this.eventosSave;
  //   }else{
  //     this.eventos = this.eventosSave.filter((r:any) => r.cerrado === 0);
  //   }
  // }
}
