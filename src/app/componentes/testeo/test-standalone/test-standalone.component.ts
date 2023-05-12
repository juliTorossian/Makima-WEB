import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-standalone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-standalone.component.html',
  styleUrls: ['./test-standalone.component.css']
})
export class TestStandaloneComponent {

}
