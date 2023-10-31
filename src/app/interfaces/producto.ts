import { Entorno } from "./entorno";

export interface Producto {
    "id":        string,
    "sigla":     string,
    "nombre":    string,
    "entorno":   Entorno,
    "activo":    boolean
}
