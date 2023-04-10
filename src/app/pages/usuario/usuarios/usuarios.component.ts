import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioCrudComponent } from '../usuario-crud/usuario-crud.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class UsuariosComponent {
  usuarios!: Usuario[];
  usuario!: Usuario;
  usuarioSeleccionado!: Usuario[];

  ref!: DynamicDialogRef;

  private usuarioService = inject(UsuarioService);

  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla(){
    this.usuarioService.getUsuarios().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.usuarios = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  alta(usuario : Usuario) {
    
    if (usuario) {
      this.usuarioService.setUsuario(usuario).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Usuario creado', detail: `Se creo el Usuario` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el Usuario` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
    
  }

  editar(usuario: Usuario) {

    if (usuario) {
      this.usuarioService.putUsuario(usuario).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Usuario modificado', detail: `Se modifico el Usuario` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el Usuario` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  deleteSeleccionado() {
    console.log(this.usuarioSeleccionado);
    this.confirmationService.confirm({
      message: 'Esta seguro que queres hacer una eliminacion masiva de Usuarios??',
      header: 'Eliminar Usuario',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usuarioSeleccionado.map( (usuario) => {
          this.delete(usuario);
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Usuario' });
      }
    });
  }

  deleteSolo(usuario : Usuario){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el Usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(usuario);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Usuario' });
      }
    });
  }

  delete(usuario: Usuario) {
    this.usuarioService.deleteUsuario(usuario).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Usuario Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el Usuario` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  mostrarModalCrud(usuario: Usuario | null, modo:any){
    let usuarioRes! : Usuario;
    let header = "";
    if (modo === 'A'){
      header = "Nuevo Usuario";
    }else if (modo === 'M'){
      header = "Modificar Usuario";
    }

    const data = {usuario, modo}

    this.ref = this.dialogService.open(UsuarioCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((usuarioCrud: Usuario) => {
      usuarioRes = usuarioCrud
      if (modo === 'M'){
        this.editar(usuarioRes)
      }
      if (modo === 'A'){
        this.alta(usuarioRes)
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
}
