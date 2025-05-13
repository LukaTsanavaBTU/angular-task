import { Component } from '@angular/core';
import { UserItemComponent } from './user-item/user-item.component';

@Component({
  selector: 'app-users-browser',
  imports: [UserItemComponent],
  templateUrl: './users-browser.component.html',
  styleUrl: './users-browser.component.css'
})
export class UsersBrowserComponent {

}
