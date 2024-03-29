import { Component, HostListener, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { RegistroHora } from 'src/app/interfaces/hora';
import { Shortcut } from 'src/app/interfaces/shortcut';
import { Usuario } from 'src/app/interfaces/usuario';
import { HoraService } from 'src/app/servicios/hora.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { HoraCrudComponent } from '../hora-crud/hora-crud.component';

@Component({
  selector: 'app-horas-usuario',
  templateUrl: './horas-usuario.component.html',
  styleUrls: ['./horas-usuario.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class HorasUsuarioComponent {
  @HostListener('window:'+Shortcut.ALTA, ['$event'])
  sc_alta(event: KeyboardEvent) {
    event.preventDefault();
    this.mostrarModalCrud(null, 'A');
  }

  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  private horaService = inject(HoraService);
  private usuarioService = inject(UsuarioService);
  
  ref!: DynamicDialogRef;
  usuario!: Usuario;

  horas!: RegistroHora[];
  horasSave!: RegistroHora[];
  hora!: RegistroHora;
  horasSeleccionadas!: RegistroHora[];

  dateFilter = new Date();

  ngOnInit() {
    this.usuarioService.getUsuarioToken(this.usuarioService.getToken()).subscribe({
      next: (res:any) => {
        this.usuario = res;
        this.llenarTabla();
      }
    })
  }

  llenarTabla(){
    this.horaService.getHorasUsuario(this.usuario.id).pipe(
      tap( (res:any) => {
        // console.log(res);
      })
    ).subscribe((res:any) => {
      // console.log(res);
      this.horasSave = res;
      this.horas = this.horasSave;
      this.aplicarFiltroFecha(this.dateFilter);
    });
  }

  alta(hora : RegistroHora) {
    // console.log("alta: ");
    // console.log(hora);
    if (hora) {
      this.horaService.setHora(hora).subscribe({
        next: (res) => {
          // console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Horas registradas', detail: `Se registraron las horas` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al registrar horas` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  editar(hora: RegistroHora) {
    // console.log("editar: ");
    // console.log(hora);
    if (hora) {
      this.horaService.putHora(hora).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Horas modificadas', detail: `Se modificaron las horas` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar las horas` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }
  
  deleteSeleccion() {
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar masivamente?',
      header: 'Eliminar Horas Masiva',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.horasSeleccionadas.map( (hora) => {
          // console.log(hora);
          this.delete(hora);
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se eliminaron horas' });
      }
    });
  }
  
  deleteSolo(hora: RegistroHora) {
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el registro de hora?',
      header: 'Eliminar Hora',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(hora);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el registro' });
      }
    });
  }

  delete(hora : RegistroHora){
    this.horaService.deleteHora(hora).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Registro de horas eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el registro de horas` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  // filtraEventosCerrado(){
  //   if (this.filtroVerCerrados){
  //     this.eventos = this.eventosSave;
  //   }else{
  //     this.eventos = this.eventosSave.filter((r:any) => r.cerrado === 0);
  //   }
  // }

  mostrarModalCrud(hora: RegistroHora | null, modo:any){

    // console.log(hora);

    const data = {hora, modo}
    let header = "";
    switch (modo) {
      case 'M':
        header = "Editar Hora"
        break;
      case 'A':
        header = "Cargar Hora"
        break;
    }

    this.ref = this.dialogService.open(HoraCrudComponent, {
      header: header,
      width: '90%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((horaCrud: RegistroHora) => {
      // console.log(horaCrud);
      if (horaCrud) {
        if (modo === 'M'){
          this.editar(horaCrud)
        }else if (modo === 'A'){
          this.alta(horaCrud)
        }
      }
    });
  }

  aplicarFiltroFecha(fechaSel:any){
    const aux = new Date(fechaSel);
    this.horas = this.horasSave.filter( (h) => {
      const a = new Date(h.fecha)
      return (a.getMonth() === aux.getMonth()) && (a.getFullYear() === aux.getFullYear())
    })
  }

}
