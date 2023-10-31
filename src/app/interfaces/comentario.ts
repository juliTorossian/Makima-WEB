import { Usuario } from "./usuario"

export interface Comentario {
    id: string,
    comentario: string,
    fecha: Date,
    usuario: Usuario
}

export interface Adjunto {
    id?: string,
    nombre: string,
    base64: string,
    mime: string
}
