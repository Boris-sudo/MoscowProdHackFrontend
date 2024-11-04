import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header.component';
import { SideMenuComponent } from './core/components/side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideMenuComponent],
  template: `
    <HeaderComp/>

    <div class="container">
      <router-outlet/>

      <SideMenuComp/>
    </div>
  `,
  styles: `

  `
})
export class AppComponent {
  title = 'MoscowProdHackFrontend';
}
