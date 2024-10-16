import { Component } from '@angular/core';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { ButtonComponent } from '../../components/Button/button.component';
import { RouterLink } from '@angular/router';
import { RouteSegments } from '../../app.routes';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [DrawerComponent, ButtonComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  readonly startPageRoute = RouteSegments.StartGame;
}
