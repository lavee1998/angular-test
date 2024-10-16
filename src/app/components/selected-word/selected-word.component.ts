import { Component, computed, input } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-selected-word',
  standalone: true,
  templateUrl: './selected-word.component.html',
  styleUrl: './selected-word.component.css',
})
export class SelectedWordComponent {
  constructor(
    private gameService: GameService,
    private fileService: FileService
  ) {}

  get selectedWordLetters() {
    return this.gameService.selectedWord().split('');
  }

  get guessedLetters() {
    return Array.from(this.gameService.guessedLetters());
  }

  get letters() {
    return this.fileService.letters;
  }
}
