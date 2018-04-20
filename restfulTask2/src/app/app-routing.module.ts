import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { GammaComponent } from './gamma/gamma.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'alpha',component: AlphaComponent },
  { path: 'beta/:id',component: BetaComponent },
  { path: '', pathMatch: 'full', redirectTo: '/alpha'}

  // use a colon and parameter name to include a parameter in the url
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
