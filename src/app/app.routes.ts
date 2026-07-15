import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
