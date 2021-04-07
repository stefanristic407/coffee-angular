import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiRequestDetailsComponent } from './api-request-details/api-request-details.component';
import { ApiRequestsTableComponent } from './api-requests.component';
import { GeneratedKeyDetailsComponent } from './generated-key-details/generated-key-details.component';

const routes: Routes = [
    {
        path: '',
        component: ApiRequestsTableComponent,
    },
    {
        path: 'api-request-details',
        component: ApiRequestDetailsComponent,
    },
    {
        path: 'generated-key-details',
        component: GeneratedKeyDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApiRequestRoutingModule {}
