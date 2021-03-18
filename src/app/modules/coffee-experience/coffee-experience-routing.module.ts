import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeExperienceComponent } from './coffee-experience.component';

const routes: Routes = [{ path: '', component: CoffeeExperienceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeeExperienceRoutingModule { }
