import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true, // <-- Ajoutez cette ligne
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.authService
      .signup({
        username: this.username,
        password: this.password,
        role: 'user',
      })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => (this.errorMessage = err.message || 'Erreur inconnue.'),
      });
  }
}
