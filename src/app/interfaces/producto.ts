import { Entorno } from "./entorno";

export interface Producto {
    "id":        string,
    "nombre":    string,
    "entorno":   Entorno,
    "activo":    boolean
}
