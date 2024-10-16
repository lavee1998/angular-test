import { Component, computed, inject, input } from '@angular/core';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-selected-word',
  standalone: true,
  templateUrl: './selected-word.component.html',
  styleUrl: './selected-word.component.css',
})
export class SelectedWordComponent {
  private readonly gameService = inject(GameService);
  readonly selectedWordLetters = computed(() =>
    this.gameService.selectedWord().split('')
  );
  readonly guessedLetters = computed(() =>
    Array.from(this.gameService.guessedLetters())
  );
  readonly letters = this.gameService.letters;
}
