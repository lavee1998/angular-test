import { Component, computed, input } from '@angular/core';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-hang-tree',
  standalone: true,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class HangTreeComponent {
  wrongTips = computed(() => this.gameService.wrongTips());

  full = input<boolean>(false);

  constructor(private gameService: GameService) {}
}
