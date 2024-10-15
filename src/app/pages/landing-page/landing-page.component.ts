import { Component } from '@angular/core';
import { HangTreeComponent } from '../../components/hang-tree/hang-tree.component';
import { ButtonComponent } from '../../components/Button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HangTreeComponent, ButtonComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
