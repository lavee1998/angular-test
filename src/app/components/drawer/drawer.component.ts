import { Component, inject, input } from '@angular/core';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  full = input<boolean>(false);
  private gameService = inject(GameService);
  public readonly wrongTips = this.gameService.wrongTips;
}
