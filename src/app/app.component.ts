import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private router = inject(Router)
  title = 'Makima-WEB';
  
  ngOnInit(){
    // console.log(env)
  }


  muestraHeader() : boolean{
    return ((this.router.url !== '/login'))
  }

}
