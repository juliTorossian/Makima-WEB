import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { invertColor } from '../../helpers/color';

@Component({
  selector: 'app-badge',
  template: `
    <span class="badge" [style.background-color]="color" [style.color]="constraste()" (click)="navigateTo(url)">{{ text }}</span>
  `,
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {
  @Input() color!: string;
  @Input() text!: string;
  @Input() url!: string;

  private router = inject(Router);

  ngOnInit(): void {
    // console.log(this.color);
    // console.log(this.text);
    // console.log(this.url);
  }
  constraste(){
    return invertColor(this.color);
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
