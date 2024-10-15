import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private wordsPath = 'assets/words.txt';
  private lettersPath = 'assets/letters.txt';
  letters: string[] = [];
  words: string[] = [];

  constructor(private http: HttpClient) {
    this.getLetters().subscribe((letterArray) => {
      console.log({ letterArray });
      this.letters = letterArray;
    });

    this.getWords().subscribe((wordArray) => {
      this.words = wordArray;
    });
  }

  getLetters(): Observable<string[]> {
    return this.http.get(this.lettersPath, { responseType: 'text' }).pipe(
      map((data: string) => {
        return data.split(/\r?\n/);
      }) // Split by whitespace to get individual words
    );
  }

  // Method to fetch the text file and convert its contents into an array of words
  getWords(): Observable<string[]> {
    return this.http.get(this.wordsPath, { responseType: 'text' }).pipe(
      map((data: string) => {
        return data.split(/\r?\n/);
      }) // Split by whitespace to get individual words
    );
  }
}
