import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  readonly paths = {
    default: '/',
    start: '/start',
  };

  constructor() {}
}
