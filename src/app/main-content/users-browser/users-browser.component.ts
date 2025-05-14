import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserItemComponent } from './user-item/user-item.component';
import { UsersService } from '../users.service';
import { User } from '../users.model';
import { PaginationComponent } from './pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-browser',
  imports: [UserItemComponent, PaginationComponent, FormsModule],
  templateUrl: './users-browser.component.html',
  styleUrl: './users-browser.component.css',
})
export class UsersBrowserComponent implements OnInit {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // page = signal<number>(0);
  total = signal<number>(0);
  users = signal<User[]>([]);
  usersThisPage = computed<number>(() => this.users().length);
  loading = signal(false); // Use this for loading indicator later

  ngOnInit() {
    const subscription = this.route.queryParams.subscribe((val) => {
      if (val['page']) {
        // this.page.set(val['page'])
        this.drawPage(parseInt(val['page']));
      } else {
        this.router.navigate(["./"], {queryParams: {page: 1}})
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSearch(search: HTMLInputElement) {
    console.log(search.value);
    // this.router.navigate(["./"], {queryParams: {page: this.page(), search: search.value}})
  }

  private drawPage(page: number) {
    this.loading.set(true);
    const subscription = this.usersService
      .getUsersPage(page)
      .subscribe((val) => {
        this.total.set(val['total']);
        this.users.set(val.users);
        this.loading.set(false);
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
