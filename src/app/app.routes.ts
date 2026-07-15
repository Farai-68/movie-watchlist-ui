import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
