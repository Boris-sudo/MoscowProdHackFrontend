import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: '', loadComponent: () => import('./pages/group/group.component'), pathMatch: "full" },
      { path: '/add-bill', loadComponent: () => import('./pages/group/group.component'), pathMatch: "full" },
    ]
  }
];

export default routes;
