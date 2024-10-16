import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly wordsPath = 'assets/words.txt';
  private readonly lettersPath = 'assets/letters.txt';
  private readonly http = inject(HttpClient);

  getLetters(): Observable<string[]> {
    return this.http.get(this.lettersPath, { responseType: 'text' }).pipe(
      map((data: string) => {
        return data.split(/\r?\n/).sort();
      }) // Split by whitespace to get individual words
    );
  }

  getWords(): Observable<string[]> {
    return this.http.get(this.wordsPath, { responseType: 'text' }).pipe(
      map((data: string) => {
        return data.split(/\r?\n/);
      }) // Split by whitespace to get individual words
    );
  }
}
