import { Routes } from '@angular/router';
import { UsersBrowserComponent } from './main-content/users-browser/users-browser.component';
import { MiscPageComponent } from './main-content/misc-page/misc-page.component';
import { UsersInfoComponent } from './main-content/users-info/users-info.component';

export const routes: Routes = [
  { path: 'users/:id', component: UsersInfoComponent },
  { path: 'users', component: UsersBrowserComponent },
  { path: 'test1', component: MiscPageComponent },
  { path: 'test2', component: MiscPageComponent },
  { path: 'test3', component: MiscPageComponent },
  { path: 'test4', component: MiscPageComponent },
  { path: 'test5', component: MiscPageComponent },
  { path: 'test6', component: MiscPageComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];
