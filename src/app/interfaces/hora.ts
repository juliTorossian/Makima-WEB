export interface RegistroHoraGeneral {
    id:          string;
    nombre:      string;
    apellido:    string;
    usuario:     string;
    promedioMes: number;
    registros:   RegistroHora[];
}

export interface RegistroHora {
    id:          string;
    fecha:       string;
    usuario:     string;
    totalHoras:  number;
    horas:       Hora[];
}

export interface Hora {
    id:            string;
    evento:        string;
    inicio:        string;
    final:         string;
    total:         number;
    observaciones: string;
}
