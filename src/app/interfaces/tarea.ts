export interface Tarea {
    id:         string;
    nombre:     string;
    rol:        string;
    controla:   boolean;
    clave:      string;
    completada: boolean;
    reqComentario:    boolean;
    comentario: string;
    color:      string;
}

export enum TareaClave {
    ESTIMAR
}