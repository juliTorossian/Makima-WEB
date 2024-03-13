import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);

  API_BASEURL = environment.API_BASEURL;
  API_PORT = environment.API_PORT;
  API_VERSION = environment.API_VERSION;
  URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;


  getProductos(){
    return this.http.get(`${this.URL_COMPLETA}/producto`).pipe(map( (res:any) => res.data ));
  }

  setProducto(producto: Producto){
    return this.http.post(`${this.URL_COMPLETA}/producto`, producto).pipe(map( (res:any) => res.data ));
  }

  putProducto(producto: Producto){
    return this.http.patch(`${this.URL_COMPLETA}/producto/`+producto.id, producto).pipe(map( (res:any) => res.data ));
  }

  deleteProducto(producto: Producto){
    return this.http.delete(`${this.URL_COMPLETA}/producto/${producto.id}`).pipe(map( (res:any) => res.data ));
  }
  
  getProducto(productoId : string){
    return this.http.get(`${this.URL_COMPLETA}/producto/${productoId}`).pipe(map( (res:any) => res.data ));
  }
}
