import { Component, inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, tap } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-producto-seleccion',
  templateUrl: './producto-seleccion.component.html',
  styleUrls: ['./producto-seleccion.component.css']
})
export class ProductoSeleccionComponent {
  productos!: Producto[];

  private productoService = inject(ProductoService)
  public ref = inject(DynamicDialogRef)

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (res : any) => {
        console.log(res);
        this.productos = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  select(producto: Producto) {
    this.ref.close(producto);
  }
}
