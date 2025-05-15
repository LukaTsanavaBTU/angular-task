import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-div',
  imports: [],
  templateUrl: './info-div.component.html',
  styleUrl: './info-div.component.css',
})
export class InfoDivComponent {
  label = input.required<string>();
  text = input.required<string>();
}
