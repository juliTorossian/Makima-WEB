import { Cliente } from "./cliente";
import { Modulo } from "./modulo";
import { Producto } from "./producto";
import { Tarea } from "./tarea";
import { UsuarioCorto } from "./usuario";

export interface Evento {
    id:             string;
    tipo:           string;
    numero:         number;
    titulo:         string;
    tareaNombre:    string;
    cliente:        Cliente;
    producto:       Producto;
    modulo:         Modulo;
    usuarioAlta:    UsuarioCorto;
    usuarioActual:  UsuarioCorto;
    cerrado:        boolean;
    estimacion:     number;
    prioridad:      number;
    propio:         boolean;
    fechaAlta:      string;
    madre:          Evento;
    detalle:        EventoDetalle | null;
    busqueda:       string;
}

export interface EventoDetalle {
    eventoCircuito: EventoCircuito;
    eventoHoras:    EventoHoras;
}

export interface EventoCircuito {
    act:         CircuitoMomento;
    sig:         CircuitoMomento;
    ant:         CircuitoMomento;
    totalEtapas: number;
}

export interface CircuitoMomento {
    tiene: boolean | null;
    etapa: number  | null;
    tarea: Tarea  | null;
}

export interface EventoHoras {
    estimacion: EventoHorasEstimacion;
    trabajadas: number;
}

export interface EventoHorasEstimacion {
    total:      number;
    detalle:    EventoHorasDetalle[];
}

export interface EventoHorasDetalle {
    estimacion: number;
    rol:        string;
}

export interface EventoCRUD {
    id:             string;
    tipo:           string;
    numero:         number;
    titulo:         string;
    cliente:        string;
    producto:       string;
    usuarioAlta:    UsuarioCorto;
}