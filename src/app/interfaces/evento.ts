import { Cliente } from "./cliente";
import { UsuarioCorto } from "./usuario";

export interface Evento {
    id:             string;
    tipo:           string;
    numero:         number;
    titulo:         string;
    tareaNombre:    string;
    cliente:        Cliente;
    producto:       string;
    usuarioAlta:    UsuarioCorto;
    usuarioActual:  UsuarioCorto;
    cerrado:        boolean;
    estimacion:     number;
    prioridad:      number;
    propio:         boolean;
    detalle:        EventoDetalle | null;
}

export interface EventoDetalle {
    EventoCircuito: EventoCircuito;
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
    tarea: string  | null;
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