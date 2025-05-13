import { Component } from '@angular/core';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [NavigationItemComponent, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {}
