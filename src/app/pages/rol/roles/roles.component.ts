import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Rol } from 'src/app/interfaces/usuario';
import { RolService } from 'src/app/servicios/rol.service';
import { RolCrudComponent } from '../rol-crud/rol-crud.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class RolesComponent {
  roles!: Rol[];
  rol!: Rol;
  rolSeleccionado!: Rol[];

  ref!: DynamicDialogRef;

  private rolService = inject(RolService);
  
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla(){
    this.rolService.getRoles().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.roles = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  alta(rol : Rol) {
    
    if (rol) {
      this.rolService.setRol(rol).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Tipo de evento creado', detail: `Se creo el Rol` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el Rol` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
    
  }

  editar(rol: Rol) {

    if (rol) {rol
      this.rolService.putRol(rol).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Tipo de Evento modificado', detail: `Se modifico el Rol` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el Rol` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  deleteSeleccionado() {
    console.log(this.rolSeleccionado);
    
    this.rolSeleccionado.map( (rol) => {
      // console.log(rol);
      this.delete(rol);
    })
  }

  deleteSolo(rol : Rol){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el Rol?',
      header: 'Eliminar Rol',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(rol);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Rol' });
      }
    });
  }

  delete(rol: Rol) {
    this.rolService.deleteRol(rol).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Rol Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el Rol` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  mostrarModalCrud(rol: Rol | null, modo:any){
    let rolRes! : Rol;
    let header = "";
    if (modo === 'A'){
      header = "Nuevo Rol";
    }else if (modo === 'M'){
      header = "Modificar Rol";
    }

    const data = {rol, modo}

    this.ref = this.dialogService.open(RolCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((rolCrud: Rol) => {
      rolRes = rolCrud
      if (modo === 'M'){
        this.editar(rolRes)
      }
      if (modo === 'A'){
        this.alta(rolRes)
      }
    });
  }
}