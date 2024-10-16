import { Component, computed, inject, signal } from '@angular/core';
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
  private readonly gameService = inject(GameService);
  readonly selectedLength = signal<number | undefined>(undefined);
  readonly wordLengths = computed(
    () =>
      new Set(
        this.gameService
          .words()
          .map((word) => word.length)
          .sort((a, b) => a - b)
          .filter((i) => !!i)
      )
  );

  handleSelectLength(value?: number) {
    this.selectedLength.set(value);
  }

  handleStartGame() {
    this.gameService.startNewGame(this.selectedLength());
  }
}
