import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { GameComponent } from './pages/game/game.component';

export enum RouteSegments {
  Default = '',
  StartGame = 'start',
}
export const routes: Routes = [
  { path: RouteSegments.Default, component: LandingPageComponent },
  { path: RouteSegments.StartGame, component: GameComponent },
  { path: '**', redirectTo: RouteSegments.Default },
];
