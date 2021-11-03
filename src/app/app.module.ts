import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

import { environment } from '@env/environment';
import { AppComponent } from './app.component';
import {
    FooterComponent,
    GateComponent,
    HealthCheckComponent,
    LayoutComponent,
    MenuComponent,
    SearchPanelComponent,
    UploadInfoComponent,
} from '@components';

import { ErrorInterceptor } from '@interceptors';

import 'hammerjs';
import { AuthGuard } from '@guards';

import { AgmCoreModule } from '@agm/core';
import { getSaver, SAVER } from '@utils';

import { I18NService, StartupService } from '@services';
import { MicroRoasterInviteComponent } from './modules/micro-roaster-invite/micro-roaster-invite.component';
export function StartupServiceFactory(startupService: StartupService) {
    return () => startupService.load();
}

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        GateComponent,
        HealthCheckComponent,
        LayoutComponent,
        MenuComponent,
        SearchPanelComponent,
        UploadInfoComponent,
        MicroRoasterInviteComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        ToastrModule.forRoot({
            timeOut: 3000,
            preventDuplicates: true,
            positionClass: 'toast-bottom-right',
            closeButton: true,
            tapToDismiss: false,
        }),
        TranslateModule.forRoot(),
        TypeaheadModule.forRoot(),
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBTMSQVrk0O2l5GDQGWqI5bOMBRY_RIBq0',
        }),
    ],
    providers: [
        StartupService,
        I18NService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        {
            provide: LOCALE_ID,
            deps: [I18NService],
            useFactory: (i18n) => i18n.locale,
        },
        AuthGuard,
        { provide: SAVER, useFactory: getSaver },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
