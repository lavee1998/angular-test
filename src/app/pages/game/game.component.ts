import { Component, computed, HostListener, inject } from '@angular/core';
import { KeyboardComponent } from '../../components/keyboard/keyboard.component';
import { DrawerComponent } from '../../components/drawer/drawer.component';
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
  private readonly gameService = inject(GameService);
  readonly isGameOn = computed(() =>
    this.computeIsGameOn(
      this.gameService.isGameOn(),
      this.gameService.selectedWord(),
      this.gameService.letters(),
      this.gameService.words()
    )
  );
  readonly words = this.gameService.words;
  readonly letters = this.gameService.letters;
  readonly won = this.gameService.won;
  readonly lost = this.gameService.lost;
  readonly wrongTips = this.gameService.wrongTips;

  computeIsGameOn(
    isGameOn: boolean,
    selectedWord: string,
    letters: string[],
    words: string[]
  ) {
    return !!isGameOn && !!selectedWord && !!letters.length && !!words.length;
  }

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
