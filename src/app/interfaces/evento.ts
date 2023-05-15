import { Cliente } from "./cliente";
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
    usuarioAlta:    UsuarioCorto;
    usuarioActual:  UsuarioCorto;
    cerrado:        boolean;
    estimacion:     number;
    prioridad:      number;
    propio:         boolean;
    madre:          Evento;
    detalle:        EventoDetalle | null;
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
    estimacion: number;
    total:      number;
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