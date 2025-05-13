import { Routes } from '@angular/router';
import { UsersBrowserComponent } from './main-content/users-browser/users-browser.component';
import { MiscPageComponent } from './main-content/misc-page/misc-page.component';

export const routes: Routes = [
  { path: 'users', component: UsersBrowserComponent },
  { path: 'test', component: MiscPageComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];
