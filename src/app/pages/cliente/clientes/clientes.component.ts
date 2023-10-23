import { Component, HostListener, inject } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ClienteCrudComponent } from '../cliente-crud/cliente-crud.component';
import { tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActivoPipe } from 'src/app/pipes/activo.pipe';
import { Shortcut } from 'src/app/interfaces/shortcut';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
    TagModule,
    ConfirmDialogModule,
    ActivoPipe,
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ClientesComponent {
  @HostListener('window:'+Shortcut.ALTA, ['$event'])
  sc_alta(event: KeyboardEvent) {
    event.preventDefault();
    this.mostrarModalCrud(null, 'A');
  }

  clienteDialog!: boolean;
  clientes!: Cliente[];
  cliente!: Cliente;
  clienteSeleccionado!: Cliente[];

  // filtroVerCerrados: boolean = false; // false no muestra los cerrados

  ref!: DynamicDialogRef;
  submitted!: boolean;
  // statuses!: any[];

  private dialogService = inject(DialogService);
  private clienteService = inject(ClienteService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.buscarClientes();
  }

  buscarClientes(){
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

  newCliente(cliente : Cliente) {
    
    if (cliente) {
      this.clienteService.setCliente(cliente).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Cliente creado', detail: `Se creo el cliente` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el cliente` });
        },
        complete: () => {
          this.buscarClientes();
        }
      });
    }
    
  }

  editCliente(cliente: Cliente) {

    if (cliente) {
      this.clienteService.putCliente(cliente).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Cliente modificado', detail: `Se modifico el cliente` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el cliente` });
        },
        complete: () => {
          this.buscarClientes();
        }
      });
    }
    this.buscarClientes();
  }

  deleteClienteSeleccionado() {
    console.log(this.clienteSeleccionado);
    
    this.clienteSeleccionado.map( (cliente) => {
      console.log(cliente);
      this.deleteCliente(cliente);
    })
  }

  deleteClienteSolo(cliente : Cliente){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el cliente?',
      header: 'Eliminar Cliente',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteCliente(cliente);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el cliente' });
      }
    });
  }

  deleteCliente(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Cliente Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el cliente` });
      },
      complete: () => {
        this.buscarClientes();
      }
    });
  }

  reactivarCliente(cliente: Cliente) {
    this.confirmationService.confirm({
      message: 'Esta seguro que queres reactivar el cliente?',
      header: 'Reactivar Cliente',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.clienteService.reactivarCliente(cliente).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: '', detail: 'Cliente Reactivado' });
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al reactivar el cliente` });
          },
          complete: () => {
            this.buscarClientes();
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se reactivo el cliente' });
      }
    });
  }

  getSeverity(status: boolean) {
    if (status){
      return 'success';
    }else{
      return 'danger';
    } 
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
    let clienteRes! : Cliente;
    const data = {cliente, modo}
    let header = "";
    if (modo === 'A'){
      header = "Nuevo Cliente";
    }else if (modo === 'M'){
      header = "Modificar Cliente";
    }

    this.ref = this.dialogService.open(ClienteCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((clienteCrud: Cliente) => {
      clienteRes = clienteCrud
      if (modo === 'M'){
        this.editCliente(clienteRes)
      }
      if (modo === 'A'){
        this.newCliente(clienteRes)
      }
    });


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
