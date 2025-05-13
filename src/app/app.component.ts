import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeaderComponent } from "./user-header/user-header.component";
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserHeaderComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'anglar-task';
}
