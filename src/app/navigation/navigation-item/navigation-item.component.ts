import { Component, input } from '@angular/core';

@Component({
  selector: 'li[app-navigation-item]',
  imports: [],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.css'
})
export class NavigationItemComponent {
  hasDropdown = input(false);
}
