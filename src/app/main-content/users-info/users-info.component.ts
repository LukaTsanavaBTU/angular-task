import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { InfoDivComponent } from './info-div/info-div.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import type { User } from '../users.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-info',
  imports: [InfoDivComponent],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css',
})
export class UsersInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  private location = inject(Location);
  user = signal<User | undefined>(undefined);

  ngOnInit() {
    this.route.paramMap.subscribe((val) => {
      if (val.get('id')) {
        this.getUser(val.get('id')!);
      }
    });
  }

  onBack() {
    this.location.back();
  }

  getUser(id: string) {
    const subscription = this.usersService.getUserById(id).subscribe((val) => {
      this.user.set(val.users[0]);
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
