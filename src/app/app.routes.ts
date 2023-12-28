import { Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { FitsComponent } from './components/pages/fits/fits.component';
import { LoginComponent } from './components/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Fitster - Home',
    loadComponent: () =>
      import('./components/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'fits',
    title: 'Find & Share new fits',
    component: FitsComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'about',
    title: 'Fitster about section',
    component: AboutComponent,
  },
  {
    path: 'contact',
    title: 'Fitster contact section',
    component: ContactComponent,
  },
  {
    path: 'login',
    title: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo([''])),
  },
];
