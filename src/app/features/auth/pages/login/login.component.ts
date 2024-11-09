import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileApiService } from '../../../profile/services/profile-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private profileService: ProfileApiService,
  ) {}

  login() {
    this.profileService.login({
      email: this.email,
      password: this.password
    }).then(resp => {
      console.log(resp);
      this.router.navigate(['/home'])
    }).catch(error => {
      console.log(error);
    })
  }
}
