import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Download } from '@models';
import { download } from './download';
import { Saver, SAVER } from './saver.provider';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class DownloadService {
    constructor(private http: HttpClient, @Inject(SAVER) private save: Saver) {}

    // download(url: string, filename?: string, contentType?: string): Observable<Download> {
    //     const headers = {
    //         'Content-Type': contentType,
    //         Accept: contentType,
    //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //         'Access-Control-Allow-Origin': 'https://roaster.sewnstaging.com',
    //         'Access-Control-Allow-Methods': 'GET, HEAD',
    //         'Access-Control-Allow-credentials': 'true',
    //     };
    //     return this.http
    //         .get(url, {
    //             headers: new HttpHeaders(headers),
    //             reportProgress: true,
    //             observe: 'events',
    //             responseType: 'blob',
    //         })
    //         .pipe(download((blob) => this.save(blob, filename)));
    // }

    blob(url: string, filename?: string, contentType?: string): Observable<Blob> {
        return this.http.get(url, {
            responseType: 'blob',
        });
    }

    download(url: string, filename?: string, contentType?: string): Observable<any> {
        return this.http.post(
            `${environment.apiURL}/images/generate-blob`,
            { url },
            {
                responseType: 'blob',
                reportProgress: true,
                observe: 'events',
            })
            .pipe(download((blob) => this.save(blob, filename)));
    }
}
