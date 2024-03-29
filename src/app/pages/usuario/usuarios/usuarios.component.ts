import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PermisoClave, Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioCrudComponent } from '../usuario-crud/usuario-crud.component';
import { ActivoPipe } from 'src/app/pipes/activo.pipe';
import { Shortcut } from 'src/app/interfaces/shortcut';

@Component({
  selector: 'app-usuarios',
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
    ChipModule,
    ActivoPipe
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class UsuariosComponent {
  @HostListener('window:'+Shortcut.ALTA, ['$event'])
  sc_alta(event: KeyboardEvent) {
    event.preventDefault();
    if (this.tieneControl()){
      this.mostrarModalCrud(null, 'A');
    } 
  }
  usuarioLogeado!: Usuario;

  usuarios!: Usuario[];
  usuariosSave!: Usuario[];
  usuario!: Usuario;
  usuarioSeleccionado!: Usuario[];

  filtroVerInactivos: boolean = false;

  ref!: DynamicDialogRef;

  private usuarioService = inject(UsuarioService);
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.identificarUsuario();
    this.llenarTabla();
  }

  identificarUsuario(){
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuarioLogeado = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  tieneControl():boolean{
    return (this.usuarioService.getNivelPermiso(PermisoClave.USUARIO, this.usuarioLogeado) >= 2)
  }
  puedeEliminar():boolean{
    return (this.usuarioService.getNivelPermiso(PermisoClave.USUARIO, this.usuarioLogeado) >= 3)
  }

  llenarTabla(){
    this.filtroVerInactivos = false;
    this.usuarioService.getUsuarios().subscribe({
      next: (res : any) => {
        // console.log(res);
        // this.usuarios = res;
        this.usuariosSave = res;

        this.usuarios = this.usuariosSave.filter((u:any) => (u.activo == !this.filtroVerInactivos));
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
      message: 'Esta seguro que queres hacer una eliminacion masiva de Usuarios?',
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

  reactivar(usuario: Usuario){
    this.usuarioService.reactivarUsuario(usuario).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Usuario Reactivado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al reactivar el Usuario` });
      },
      complete: () => {
        this.llenarTabla();
      }
    })
  }

  filtraUsuarios(){
    this.usuarios = this.usuariosSave.filter((u:any) => (u.activo == true));

    const eventosCerrados : Usuario[] = this.usuariosSave.filter((u:any) => (u.activo == false));

    if (this.filtroVerInactivos){
      this.usuarios = this.usuarios.concat(eventosCerrados);
    }
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
