export enum NovedadesMensaje {
    COMENTARIO  = '<p>&usuario agrego un comentario a &evento</p>',
    CREO        = '<p>&usuario creo el evento &evento</p>',
    CERRO       = '<p>&usuario cerró el evento &evento</p>',
    AVANZO      = '<p>El evento &evento se avanzo a la etapa <b>&tarea</b> y se asigno a &usuario</p>',
    RETROCESO   = '<p>El evento &evento se revirtio a la etapa <b>&tarea</b> y se asigno a &usuario</p>',
    REASIGNO    = '<p>El evento &evento se reasigno a &usuario</p>',
    ESTIMAR     = '<p>El usuario &usuario estimo el evento &evento</p>'
}


/*

<p-chip label="&evento" routerLink="/evento/&eventoId" style="background-color: &eventoColor; color: black;"></p-chip>

    COMENTARIO = "{{novedad.usuario.usuario}} agrego un comentario a {{novedad.evento.evento}}"

    COMENTARIO = "&usuario agrego un comentario a &evento"

    COMENTARIO = "%1 agrego un comentario a %2"


    <div *ngIf="novedad.accion === 'AVANZO'" class="descripcion">
        <p>El evento {{novedad.evento.evento}} se avanzo a la etapa <b>{{novedad.tarea}}</b> y se asigno a {{novedad.usuario.usuario}}</p>
    </div>
    <div *ngIf="novedad.accion === 'RETROCESO'" class="descripcion">
        <p>El evento {{novedad.evento.evento}} se revirtio a la etapa <b>{{novedad.tarea}}</b> y se asigno a {{novedad.usuario.usuario}}</p>
    </div>
    <div *ngIf="novedad.accion === 'REASIGNO'" class="descripcion">
        <p>El evento {{novedad.evento.evento}} se reasigno a {{novedad.usuario.usuario}}</p>
    </div>

*/
