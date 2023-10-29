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
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { PermisoClave, Usuario } from 'src/app/interfaces/usuario';

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
    if (this.tieneControl()){
      this.mostrarModalCrud(null, 'A');
    }
  }
  usuario!: Usuario;

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
  private usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.identificarUsuario();
    this.buscarClientes();
  }

  identificarUsuario(){
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        // console.log(res);
        this.usuario = res;
        // this.permisos = this.usuarioService.getPermisos(this.usuario);
      },
      error: (err) => {
        console.log(err);
      }
    });
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

  tieneControl():boolean{
    return (this.usuarioService.getNivelPermiso(PermisoClave.CLIENTE, this.usuario) >= 2)
  }
  puedeEliminar():boolean{
    return (this.usuarioService.getNivelPermiso(PermisoClave.CLIENTE, this.usuario) >= 3)
  }

}
