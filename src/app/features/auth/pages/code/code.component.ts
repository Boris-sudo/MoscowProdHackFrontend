import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export default class CodeComponent {
  code: string = '';

  login() {

  }
}
