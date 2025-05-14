import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserItemComponent } from './user-item/user-item.component';
import { UsersService } from '../users.service';
import { User } from '../users.model';

@Component({
  selector: 'app-users-browser',
  imports: [UserItemComponent],
  templateUrl: './users-browser.component.html',
  styleUrl: './users-browser.component.css',
})
export class UsersBrowserComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  users = signal<User[]>([]);
  loading = signal(false); // Use this for loading indicator later

  ngOnInit() {
    this.drawPage(1);
  }

  private drawPage(page: number) {
    this.loading.set(true);
    const subscription = this.usersService.getUsersPage(page).subscribe((val) => {
      this.users.set(val.users);
      this.loading.set(false);
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
