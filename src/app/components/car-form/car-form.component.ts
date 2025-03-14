import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mt-4">
      <h2>
        {{ isEditing ? 'Modifier la voiture' : 'Ajouter une nouvelle voiture' }}
      </h2>
      <div class="card">
        <div class="card-body">
          <form (ngSubmit)="onSubmit()" #carForm="ngForm">
            <div class="mb-3">
              <label for="marque" class="form-label">Marque</label>
              <input
                type="text"
                class="form-control"
                id="marque"
                name="marque"
                [(ngModel)]="car.marque"
                required
              />
            </div>
            <div class="mb-3">
              <label for="modele" class="form-label">Modèle</label>
              <input
                type="text"
                class="form-control"
                id="modele"
                name="modele"
                [(ngModel)]="car.modele"
                required
              />
            </div>
            <div class="mb-3">
              <label for="couleur" class="form-label">Couleur</label>
              <input
                type="color"
                class="form-control"
                id="couleur"
                name="couleur"
                [(ngModel)]="car.couleur"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? 'Modifier' : 'Ajouter' }}
            </button>
            <button
              type="button"
              class="btn btn-secondary ms-2"
              routerLink="/cars"
            >
              Annuler
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        margin-top: 20px;
      }
    `,
  ],
})
export class CarFormComponent implements OnInit {
  car: Car = {
    marque: '',
    modele: '',
    couleur: '#000000',
  };
  isEditing = false;

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('CarFormComponent initialized');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.loadCar(id);
    }
  }

  loadCar(id: number) {
    this.carService.getCarById(id).subscribe(
      (car) => {
        this.car = car;
      },
      (error) => {
        console.error('Erreur lors du chargement de la voiture:', error);
        this.router.navigate(['/cars']);
      }
    );
  }

  onSubmit() {
    if (!this.isEditing) {
      const user = this.authService.getCurrentUser();
      console.log('Current user:', user);
      if (user && typeof user === 'object') {
        Object.keys(user).forEach((key) => {
          console.log(`${key}:`, user[key]);
        });
        this.car.createdBy =
          user.name || user.username || user.login || 'Utilisateur inconnu';
      } else {
        this.car.createdBy = 'Utilisateur inconnu';
      }
      console.log('Created by:', this.car.createdBy);
    }

    const operation = this.isEditing
      ? this.carService.updateCar(this.car)
      : this.carService.addCar(this.car);

    operation.subscribe(
      () => {
        this.router.navigate(['/cars']);
      },
      (error) => {
        console.error("Erreur lors de l'enregistrement:", error);
      }
    );
  }
}
