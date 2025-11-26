import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioLogado } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<UsuarioLogado | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.checkInitialStatus();
  }

  private checkInitialStatus(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userData = localStorage.getItem(this.USER_KEY);
      
      if (token && userData) {
        try {
          const user: UsuarioLogado = JSON.parse(userData);
          this.setLoggedInState(true, user);
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  public login(token: string, user: UsuarioLogado): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.setLoggedInState(true, user);
  }
  
  public logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.setLoggedInState(false, null);
    this.router.navigate(['/usuario/login']); 
  }
  
  private setLoggedInState(isLoggedIn: boolean, user: UsuarioLogado | null): void {
    this.loggedInSubject.next(isLoggedIn);
    this.currentUserSubject.next(user);
  }

  public getUserId(): number | null {
    const user = this.currentUserSubject.getValue();
    console.log('LoginService.getUserId() - User:', user);
    return user ? user.id : null;
  }

  public getIsLoggedInSnapshot(): boolean {
    return this.loggedInSubject.getValue();
  }

  public getCurrentUser(): UsuarioLogado | null {
    return this.currentUserSubject.getValue();
  }
}