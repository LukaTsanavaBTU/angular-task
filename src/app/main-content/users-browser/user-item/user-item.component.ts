import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-user-item',
  imports: [],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css',
  host: {
    '[class.selected]': 'selected()',
  },
})
export class UserItemComponent {
  firstName = input.required<string>();
  lastName = input.required<string>();
  email = input.required<string>();
  picture = input.required<string>();
  selected = input(false);
}
