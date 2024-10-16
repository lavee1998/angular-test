import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { GameComponent } from './pages/game/game.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'start', component: GameComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
