import { Component } from '@angular/core';

@Component({
  selector: 'app-boton-back',
  templateUrl: './boton-back.component.html',
  styleUrls: ['./boton-back.component.css']
})
export class BotonBackComponent {
  goBack() {
    window.history.back();
  }
}
