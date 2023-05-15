
export interface Usuario {
    id:       string;
    nombre:   string;
    apellido: string;
    mail:     string;
    usuario:  string;
    rol:      Rol[];
    color:    string;
    activo:   boolean;
}

export interface UsuarioCorto {
    id:      string;
    usuario: string;
    rol:     Rol[];
    color:   string;
}

export interface Rol {
    id:                 string;
    descipcion:         string;
    controlTotal:       boolean;
    controlEvento:      boolean;
    controlCliente:     boolean;
    controlProducto:    boolean;
    controlTipo:        boolean;
    controlHora:        boolean;
    controlUsuario:     boolean;
}
