import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideMenuService } from '../services/side-menu.service';

@Component({
  selector: 'SideMenuComp',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="container" #container></div>
  `,
  styles: `
    .container {
      width:               100vw;
      height:              calc(100vh - var(--header-height));
      top:                 var(--header-height);
      left:                0;
      max-height:          0;
      position:            absolute;
      overflow-y:          hidden;
      background:          #ffffff;
      transition-duration: .3s;
    }
  `
})
export class SideMenuComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  constructor(
    private sideMenuService: SideMenuService,
  ) {
  }

  ngAfterViewInit() {
    this.sideMenuService.events$.subscribe(() => {
      if (this.sideMenuService.state) this.Open();
      else this.Close();
    });
  }

  Open() {
    this.container.nativeElement.style.maxHeight = '100vh';
  }

  Close() {
    this.container.nativeElement.style.maxHeight = '0';
  }
}
