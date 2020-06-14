import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'features',
    loadChildren: () => import('./features/features.module')
      .then(m => m.FeaturesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule) },
  { path: 'ordermanagement', loadChildren: () => import('./ordermanagement/ordermanagement.module').then(m => m.OrdermanagementModule) },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
