import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'li[app-navigation-item]',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.css',
})
export class NavigationItemComponent {
  hasDropdown = input(false);
  linksTo = input.required<string>();
}
