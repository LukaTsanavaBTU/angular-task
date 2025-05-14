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
  loading = signal(false);
  ngOnInit() {
    this.loading.set(true);
    const subscription = this.usersService
      .getUsersPage(1)
      .subscribe((val) => {
        this.users.set(val.users);
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
