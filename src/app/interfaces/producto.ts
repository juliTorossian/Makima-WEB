import { Entorno } from "./entorno";
import { Modulo } from "./modulo";

export interface Producto {
    "id":        string,
    "nombre":    string,
    "modulo":    Modulo,
    "submodulo": Modulo,
    "entorno":   Entorno,
    "activo":    boolean
}
