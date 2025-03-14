import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Écoute les changements de l'état de connexion
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        const user = this.authService.getCurrentUser();
        console.log('Current user:', user);
        console.log('User role:', user?.role);
        this.isAdmin = user?.role?.toLowerCase() === 'admin';
        console.log('Is admin?', this.isAdmin);
      } else {
        this.isAdmin = false;
      }
    });
  }

  // Déconnexion de l'utilisateur
  logout() {
    this.authService.logout();
  }
}
