import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    // Vérifier si un utilisateur est déjà connecté en utilisant le localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedIn.next(true);
    }
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Inscription de l'utilisateur
  signup(user: any): Observable<any> {
    // Vérifier d'abord si l'utilisateur existe déjà
    return this.http
      .get<any[]>(this.apiUrl, {
        params: new HttpParams().set('username', user.username),
      })
      .pipe(
        switchMap((existingUsers) => {
          if (existingUsers.length > 0) {
            return throwError(
              () => new Error("Ce nom d'utilisateur existe déjà.")
            );
          }
          // Si l'utilisateur n'existe pas, on le crée
          return this.http.post(this.apiUrl, user);
        }),
        catchError((error) => {
          console.error('Erreur lors de la vérification', error);
          return throwError(error);
        })
      );
  }

  // Connexion de l'utilisateur
  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map((response) => {
        if (response.length > 0) {
          // Si l'utilisateur existe, on stocke ses informations dans le localStorage
          const user = response[0];
          localStorage.setItem('user', JSON.stringify(user));
          this.loggedIn.next(true);
          this.router.navigate(['/cars']); // Redirection vers la page des voitures
        }
        return response;
      }),
      catchError((error) => {
        console.error('Erreur lors de la connexion', error);
        return throwError(error);
      })
    );
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

  // Obtenir l'utilisateur actuellement connecté
  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // Mettre à jour le profil utilisateur
  updateProfile(userId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, updatedData).pipe(
      map((response) => {
        // Mettre à jour les informations dans le localStorage
        localStorage.setItem('user', JSON.stringify(response));
        return response;
      }),
      catchError((error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
        return throwError(error);
      })
    );
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  // Changer le mot de passe
  changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl, {
        params: new HttpParams()
          .set('id', userId.toString())
          .set('password', oldPassword),
      })
      .pipe(
        switchMap((users) => {
          if (users.length === 0) {
            return throwError(() => new Error('Mot de passe actuel incorrect'));
          }
          return this.http.patch(`${this.apiUrl}/${userId}`, {
            password: newPassword,
          });
        }),
        catchError((error) => {
          console.error('Erreur lors du changement de mot de passe', error);
          return throwError(error);
        })
      );
  }
}
