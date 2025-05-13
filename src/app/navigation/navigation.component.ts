import { Component } from '@angular/core';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';

@Component({
  selector: 'app-navigation',
  imports: [NavigationItemComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {}
