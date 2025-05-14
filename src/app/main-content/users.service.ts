import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  getUsersPage(page: number) {
    const skipVal = ((page - 1) * 10).toString();
    const params = new HttpParams().set('limit', '10').set('skip', skipVal);
    return this.http.get<{ users: User[]; [others: string]: unknown }>(
      'https://dummyjson.com/users',
      {
        params: params,
      }
    );
  }
}
