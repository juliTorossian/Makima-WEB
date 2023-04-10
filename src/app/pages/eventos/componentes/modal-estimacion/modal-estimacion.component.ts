import { Component, OnInit, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-estimacion',
  templateUrl: './modal-estimacion.component.html',
  styleUrls: ['./modal-estimacion.component.css']
})
export class ModalEstimacionComponent implements OnInit{
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  estimacion! :number;

  ngOnInit(): void { 
    console.log(this.config.data);

    if(this.config.data){
      this.estimacion = this.config.data;
    }

  }

  seleccionar(){
    if (this.estimacion && this.estimacion > 0){
      this.ref.close(this.estimacion);
    }
  }
}
