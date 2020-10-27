import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NoInternetConnectionComponent } from './no-internet-connection/no-internet-connection.component';
import { EmptyTableComponent } from './empty-table/empty-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'internal-server-error',
            component: InternalServerErrorComponent
        },
        {
          path: 'network-connection-error',
          component: NoInternetConnectionComponent
        },
        {
          path: 'empty-table',
          component: EmptyTableComponent
        },
        {
            path: '**',
            component: PageNotFoundComponent
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorModuleRoutingModule { }
