import { Component, input, output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../Button/button.component';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CardComponent, ButtonComponent, ButtonComponent],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css',
})
export class KeyboardComponent {
  selectLetter = output<string>();
  full = input<boolean>(false);

  get letters() {
    return this.gameService.letters;
  }

  disabled(letter: string) {
    return (
      this.gameService.won() ||
      this.gameService.lost() ||
      !this.gameService.isGameOn() ||
      Array.from(this.gameService.guessedLetters()).includes(letter)
    );
  }

  constructor(private gameService: GameService) {}

  handleSelectLetter(value: string) {
    this.selectLetter.emit(value);
  }
}
