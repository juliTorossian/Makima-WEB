import { Component, HostListener, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Modulo } from 'src/app/interfaces/modulo';
import { Shortcut } from 'src/app/interfaces/shortcut';
import { PermisoClave, Usuario } from 'src/app/interfaces/usuario';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ModuloCrudComponent } from '../modulo-crud/modulo-crud.component';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ModulosComponent {
  @HostListener('window:'+Shortcut.ALTA, ['$event'])
  sc_alta(event: KeyboardEvent) {
    event.preventDefault();
    if (this.tieneControl()){
      this.mostrarModalCrud(null, 'A');
    }
  }
  usuario!: Usuario;

  modulos!: Modulo[];
  modulo!: Modulo;
  moduloSeleccionado!: Modulo[];

  ref!: DynamicDialogRef;

  private moduloService = inject(ModuloService);
  
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.identificarUsuario();
    this.llenarTabla();
  }

  identificarUsuario(){
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuario = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  tieneControl():boolean{
    return (this.usuarioService.getNivelPermiso(PermisoClave.MODULO, this.usuario) >= 2)
  }
  puedeEliminar():boolean{
    return (this.usuarioService.getNivelPermiso(PermisoClave.MODULO, this.usuario) >= 3)
  }

  llenarTabla(){
    this.moduloService.getModulos().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.modulos = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  alta(modulo : Modulo) {
    
    if (modulo) {
      this.moduloService.setModulo(modulo).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Modulo creado', detail: `Se creo el Modulo` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el Modulo` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
    
  }

  editar(modulo: Modulo) {

    if (modulo) {
      this.moduloService.putModulo(modulo).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Modulo modificado', detail: `Se modifico el Modulo` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el Modulo` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  deleteSeleccionado() {
    console.log(this.moduloSeleccionado);
    
    this.moduloSeleccionado.map( (modulo) => {
      // console.log(modulo);
      this.delete(modulo);
    })
  }

  deleteSolo(modulo : Modulo){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el Modulo?',
      header: 'Eliminar Modulo',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(modulo);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Modulo' });
      }
    });
  }

  delete(modulo: Modulo) {
    this.moduloService.deleteModulo(modulo).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Modulo Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el Modulo` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  mostrarModalCrud(modulo: Modulo | null, modo:any){
    let moduloRes! : Modulo;
    let header = "";
    if (modo === 'A'){
      header = "Nuevo Modulo";
    }else if (modo === 'M'){
      header = "Modificar Modulo";
    }

    const data = {modulo, modo}

    this.ref = this.dialogService.open(ModuloCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((moduloCrud: Modulo) => {
      moduloRes = moduloCrud
      if (modo === 'M'){
        this.editar(moduloRes)
      }
      if (modo === 'A'){
        this.alta(moduloRes)
      }
    });
  }
}
