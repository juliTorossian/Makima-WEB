import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shortcut, Shortcut_txt } from './interfaces/shortcut';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @HostListener('window:'+Shortcut.INFO, ['$event'])
  sc_alta(event: KeyboardEvent) {
    event.preventDefault();
    // console.log("info de shortcuts");
    this.mostarInfoShortcut();
  }

  private router = inject(Router)
  title = 'Makima-WEB';

  atajos: any = [];
  visible: boolean = false;
  
  ngOnInit(){
    this.setAtajos();
  }


  muestraHeader() : boolean{
    return ((this.router.url !== '/login'))
  }


  setAtajos() {
    const keys = Object.keys(Shortcut_txt);
    const atajoDsc = Object.values(Shortcut_txt);
    const atajoCmb = Object.values(Shortcut);

    keys.forEach((key, index) => {
      let aux = atajoCmb[index].split('.');
      aux.shift();
      let atajoAux = ''
      for (let i = 0; i < aux.length; i++) {
        const a = aux[i];
        atajoAux += a.charAt(0).toUpperCase() + a.slice(1)
        if (i<(aux.length -1)){
          atajoAux += ' + ';
        }
      }

      this.atajos.push({
        desc: atajoDsc[index],
        atajo: atajoAux
      })
    })
  }

  mostarInfoShortcut(){
    this.visible = !this.visible;
  }

}
