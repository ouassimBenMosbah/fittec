import { Injectable } from '@angular/core';
import { LoginData } from 'src/app/@types/interfaces/login-data.interface';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public readonly localStorageTokenKey = 'tokenKey';
  public token: string | undefined;

  constructor(private localStorageService: LocalStorageService) {}

  public logout(): void {
    this.localStorageService.clearKey(this.localStorageTokenKey);
    this.token = undefined;
  }

  public isLoggedIn(): boolean {
    return !!this.token;
  }

  public setTokenInLocalStorage({ token }: LoginData): void {
    this.localStorageService.set(this.localStorageTokenKey, token);
    this.token = token;
  }
}
