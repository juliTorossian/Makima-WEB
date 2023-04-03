import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-evento-crud',
  templateUrl: './evento-crud.component.html',
  styleUrls: ['./evento-crud.component.css']
})
export class EventoCRUDComponent implements OnInit {

  modo!: any;

  tiposEvento : any[] = ["CUS", "CAS", "TEC", "ORG", "MEG"];
  tipoEventoFiltrado! : any[];

  prioridades :any[] = [1, 2, 3, 4, 5];

  evento!: any;

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);


  crudEvento = new FormGroup({
    tipo: new FormControl("", [Validators.required]),
    prioridad: new FormControl("", [Validators.required]),
    titulo: new FormControl("", [Validators.required]),
    // titulo: new FormControl('', [Validators.required]),
  });

  // constructor(
  //   private ref: DynamicDialogRef,
  //   private config: DynamicDialogConfig
  // ) {}

  ngOnInit(){
    
    
    // console.log(this.config.data);
    this.modo = this.config.data.modo;
    this.evento = this.config.data.evento;
    
    if (this.evento){
      this.crudEvento.get("tipo")?.setValue(this.evento.tipo);
      // this.crudEvento.get("tipo")?.;
      this.crudEvento.get("prioridad")?.setValue(this.evento.prioridad);
      this.crudEvento.get("titulo")?.setValue(this.evento.titulo);
    }
    
  }
  /*
    id:             string;
    tipo:           string;
    numero:         number;
    titulo:         string;
    cliente:        string;
    producto:       string;
    usuarioAlta:    UsuarioCorto;
  */



  cerrarDialog() {
    this.ref.close(this.evento);
  }

  filtroTipoEvento(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.tiposEvento.length; i++) {
      let tipoEvento = this.tiposEvento[i];
      if (tipoEvento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tipoEvento);
      }
    }

    console.log(filtered);

    this.tipoEventoFiltrado = filtered;
  }

}
