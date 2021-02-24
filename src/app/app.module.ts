import { APP_INITIALIZER, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeSe from '@angular/common/locales/se';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
// bootstrap modules
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '@env/environment';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HealthCheckComponent } from './components/health-check/health-check.component';
import { SewnDirectMessageComponent } from './components/sewn-direct-message/sewn-direct-message.component';
import { MenuComponent } from '@components';
import { FooterComponent } from './layout/footer/footer.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorIntercept } from './modules/error-module/error.interceptor';

import 'hammerjs';
import { AuthGuard } from '@guards';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from '@services';
import { SearchFilterPipe } from './components/sewn-direct-message/search-filter.pipe';
import { SearchPanelComponent } from './layout/search-panel/search-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AppComponent,
        HealthCheckComponent,
        SewnDirectMessageComponent,
        MenuComponent,
        LayoutComponent,
        SearchFilterPipe,
        FooterComponent,
        SearchPanelComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AnimateOnScrollModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        ToastrModule.forRoot({ timeOut: 3000, preventDuplicates: true, positionClass: 'toast-bottom-right' }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new TranslateHttpLoader(http, 'https://fed-api.sewnstaging.com/language/', '');
                },
                deps: [HttpClient],
            },
        }),
        TypeaheadModule.forRoot(),
        SharedModule,
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
            deps: [UserserviceService],
        },
        AuthGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

// Sweden
registerLocaleData(localeSe);

export function ConfigLoader(userService: UserserviceService, cookieService: CookieService) {
    return () => {
        const queryParams = new URLSearchParams(window.location.search);
        // Setting token
        if (userService.cookieService.get('Auth') && userService.cookieService.get('roaster_id')) {
            return Promise.resolve().then(() => {
                const promise2 = userService.getUserPermissionPromise(userService.cookieService.get('roaster_id'));
                promise2.then(
                    (response: any) => {
                        if (response && response.success) {
                            const permissionList = response.result;
                            userService.cookieService.set('permissionSlug', JSON.stringify(permissionList));
                        }
                        return response;
                    },
                    (err) => {
                        return err;
                    },
                );
                return promise2;
            });
        }
        return;
    };
}
