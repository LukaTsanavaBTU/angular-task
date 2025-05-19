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
    return this.http.get<{
      users: User[];
      total: number;
      [others: string]: unknown;
    }>('https://dummyjson.com/users', {
      params: params,
    });
  }

  getSearchUsersPage(page: number, query: string) {
    const skipVal = ((page - 1) * 10).toString();
    const params = new HttpParams()
      .set('limit', '10')
      .set('skip', skipVal)
      .set('q', query);
    return this.http.get<{
      users: User[];
      total: number;
      [others: string]: unknown;
    }>('https://dummyjson.com/users/search', {
      params: params,
    });
  }

  getUserById(id: string) {
    return this.http.get<User>('https://dummyjson.com/users/' + id);
  }

  editUser() {
    // https://dummyjson.com/users/1
  }
}
