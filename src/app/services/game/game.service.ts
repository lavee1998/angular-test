import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
  effect,
} from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { FileService } from '../file.service';
import { AppConfigService } from '../app-config/app-config.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  selectedWord: WritableSignal<string> = signal('');
  guessedLetters: WritableSignal<Set<string>> = signal(new Set<string>([]));
  wrongTips: Signal<number> = computed(() => this.calculateWrongTips());
  isGameOn = signal(false);
  length = signal<undefined | number>(undefined);
  lost: Signal<boolean> = computed(() => this.wrongTips() >= this.maxWrongTips);
  won: Signal<boolean> = computed(() => this.calculateWon());
  letters: string[] = [];
  words: string[] = [];
  readonly maxWrongTips: number = 10;

  constructor(
    private localStorageService: LocalStorageService,
    private fileService: FileService,
    private routerService: Router,
    private apiService: ApiService,
    private appConfigService: AppConfigService
  ) {
    this.apiService.getLetters().subscribe((letterArray) => {
      this.letters = letterArray;
    });

    this.apiService.getWords().subscribe((wordArray) => {
      this.words = wordArray;
    });

    this.setDefaultValuesFromLocaleStore();

    effect(() => {
      this.localStorageService.setItem(
        'selectedWord',
        this.selectedWord().toString()
      );
    });

    effect(() => {
      const _length = this.length();
      if (_length) {
        this.localStorageService.setItem('length', _length.toString());
      } else {
        this.localStorageService.removeItem('length');
      }
    });

    effect(() => {
      const _gameIsOn = this.isGameOn();
      this.localStorageService.setItem('isGameOn', _gameIsOn.toString());
    });

    effect(() => {
      const _guessedLetters = Array.from(this.guessedLetters());
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

  calculateWon() {
    if (!this.selectedWord?.()) return false;

    const _guessedLetters = Array.from(this.guessedLetters());

    const wordIsGuessed = this.selectedWord()
      .split('')
      .reduce((prev, curr) => {
        if (!prev) return false;
        return prev && _guessedLetters.includes(curr);
      }, true);

    return wordIsGuessed && !this.lost();
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
    this.isGameOn.set(isGameOnFromLocalStore);

    const guessedLettersFromLocalStore = JSON.parse(
      this.localStorageService.getItem('guessedLetters') || '[]'
    );

    if (
      Array.isArray(guessedLettersFromLocalStore) &&
      guessedLettersFromLocalStore.every((item) => typeof item === 'string')
    )
      this.guessedLetters.set(new Set(guessedLettersFromLocalStore));
  }

  startNewGame(length?: number) {
    this.length.set(length || this.length());
    this.chooseSelectedWord();
    this.guessedLetters.set(new Set([]));
    this.isGameOn.set(true);
  }

  selectLetter(value: string) {
    if (this.won() || this.lost() || !this.fileService.letters.includes(value))
      return;

    this.guessedLetters.update(
      (letters) => new Set([...Array.from(letters), value])
    );
  }

  chooseSelectedWord() {
    const filteredWords =
      this.length() != undefined
        ? this.fileService.words.filter((word) => word.length === this.length())
        : this.fileService.words;
    let shuffledArray = filteredWords.sort(() => 0.5 - Math.random());
    this.selectedWord.set(shuffledArray[0] || '');
  }

  endGame() {
    this.length.set(undefined);
    this.isGameOn.set(false);
    this.selectedWord.set('');
    this.guessedLetters.set(new Set([]));
    this.routerService.navigate([this.appConfigService.paths.start]);
  }
}
