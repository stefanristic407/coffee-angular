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

    constructor(private http: HttpClient) {}

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
                                return detections[0].language || 'en';
                            } else {
                                console.log('Unable to detect the language');
                                return 'en';
                            }
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 401) {
                            console.log('Invalid Translation Key');
                        } else {
                            console.log('Language detection failed due to cloud error');
                        }
                        return of(batchString.map((x) => 'en'));
                    }),
                );
        } else {
            console.log('Invalid Translation Key');
            return of('en');
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
                            return detections[0].language || 'en';
                        } else {
                            console.log('Unable to detect the language');
                            return 'en';
                        }
                    }),
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 403 || err.status === 401) {
                            console.log('Invalid Translation Key');
                        } else {
                            console.log('Language detection failed due to cloud error');
                        }
                        return of('en');
                    }),
                );
        } else {
            console.log('Invalid Translation Key');
            return of('en');
        }
    }

    translate(text: string): Observable<string> {
        if (this.key) {
            return this.http
                .post(
                    this.translateURL,
                    {
                        q: [text],
                        target: 'en',
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
}
