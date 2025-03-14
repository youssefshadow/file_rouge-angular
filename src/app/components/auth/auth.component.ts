import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from '../../signup/signup.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  isLogin: boolean = true;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  // Connexion de l'utilisateur
  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log("Réponse de l'API:", response);
        if (response.length > 0) {
          console.log('Utilisateur connecté :', response);
          this.errorMessage = ''; // Réinitialisation du message d'erreur
          alert('Connexion réussie !'); // Message de succès
        } else {
          this.errorMessage = 'Identifiants incorrects';
          console.log('Identifiants incorrects');
        }
        this.clearForm();
      },
      (error) => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
      }
    );
  }

  // Bascule entre formulaire de connexion et inscription
  toggleForm() {
    this.isLogin = !this.isLogin; // Inverse la valeur de isLogin
    this.errorMessage = ''; // Réinitialiser les messages d'erreur lors du basculement
    this.clearForm(); // Réinitialiser les champs de formulaire
  }

  // Réinitialisation du formulaire
  clearForm() {
    this.username = '';
    this.password = '';
  }
}
