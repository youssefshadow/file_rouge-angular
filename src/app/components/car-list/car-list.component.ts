import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des Voitures</h2>
        <button *ngIf="isAdmin" class="btn btn-primary" routerLink="/add-car">
          <i class="fas fa-plus me-2"></i>Ajouter une voiture
        </button>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" *ngFor="let car of cars">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ car.marque }} {{ car.modele }}</h5>
              <div class="d-flex align-items-center mb-3">
                <div
                  class="color-preview me-2"
                  [style.background-color]="car.couleur"
                ></div>
                <span class="text-muted">{{ car.couleur }}</span>
              </div>
              <p class="text-muted small mb-3">
                Créé par: {{ car.createdBy || 'Non spécifié' }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-outline-primary btn-sm"
                  [routerLink]="['/car', car.id]"
                >
                  <i class="fas fa-eye me-1"></i>Détails
                </button>
                <div *ngIf="isAdmin">
                  <button
                    class="btn btn-outline-warning btn-sm me-2"
                    [routerLink]="['/edit-car', car.id]"
                  >
                    <i class="fas fa-edit me-1"></i>Modifier
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    (click)="deleteCar(car.id)"
                  >
                    <i class="fas fa-trash me-1"></i>Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message si aucune voiture -->
      <div *ngIf="cars.length === 0" class="text-center mt-5">
        <i class="fas fa-car fa-3x text-muted mb-3"></i>
        <p class="lead">Aucune voiture disponible pour le moment.</p>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        transition: transform 0.2s ease-in-out;
        border: none;
        background: white;
      }
      .card:hover {
        transform: translateY(-5px);
      }
      .btn-sm {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      }
      .color-preview {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 2px solid #dee2e6;
      }
    `,
  ],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  isAdmin = false;

  constructor(
    private carService: CarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCars();
    this.checkUserRole();
  }

  loadCars() {
    this.carService.getCars().subscribe(
      (cars) => {
        this.cars = cars;
      },
      (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
      }
    );
  }

  checkUserRole() {
    const user = this.authService.getCurrentUser();
    console.log('Current user:', user);
    console.log('User role:', user?.role);
    this.isAdmin = user?.role?.toLowerCase() === 'admin';
    console.log('Is admin?', this.isAdmin);
  }

  deleteCar(id: number | undefined) {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.carService.deleteCar(id).subscribe(
        () => {
          this.cars = this.cars.filter((car) => car.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }
}
