import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { UserResponseModel } from '../../../../generated';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './jwt';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  public currentUserSubject = new BehaviorSubject<UserResponseModel | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private api: ApiService;

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private http: HttpClient,
    private readonly jwtService: JwtService,
    private router: Router,
  ) {
    this.api = new ApiService(this.http);
  }

  async register() {

  }

  async login() {

  }

  async getProfile() {

  }

  async logout() {
    this.purgeAuth();
  }

  setAuth(user: UserResponseModel) {
    this.jwtService.saveToken('user.token')
    this.currentUserSubject.next(user);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']).then();
  }
}
