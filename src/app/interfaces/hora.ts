export interface RegistroHora {
    id:         string;
    fecha:      Date;
    usuario:    string;
    totalHoras: number;
    horas:      Hora[];
}

export interface Hora {
    id:            string;
    evento:        string;
    inicio:        string;
    final:         string;
    total:         number;
    observaciones: string;
}
