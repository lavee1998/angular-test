import { Component } from '@angular/core';
import { HangTreeComponent } from '../../components/drawer/drawer.component.';
import { ButtonComponent } from '../../components/Button/button.component';
import { RouterLink } from '@angular/router';
import { AppConfigService } from '../../services/app-config/app-config.service';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HangTreeComponent, ButtonComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(
    private appConfigService: AppConfigService,
    private gameService: GameService
  ) {}
  readonly startPageRoute = this.appConfigService.paths.start;
}
