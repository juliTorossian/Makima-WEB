import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProductoCrudComponent } from '../producto-crud/producto-crud.component';
import { ActivoPipe } from 'src/app/pipes/activo.pipe';

@Component({
  selector: 'app-productos',
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
    ConfirmDialogModule,
    TagModule,
    ActivoPipe,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ProductosComponent {
  productos!: Producto[];
  producto!: Producto;
  productoSeleccionado!: Producto[];

  ref!: DynamicDialogRef;

  private productoService = inject(ProductoService);

  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla(){
    this.productoService.getProductos().subscribe({
      next: (res : any) => {
        // console.log(res);
        this.productos = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  alta(producto : Producto) {
    
    if (producto) {
      this.productoService.setProducto(producto).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Producto creado', detail: `Se creo el Producto` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al crear el Producto` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
    
  }

  editar(producto: Producto) {

    if (producto) {
      this.productoService.putProducto(producto).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Producto modificado', detail: `Se modifico el Producto` });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al modificar el Producto` });
        },
        complete: () => {
          this.llenarTabla();
        }
      });
    }
  }

  deleteSeleccionado() {
    console.log(this.productoSeleccionado);
    this.confirmationService.confirm({
      message: 'Esta seguro que queres hacer una eliminacion masiva de Productos?',
      header: 'Eliminar Producto',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productoSeleccionado.map( (producto) => {
          this.delete(producto);
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Producto' });
      }
    });
  }

  deleteSolo(producto : Producto){
    this.confirmationService.confirm({
      message: 'Esta seguro que queres eliminar el Producto?',
      header: 'Eliminar Producto',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(producto);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'No se elimino el Producto' });
      }
    });
  }

  delete(producto: Producto) {
    this.productoService.deleteProducto(producto).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Producto Eliminado' });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrio un error al eliminar el Producto` });
      },
      complete: () => {
        this.llenarTabla();
      }
    });
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  mostrarModalCrud(producto: Producto | null, modo:any){
    let header = "";
    if (modo === 'A'){
      header = "Nuevo Producto";
    }else if (modo === 'M'){
      header = "Modificar Producto";
    }

    const data = {producto, modo}

    this.ref = this.dialogService.open(ProductoCrudComponent, {
      header: header,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((productoCrud: Producto) => {
      if (modo === 'M'){
        this.editar(productoCrud)
      }
      if (modo === 'A'){
        this.alta(productoCrud)
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
