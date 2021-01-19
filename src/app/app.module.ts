import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HeaderComponent } from './header/header.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { GalleriaModule } from 'primeng/galleria';
import { MatVideoModule } from 'mat-video';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ErrorModuleModule } from './error-module/error-module.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './error-module/error.interceptor';
import 'hammerjs';
import { AuthGuard } from './guards/auth.guard';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [AppComponent, HealthCheckComponent, HeaderComponent, LayoutComponent],
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
    ToastrModule.forRoot({ timeOut: 10000, preventDuplicates: true, positionClass: 'toast-bottom-right' }),
    AnimateOnScrollModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      multi: true,
      deps: [UserserviceService]
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function ConfigLoader(
  userService: UserserviceService,
  cookieService: CookieService
) {
  return () => {
    const queryParams = new URLSearchParams(window.location.search);
    // Setting token
    if (userService.cookieService.get('Auth') && userService.cookieService.get('roaster_id')) {
      return Promise.resolve().then(() => {
        const promise2 = userService.getUserPermissionPromise(userService.cookieService.get('roaster_id'));
        promise2.then(response => {
          if (response && response['success'] == true) {
            const permissionList = response['result'];
            userService.cookieService.set('permissionSlug', JSON.stringify(permissionList));
          }
          return response;
        }, err => {
          return err;
        });
        return promise2;
      });
    }
    return;
  };
}
