import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authService.getCurrentUser();

    if (user?.role?.toLowerCase() === 'admin') {
      return true;
    }

    // Rediriger vers la liste des voitures si l'utilisateur n'est pas admin
    return this.router.createUrlTree(['/cars']);
  }
}
