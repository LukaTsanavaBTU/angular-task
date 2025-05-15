import { Component } from '@angular/core';
import { InfoDivComponent } from "./info-div/info-div.component";

@Component({
  selector: 'app-users-info',
  imports: [InfoDivComponent],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css'
})
export class UsersInfoComponent {

}
