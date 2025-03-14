import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <h1 class="display-4 mb-4">Bienvenue sur CarZone</h1>
          <p class="lead mb-5">
            Votre solution complète pour la gestion de votre parc automobile.
            Gérez facilement vos voitures et vos utilisateurs en quelques clics.
          </p>

          <div class="d-grid gap-3 d-md-flex justify-content-center mb-5">
            <a routerLink="/cars" class="btn btn-primary btn-lg px-4 me-md-2">
              <i class="fas fa-car me-2"></i>Voir les voitures
            </a>
          </div>

          <div class="row g-4">
            <div class="col-md-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <i class="fas fa-car fa-3x text-primary mb-3"></i>
                  <h3 class="card-title h5">Gestion des Voitures</h3>
                  <p class="card-text">
                    Ajoutez, modifiez et supprimez facilement vos voitures.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <i class="fas fa-users fa-3x text-primary mb-3"></i>
                  <h3 class="card-title h5">Gestion des Utilisateurs</h3>
                  <p class="card-text">
                    Gérez les accès et les permissions de vos utilisateurs.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <i class="fas fa-palette fa-3x text-primary mb-3"></i>
                  <h3 class="card-title h5">Personnalisation</h3>
                  <p class="card-text">
                    Personnalisez l'apparence et les fonctionnalités selon vos
                    besoins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        transition: transform 0.2s;
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .card:hover {
        transform: translateY(-5px);
      }

      .btn {
        width: 100%;
        margin-bottom: 1rem;
      }

      @media (min-width: 768px) {
        .btn {
          width: auto;
          margin-bottom: 0;
        }
      }
    `,
  ],
})
export class HomeComponent {}
