import { Component, input, output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../Button/button.component';
import { GameService } from '../../services/game/game.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-letters',
  standalone: true,
  imports: [CardComponent, ButtonComponent, ButtonComponent],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css',
})
export class LettersComponent {
  selectLetter = output<string>();
  full = input<boolean>(false);

  get letters() {
    return this.fileService.letters;
  }

  disabled(letter: string) {
    return (
      this.gameService.won() ||
      this.gameService.lost() ||
      !this.gameService.isGameOn() ||
      Array.from(this.gameService.guessedLetters()).includes(letter)
    );
  }

  constructor(
    private gameService: GameService,
    private fileService: FileService
  ) {}

  handleSelectLetter(value: string) {
    this.selectLetter.emit(value);
  }
}
