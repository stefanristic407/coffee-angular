import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class GoogletranslateService {
    private detectURL = 'https://translation.googleapis.com/language/translate/v2/detect';
    private translateURL = 'https://translation.googleapis.com/language/translate/v2';
    private key = environment.googleTranslationAPIKey;
    public defaultLang = 'en';

    constructor(private http: HttpClient) {}

    validateMessage(messageContent: string) {
        const emojiAndStarRegx =
            /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}])|\*/giu;
        const content = messageContent.replace(emojiAndStarRegx, '').trim();
        return !!content.length;
    }

    detectBatch(batchString: string[]): Observable<string> {
        if (this.key) {
            return this.http
                .post(
                    this.detectURL,
                    {
                        q: batchString,
                    },
                    {
                        params: {
                            key: this.key,
                        },
                    },
                )
                .pipe(
                    map((res: any) => {
                        const detectionsBatch = res?.data?.detections || [];
                        return detectionsBatch.map((detections) => {
                            if (detections.length) {
                                detections.sort((a: any, b: any) => a.confidence - b.confidence);
                                return detections[0].language === 'und' || !detections[0].language
                                    ? this.defaultLang
                                    : detections[0].language;
                            } else {
                                console.log('Unable to detect the language');
                                return this.defaultLang;
                            }
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 401) {
                            console.log('Invalid Translation Key');
                        } else {
                            console.log('Language detection failed due to cloud error');
                        }
                        return of(batchString.map((x) => this.defaultLang));
                    }),
                );
        } else {
            console.log('Invalid Translation Key');
            return of(this.defaultLang);
        }
    }

    detect(text: string): Observable<string> {
        if (this.key) {
            return this.http
                .post(
                    this.detectURL,
                    {
                        q: text,
                    },
                    {
                        params: {
                            key: this.key,
                        },
                    },
                )
                .pipe(
                    map((res: any) => {
                        const detections = res?.data?.detections[0] || [];
                        if (detections.length) {
                            detections.sort((a: any, b: any) => a.confidence - b.confidence);
                            return detections[0].language === 'und' || !detections[0].language
                                ? this.defaultLang
                                : detections[0].language;
                        } else {
                            console.log('Unable to detect the language');
                            return this.defaultLang;
                        }
                    }),
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 401) {
                            console.log('Invalid Translation Key');
                        } else {
                            console.log('Language detection failed due to cloud error');
                        }
                        return of(this.defaultLang);
                    }),
                );
        } else {
            console.log('Invalid Translation Key');
            return of(this.defaultLang);
        }
    }

    translate(text: string): Observable<string> {
        if (this.key) {
            return this.http
                .post(
                    this.translateURL,
                    {
                        q: [text],
                        target: this.defaultLang,
                    },
                    {
                        params: {
                            key: this.key,
                        },
                    },
                )
                .pipe(
                    map((res: any) => {
                        if (res?.data.translations.length) {
                            return res?.data.translations[0].translatedText || text;
                        } else {
                            console.log('Unable to translate the language');
                            return text;
                        }
                    }),
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 401) {
                            console.log('Invalid Translation Key');
                        } else {
                            console.log('Language translation failed due to cloud error');
                        }
                        return of(text);
                    }),
                );
        } else {
            console.log('Invalid Translation Key');
            return of(text);
        }
    }

    translateCoffeeLab(text: any, lang?: string): Observable<string> {
        if (this.key) {
            return this.http
                .post(
                    this.translateURL,
                    {
                        q: text,
                        target: lang === 'pt' ? 'pt-br' : lang || this.defaultLang,
                    },
                    {
                        params: {
                            key: this.key,
                        },
                    },
                )
                .pipe(
                    map((res: any) => {
                        if (res?.data.translations.length) {
                            return res?.data.translations || text;
                        } else {
                            console.log('Unable to translate the language');
                            return text;
                        }
                    }),
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 401) {
                            console.log('Invalid Translation Key');
                        } else {
                            console.log('Language translation failed due to cloud error');
                        }
                        return of(text);
                    }),
                );
        } else {
            console.log('Invalid Translation Key');
            return of(text);
        }
    }
}
