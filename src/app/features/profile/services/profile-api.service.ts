import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, firstValueFrom, map } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt';
import { LoginRequest, LoginResponse, RegisterRequest, UserResponse, ValidationError } from '../../../../generated';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  public currentUser = signal<UserResponse | null> (null);

  public isAuthenticated = computed(() => this.currentUser()!==null);
  public notAuthenticated = computed(() => this.currentUser()===null);

  constructor(
    private http: HttpClient,
    private readonly jwtService: JwtService,
    private router: Router,
    private api: ApiService,
  ) {}

  async register(dto: RegisterRequest): Promise<LoginResponse | null> {
    try {
      await firstValueFrom(this.api.apiService.registerUserAuthRegisterPost(dto));
      const user_login = dto as LoginRequest;
      return await this.login(user_login);
    } catch (registerError: any) {
      this.purgeAuth();
      throw registerError.error.detail;
    }
  }

  async login(dto: LoginRequest): Promise<LoginResponse | null> {
    try {
      const resp = await firstValueFrom(this.api.apiService.loginAuthLoginPost(dto));
      console.log(resp);
      await this.setAuth(resp);
      return resp;
    } catch (loginError: any) {
      this.purgeAuth();
      throw loginError.error.detail;
    }
  }

  async getProfile(): Promise<UserResponse | string> {
    try {
      if (!this.jwtService.checkTokenSetUp()) this.jwtService.setTokenToApi();
      const resp = await firstValueFrom(this.api.apiService.getUserMeAuthMeGet());
      await this.setAuthUser(resp);
      return resp;
    } catch (profileError: any) {
      this.purgeAuth();
      return profileError.error.detail;
    }
  }

  async logout() {
    this.purgeAuth();
  }

  async setAuthUser(user: UserResponse | string) {
    if (typeof user === 'string') {
      this.purgeAuth();
      return;
    }
    this.currentUser.set(user);
  }

  async setAuth(user: LoginResponse) {
    this.jwtService.saveToken(user.access_token);
    await this.getProfile()
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUser.set(null);
    console.log(this.currentUser());
    console.log(this.isAuthenticated())
  }
}
