import { Component, input, output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../Button/button.component';
import { GameService } from '../../services/game.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-letters',
  standalone: true,
  imports: [CardComponent, ButtonComponent, ButtonComponent, NgFor],
  templateUrl: './letters.component.html',
  styleUrl: './letters.component.css',
})
export class LettersComponent {
  selectLetter = output<string>();
  full = input<boolean>(false);

  get guessedLetters() {
    return Array.from(this.gameService.guessedLetters());
  }

  get letters() {
    return this.fileService.letters;
  }

  constructor(
    private gameService: GameService,
    private fileService: FileService
  ) {}

  handleSelectLetter(value: string) {
    this.selectLetter.emit(value);
  }
}
