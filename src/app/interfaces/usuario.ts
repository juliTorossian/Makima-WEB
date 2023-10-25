
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

export interface UsuarioPreferencia {
    clave: string,
    desc?: string,
    activo?: boolean
}

export enum PreferenciasClave {
    EVENTO_ASIGNADO = 'EVENTO_ASIG'
}

export const PreferenciasData: UsuarioPreferencia[] = [
    {
        clave: PreferenciasClave.EVENTO_ASIGNADO,
        desc: 'Al asiganr un evento',
        activo: false
    }
]

export interface UsuarioCorto {
    id:      string;
    usuario: string;
    rol:     Rol[];
    color:   string;
}

export interface Rol {
    id:         string;
    descipcion: string;
    permisos:   PermisoRol[];
}

export interface PermisoRol {
    clave: string;
    desc?:  string;
    nivel: number;
}

export enum PermisoClave {
    ADMIN = 'ADM',
    EVENTO = 'EVT',
    CLIENTE = 'CLI',
    USUARIO = 'USR',
    MODULO = 'MOD',
    ENTORNO = 'ENT',
    PRODUCTO = 'PRD',
    HORAS_GENERALES = 'HOG',
    EVENTO_DOCUMENTO = 'EVD',
    TAREA = 'TAR',
    TIPO_EVENTO = 'TEV',
    ROL = 'ROL'
}

export const permisosData: PermisoRol[]= [
    {
        clave: 'ADM',
        desc: 'Administrador',
        nivel: 0
    },
    {
        clave: 'EVT',
        desc: 'Eventos',
        nivel: 3
    },
    {
        clave: 'USR',
        desc: 'Usuarios',
        nivel: 3
    },
    {
        clave: 'MOD',
        desc: 'Modulos',
        nivel: 3
    },
    {
        clave: 'ENT',
        desc: 'Entornos',
        nivel: 3
    },
    {
        clave: 'PRD',
        desc: 'Productos',
        nivel: 3
    },
    {
        clave: 'CLI',
        desc: 'Clientes',
        nivel: 3
    },
    {
        clave: 'HOG',
        desc: 'Horas Generales',
        nivel: 1
    },
    {
        clave: 'EVD',
        desc: 'Documentos de eventos',
        nivel: 3
    },
    {
        clave: 'TAR',
        desc: 'Tareas',
        nivel: 3
    },
    {
        clave: 'TEV',
        desc: 'Tipo de Eventos',
        nivel: 3
    },
    {
        clave: 'ROL',
        desc: 'Roles',
        nivel: 3
    },
]
