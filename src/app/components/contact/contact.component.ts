import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Contactez-nous</h2>
              <form (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Nom complet</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    [(ngModel)]="contactForm.name"
                    name="name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    [(ngModel)]="contactForm.email"
                    name="email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="subject" class="form-label">Sujet</label>
                  <input
                    type="text"
                    class="form-control"
                    id="subject"
                    [(ngModel)]="contactForm.subject"
                    name="subject"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Message</label>
                  <textarea
                    class="form-control"
                    id="message"
                    rows="5"
                    [(ngModel)]="contactForm.message"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane me-2"></i>Envoyer
                  </button>
                </div>
              </form>
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
        border-radius: 10px;
      }
      .form-control {
        border-radius: 5px;
        padding: 0.75rem;
      }
      .btn-primary {
        padding: 0.75rem 2rem;
      }
    `,
  ],
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  onSubmit() {
    console.log('Formulaire soumis:', this.contactForm);
    // Réinitialiser le formulaire
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}
