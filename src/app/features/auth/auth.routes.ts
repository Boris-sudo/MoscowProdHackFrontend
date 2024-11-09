import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: 'register', loadComponent: () => import('./pages/register/register.component'), pathMatch: "full" },
      { path: 'login', loadComponent: () => import('./pages/login/login.component'), pathMatch: "full" },
    ]
  }
];

export default routes;
