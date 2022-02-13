import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorModuleRoutingModule } from './error-module-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NoInternetConnectionComponent } from './no-internet-connection/no-internet-connection.component';
import { PermissionErrorComponent } from './permission-error/permission-error.component';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        InternalServerErrorComponent,
        NoInternetConnectionComponent,
        PermissionErrorComponent,
    ],
    imports: [CommonModule, ErrorModuleRoutingModule, RouterModule],
})
export class ErrorModuleModule {}
