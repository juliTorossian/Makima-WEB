import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tipo-evento-crud',
  templateUrl: './tipo-evento-crud.component.html',
  styleUrls: ['./tipo-evento-crud.component.css']
})
export class TipoEventoCrudComponent {
  modo!: any;

  opcionesTareas : any[] = [{ label: "Ingreso", value: "ing" },
                            { label: "Desarrollo", value: "desa" },
                            { label: "Testeo", value: "test" },];

  countTareas:number = 1;

  tareaFormArray!: FormArray;
  tareas = [];

  constructor(private fb: FormBuilder) {}


  agregarFila() {
    const tarea = this.fb.group({
      tarea: ['', Validators.required],
      etapaRevertir: ['', Validators.required]
    });
    this.tareaFormArray.push(tarea);
    // this.tareas.push({
    //   etapa: this.tareas.length + 1,
    //   tarea: '',
    //   etapaRevertir: ''
    // });
  }


  // tareaFrom = new FormGroup({
  //   etapa: new FormControl(this.countTareas),
  //   tarea: new FormControl("", [Validators.required]),
  //   rollback: new FormControl(null),
  // });

  // tareas = [{etapa: this.countTareas, tarea: "", rollback: null}]

  tipoEvento = new FormGroup({
    id: new FormControl("", [Validators.required]), 
    descripcion: new FormControl("", [Validators.required]),
    activo: new FormControl(true),
    color: new FormControl("", [Validators.required]),
    propio: new FormControl(false)
  });


  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  ngOnInit(){
    this.tareaFormArray = this.fb.array([]);


    console.log(this.config.data);
    this.modo = this.config.data.modo;
    let tipoEvento = this.config.data.tipoEvento;
    
    if (tipoEvento){
      this.tipoEvento.get("id")?.setValue(tipoEvento.id);
      this.tipoEvento.get("descripcion")?.setValue(tipoEvento.descripcion);
      this.tipoEvento.get("activo")?.setValue(tipoEvento.activo);
      this.tipoEvento.get("color")?.setValue(tipoEvento.color);
      this.tipoEvento.get("propio")?.setValue(tipoEvento.propio);
    }
  }

  accion($event:any){
    $event.preventDefault();
    const tipoEvento : any = {
      id: this.tipoEvento.get('id')?.value,
      descripcion: this.tipoEvento.get('descripcion')?.value,
      activo: this.tipoEvento.get('activo')?.value,
      color: this.tipoEvento.get('color')?.value,
      propio: this.tipoEvento.get('propio')?.value
    }

    this.ref.close(tipoEvento);
  }
}
