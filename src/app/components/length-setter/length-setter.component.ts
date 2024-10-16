import { Component } from '@angular/core';
import { ButtonComponent } from '../Button/button.component';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-length-setter',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './length-setter.component.html',
  styleUrl: './length-setter.component.css',
})
export class LengthSetterComponent {
  constructor(private gameService: GameService) {}
  selectedLength?: number;

  handleSelectLength(value?: number) {
    this.selectedLength = value;
  }

  handleStartGame() {
    this.gameService.startNewGame(this.selectedLength);
  }

  get wordLengths() {
    return new Set(
      this.gameService.words
        .map((word) => word.length)
        .sort((a, b) => a - b)
        .filter((i) => !!i)
    );
  }
}
