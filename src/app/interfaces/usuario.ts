
export interface Usuario {
    id:       string;
    nombre:   string;
    apellido: string;
    mail:     string;
    usuario:  string;
    rol:      Rol;
    color:    string;
    activo:   boolean;
}

export interface UsuarioCorto {
    id:      string;
    usuario: string;
    rol:     string;
    color:   string;
}

export interface Rol {
    codigo:     string;
    descipcion: string;
}
