import { Usuario } from "./usuario"

export interface Comentario {
    id: string,
    comentario: string,
    fecha: Date,
    usuario: Usuario,
    adjunto: Adjunto
}

export interface Adjunto {
    tiene: boolean,
    tipo: string,
    base: string,
    nombre: string
}
