import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Ajout de OnInit
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Correction de styleUrl à styleUrls
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Écoute les changements de l'état de connexion
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  // Déconnexion de l'utilisateur
  logout() {
    this.authService.logout();
  }
}
