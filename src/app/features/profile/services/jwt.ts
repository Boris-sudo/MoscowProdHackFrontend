import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class JwtService {
  private readonly key: string = 'jwtToken';

  getToken(): string {
    return window.localStorage[this.key];
  }

  saveToken(token: string): void {
    window.localStorage[this.key] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem(this.key);
  }
}
