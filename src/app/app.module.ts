import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FeaturesModule } from './features/features.module';
import { OrdermanagementModule } from './ordermanagement/ordermanagement.module';
import { PeopleModule } from './people/people.module';
import { HealthCheckComponent } from './health-check/health-check.component';
import {CalendarModule} from 'primeng/calendar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { HeaderComponent } from './header/header.component';
import { PopoverModule } from "ngx-bootstrap/popover";
import {GalleriaModule} from 'primeng/galleria';
import {MatVideoModule} from 'mat-video';
import { ErrorModuleModule } from './error-module/error-module.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './error-module/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HealthCheckComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    FeaturesModule,
    PeopleModule,
    OverlayPanelModule,
    CalendarModule,
    PopoverModule,
    OrdermanagementModule,
    GalleriaModule,
    MatVideoModule,
    ErrorModuleModule,
    HttpClientModule,
    ToastrModule.forRoot({ timeOut: 10000, preventDuplicates: true,
      positionClass: 'toast-bottom-right' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
