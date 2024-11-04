import { Routes } from '@angular/router';
import { IntroGuard } from './features/intro/guards/intro.guard';
import { inject } from '@angular/core';
import { ProfileApiService } from './features/profile/services/profile-api.service';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./features/intro/intro.routes"),
    canActivate: [IntroGuard]
  },
  {
    path: "home",
    loadChildren: () => import("./features/intro/intro.routes"),
    canActivate: [
      () => inject(ProfileApiService).isAuthenticated,
    ]
  },
  {
    path: "profile",
    loadChildren: () => import("./features/profile/profile.routes"),
    canActivate: [
      () => inject(ProfileApiService).isAuthenticated,
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
