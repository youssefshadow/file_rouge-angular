import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
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
  }
}
