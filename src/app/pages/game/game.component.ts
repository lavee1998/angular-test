import { Component, HostListener } from '@angular/core';
import { KeyboardComponent } from '../../components/keyboard/keyboard.component';
import { DrawerComponent } from '../../components/drawer/drawer.component.';
import { ButtonComponent } from '../../components/Button/button.component';
import { SelectedWordComponent } from '../../components/selected-word/selected-word.component';
import { WinComponent } from '../../components/win/win.component';
import { LoseComponent } from '../../components/lose/lose.component';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game/game.service';
import { LengthSetterComponent } from '../../components/length-setter/length-setter.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    KeyboardComponent,
    DrawerComponent,
    RouterLink,
    ButtonComponent,
    SelectedWordComponent,
    LengthSetterComponent,
    WinComponent,
    LoseComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  get isGameOn() {
    return (
      !!this.gameService.isGameOn() &&
      !!this.gameService.selectedWord() &&
      !!this.letters.length &&
      !!this.words.length
    );
  }

  get words() {
    return this.gameService.words;
  }

  get letters() {
    return this.gameService.letters;
  }

  get won() {
    return this.gameService.won();
  }

  get lost() {
    return this.gameService.lost();
  }

  constructor(private gameService: GameService) {}

  handleClickEndGameButton() {
    this.gameService.endGame();
  }

  handleClickStartNewGameButton() {
    this.gameService.startNewGame();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardPressDown(event: KeyboardEvent) {
    this.handleLetterSelection(event.key);
  }

  handleLetterSelection(value: string) {
    this.gameService.selectLetter(value);
  }
}
