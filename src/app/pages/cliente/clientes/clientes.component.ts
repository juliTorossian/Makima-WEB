import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ClienteCrudComponent } from '../cliente-crud/cliente-crud.component';

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
    this.mostrarModalCrud(null, 'A');
    let clienteRes;

    
    this.ref.onClose.subscribe((clienteCrud: Cliente) => {
      clienteRes = clienteCrud
    });

    if (clienteRes) {
      this.clienteService.setCliente(clienteRes).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Cliente creado', detail: `Se creo el cliente` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el cliente` });
        }
      });
    }
  }

  editCliente(cliente: Cliente) {
    this.mostrarModalCrud(cliente, 'M');
    let clienteRes;

    this.ref.onClose.subscribe((clienteCrud: Cliente) => {
      clienteRes = clienteCrud
    });

    if (clienteRes) {
      this.clienteService.putCliente(clienteRes).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Cliente modificado', detail: `Se modifico el cliente` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el cliente` });
        }
      });
    }
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
  
  mostrarModalCrud(cliente: Cliente | null, modo:any){
    const data = {cliente, modo}

    this.ref = this.dialogService.open(ClienteCrudComponent, {
      header: 'Editar cliente',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    // this.ref.onClose.subscribe((product: Product) => {
    //     if (product) {
    //         this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //     }
    // });

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
