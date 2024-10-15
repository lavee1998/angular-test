import {
  Component,
  computed,
  HostListener,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FileService } from '../../services/file.service';
import { LettersComponent } from '../../components/letters/letters.component';
import { HangTreeComponent } from '../../components/hang-tree/hang-tree.component';
import { ButtonComponent } from '../../components/Button/button.component';
import { SelectedWordComponent } from '../../components/selected-word/selected-word.component';
import { WinComponent } from '../../components/win/win.component';
import { LoseComponent } from '../../components/lose/lose.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { LengthSetterComponent } from '../../components/length-setter/length-setter.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    LettersComponent,
    HangTreeComponent,
    RouterLink,
    ButtonComponent,
    SelectedWordComponent,
    LengthSetterComponent,
    WinComponent,
    LoseComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  get isGameOn() {
    return (
      !!this.gameService.gameIsOn() &&
      !!this.gameService.selectedWord() &&
      !!this.letters.length &&
      !!this.words.length
    );
  }

  get words() {
    return this.textFileService.words;
  }

  get letters() {
    return this.textFileService.letters;
  }

  get won() {
    return this.gameService.won;
  }

  get lost() {
    return this.gameService.lost;
  }

  constructor(
    private textFileService: FileService,
    private gameService: GameService
  ) {}

  handleClickEndGameButton() {
    this.gameService.endGame();
  }

  handleClickStartNewGameButton() {
    this.gameService.startNewGame();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardPressDown(event: KeyboardEvent) {
    console.log({ event });
    this.handleLetterSelection(event.key);
  }

  handleLetterSelection(value: string) {
    this.gameService.guessedLetters().add(value);
    this.gameService.length.set(this.gameService.length() || 0 + 1);
    /* ... */
  }

  // ngOnInit(): void {
  //   this.textFileService.getWords().subscribe((wordArray) => {
  //     const filteredWords =
  //       this.gameService.length != undefined
  //         ? wordArray.filter((word) => word.length === this.gameService.length)
  //         : wordArray;

  //     this.words = filteredWords;
  //     let shuffledArray = filteredWords.sort(() => 0.5 - Math.random());
  //     // this.selectedWord.set(shuffledArray[0] || '');
  //     this.gameService.selectedWord.set(shuffledArray[0] || '');
  //   });

  //   // this.textFileService.getLetters().subscribe((letterArray) => {
  //   //   this.letters = letterArray;
  //   // });
  // }
}
