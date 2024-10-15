import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
  effect,
} from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  selectedWord: WritableSignal<string> = signal('');
  guessedLetters: WritableSignal<Set<string>> = signal(new Set<string>([]));
  // wrongTips: WritableSignal<number> = signal(0);
  wrongTips: Signal<number> = computed(() => this.calculateWrongTips());
  gameIsOn = signal(false);
  // minLength: number = 0;
  // maxLength: number = 100;
  length = signal<undefined | number>(undefined);
  lost: Signal<boolean> = computed(() => this.wrongTips() >= this.maxWrongTips);
  readonly maxWrongTips: number = 10;

  constructor(
    private localStorageService: LocalStorageService,
    private fileService: FileService,
    private routerService: Router
  ) {
    this.setDefaultValuesFromLocaleStore();

    effect(() => {
      const _selectedWord = this.selectedWord();
      if (_selectedWord) {
        this.localStorageService.setItem(
          'selectedWord',
          _selectedWord.toString()
        );
      } else {
        this.localStorageService.removeItem('selectedWord');
      }
    });

    effect(() => {
      const _length = this.length();
      console.log('jjjj');
      if (_length) {
        this.localStorageService.setItem('length', _length.toString());
      } else {
        this.localStorageService.removeItem('length');
      }
    });

    effect(() => {
      const _gameIsOn = this.gameIsOn();
      if (_gameIsOn)
        this.localStorageService.setItem('isGameOn', _gameIsOn.toString());
    });

    effect(() => {
      const _guessedLetters = Array.from(this.guessedLetters());
      console.log('??');
      this.localStorageService.setItem(
        'guessedLetters',
        JSON.stringify(_guessedLetters)
      );
    });
  }

  calculateWrongTips() {
    return Array.from(this.guessedLetters()).reduce((prev, curr) => {
      if (!this.selectedWord().includes(curr)) return prev + 1;

      return prev;
    }, 0);
  }

  setDefaultValuesFromLocaleStore() {
    const lengthFromLocalStore = Number(
      this.localStorageService.getItem('length')
    );
    if (lengthFromLocalStore && !Number.isNaN(lengthFromLocalStore))
      this.length.set(lengthFromLocalStore);

    const selectedWordFromLocalStore =
      this.localStorageService.getItem('selectedWord');
    if (selectedWordFromLocalStore)
      this.selectedWord.set(selectedWordFromLocalStore);

    const isGameOnFromLocalStore = Boolean(
      this.localStorageService.getItem('isGameOn')
    );
    this.gameIsOn.set(isGameOnFromLocalStore);

    const guessedLettersFromLocalStore = JSON.parse(
      this.localStorageService.getItem('guessedLetters') || '[]'
    );

    console.log({ guessedLettersFromLocalStore });
    if (
      Array.isArray(guessedLettersFromLocalStore) &&
      guessedLettersFromLocalStore.every((item) => typeof item === 'string')
    )
      this.guessedLetters.set(new Set(guessedLettersFromLocalStore));
  }

  startGame(length?: number) {
    this.length.set(length);
    this.chooseSelectedWord();
    this.gameIsOn.set(true);
    console.log(this.length, this.selectedWord);
  }

  chooseSelectedWord() {
    const filteredWords =
      this.length() != undefined
        ? this.fileService.words.filter((word) => word.length === this.length())
        : this.fileService.words;
    let shuffledArray = filteredWords.sort(() => 0.5 - Math.random());
    // this.selectedWord.set(shuffledArray[0] || '');
    this.selectedWord.set(shuffledArray[0] || '');
  }

  endGame() {
    this.startNewGame();
    this.routerService.navigate(['/']); //TODO
  }

  startNewGame() {
    this.length.set(undefined);
    this.gameIsOn.set(false);
    this.guessedLetters.set(new Set([]));
  }

  get won() {
    //TODO YOU SIGNALS
    if (!this.selectedWord?.()) return false;

    const _guessedLetters = Array.from(this.guessedLetters());

    const wordIsGuessed = this.selectedWord()
      .split('')
      .reduce((prev, curr) => {
        console.log(_guessedLetters.includes(curr), prev);
        if (!prev) return false;
        return prev && _guessedLetters.includes(curr);
      }, true);

    return wordIsGuessed && !this.lost();
  }
}
