export enum NovedadesMensaje {
    COMENTARIO  = '<p>&usuario agrego un comentario a &evento</p>',
    CREO        = '<p>&usuario creo el evento &evento</p>',
    CERRO       = '<p>&usuario cerró el evento &evento</p>',
    AVANZO      = '<p>El evento &evento se avanzo a la etapa <b>&tarea</b> y se asigno a &usuario</p>',
    RETROCESO   = '<p>El evento &evento se revirtio a la etapa <b>&tarea</b> y se asigno a &usuario</p>',
    REASIGNO    = '<p>El evento &evento se reasigno a &usuario</p>',
    ESTIMAR     = '<p>El usuario &usuario estimo el evento &evento</p>'
}
export enum NovedadesColor {
    COMENTARIO  = '#fd7e14',
    CREO        = '#17a2b8',
    CERRO       = '#dc3545',
    AVANZO      = '#20c997',
    RETROCESO   = '#ffc107',
    REASIGNO    = '#6c757d',
    ESTIMAR     = '#6610f2',
    OTRO        = '#6610f2'
}
