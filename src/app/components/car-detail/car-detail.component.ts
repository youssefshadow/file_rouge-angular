import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-lg">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h2 class="card-title mb-0">Détails de la voiture</h2>
                <button class="btn btn-outline-primary" routerLink="/cars">
                  <i class="fas fa-arrow-left me-2"></i>Retour
                </button>
              </div>

              <div *ngIf="car" class="car-details">
                <div class="row">
                  <div class="col-md-6">
                    <div class="detail-item">
                      <label class="text-muted">Marque</label>
                      <p class="h5">{{ car.marque }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="detail-item">
                      <label class="text-muted">Modèle</label>
                      <p class="h5">{{ car.modele }}</p>
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-6">
                    <div class="detail-item">
                      <label class="text-muted">Couleur</label>
                      <p class="h5">
                        <span
                          class="badge"
                          [style.background-color]="getColorCode(car.couleur)"
                        >
                          {{ car.couleur }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="detail-item">
                      <label class="text-muted">Créé par</label>
                      <p class="h5">{{ car.createdBy || 'Non spécifié' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div *ngIf="!car" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Chargement...</span>
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
        border: none;
        border-radius: 15px;
      }
      .card-body {
        padding: 2rem;
      }
      .detail-item {
        margin-bottom: 1.5rem;
      }
      .detail-item label {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .badge {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: normal;
      }
      .car-details {
        animation: fadeIn 0.5s ease-in;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carService.getCarById(id).subscribe(
        (car) => {
          this.car = car;
        },
        (error) => {
          console.error('Erreur lors du chargement des détails:', error);
        }
      );
    }
  }

  getColorCode(color: string): string {
    const colorMap: { [key: string]: string } = {
      Rouge: '#ff0000',
      Bleu: '#0000ff',
      Noir: '#000000',
      Blanc: '#ffffff',
      Gris: '#808080',
    };
    return colorMap[color] || '#808080';
  }
}
