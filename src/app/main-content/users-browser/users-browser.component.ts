import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
  total = signal<number>(0);
  users = signal<User[]>([]);
  usersThisPage = computed<number>(() => this.users().length);
  loading = signal(false); // Use this for loading indicator later

  ngOnInit() {
    const subscription = this.route.queryParams.subscribe((val) => {
      if (val['page']) {
        if (val['search']) {
          this.drawPage(parseInt(val['page']), val['search']);
        } else {
          this.drawPage(parseInt(val['page']));
        }
      } else {
        this.router.navigate(['./'], { queryParams: { page: 1 } });
        // Handle manually inputing non-existent pages
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSearch(search: HTMLInputElement) {
    if (search.value) {
      this.router.navigate(['./'], {
        queryParams: {
          page: 1,
          search: search.value,
        },
      });
    } else {
      this.router.navigate(['./'], {
        queryParams: {
          page: 1,
        },
      });
    }
  }

  onClickUser(user: User) {
    this.router.navigate(["users", user.id])
  }

  private drawPage(page: number, search?: string) {
    this.loading.set(true);
    let subscription;
    if (search) {
      subscription = this.usersService
        .getSearchUsersPage(page, search)
        .subscribe((val) => {
          this.total.set(val['total']);
          this.users.set(val.users);
          this.loading.set(false);
        });
    } else {
      subscription = this.usersService.getUsersPage(page).subscribe((val) => {
        this.total.set(val['total']);
        this.users.set(val.users);
        this.loading.set(false);
      });
    }
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
