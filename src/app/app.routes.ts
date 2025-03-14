import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { ContactComponent } from './components/contact/contact.component';

// Exporter les routes pour pouvoir les utiliser ailleurs
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars',
    component: CarListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'car/:id',
    component: CarDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-car',
    component: CarFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'edit-car/:id',
    component: CarFormComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
