import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideMenuService } from '../services/side-menu.service';

@Component({
  selector: 'HeaderComp',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="container">
      <div class="content">
        <a routerLink="main">
          <div class="logo">
            <div style="width: 20px; height: 20px; background: #444;"></div>
          </div>
        </a>

        <div class="flex flex-row items-center content-center" style="gap: 15px;">
          <a routerLink="/profile" class="buttons">
            <p class="profile__link">Личный кабинет</p>
            <img class="profile__img" alt="profile image" src="./user.png">
          </a>

          <div (click)="Interact()" class="hamburger">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line moving-line" #moving_line></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: '../styles/header.component.css',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('moving_line') moving_line!: ElementRef<HTMLDivElement>;

  constructor(
    private sideMenuService: SideMenuService
  ) {
  }

  ngAfterViewInit() {
    this.sideMenuService.events$.subscribe(() => {
      if (this.sideMenuService.state) this.Open();
      else this.Close();
    });
  }

  Open() {
    this.moving_line.nativeElement.style.width = '30px';
  }

  Close() {
    this.moving_line.nativeElement.style.width = '18px';
  }

  Interact() {
    this.sideMenuService.Interact();
  }
}
