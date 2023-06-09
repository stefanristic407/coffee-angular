import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalsService } from '../globals/globals.service';
import { I18NService } from '../i18n/i18n.service';

@Injectable()
export class StartupService {
    constructor(
        private i18n: I18NService,
        private globals: GlobalsService,
        private translate: TranslateService,
        private httpClient: HttpClient,
    ) {}

    load(language?): Promise<any> {
        return new Promise((resolve) => {
            const oldLanguage = this.i18n.currentLang;
            if (language) {
                this.i18n.use(language);
            }

            if (!language || oldLanguage !== this.i18n.currentLang) {
                zip(this.httpClient.get(`${environment.apiURL}/translations/${this.i18n.currentLang}/roaster`))
                    .pipe(
                        catchError((res) => {
                            console.warn(`StartupService.load: Network request failed`, res);
                            resolve(null);
                            return [];
                        }),
                    )
                    .subscribe(
                        ([langData]) => {
                            this.translate.setTranslation(this.i18n.currentLang, langData);
                            this.globals.languageJson = langData;
                        },
                        () => {},
                        () => {
                            resolve(null);
                        },
                    );
            }
        });
    }
}
