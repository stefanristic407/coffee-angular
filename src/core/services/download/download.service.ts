import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpHeaders,
    HttpProgressEvent,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Download } from '@models';
import { Saver, SAVER, trackFileName } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, scan } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DownloadService {
    private uuid = 1;
    private readonly processesSubject = new BehaviorSubject<Download[]>([]);
    get processes$(): Observable<Download[]> {
        return this.processesSubject.asObservable();
    }
    constructor(private http: HttpClient, @Inject(SAVER) private save: Saver, private toastrService: ToastrService) {}

    blob(url: string, filename?: string, contentType?: string): Observable<Blob> {
        return this.http.get(url, {
            responseType: 'blob',
        });
    }

    addProcess(name: string) {
        const newProcess: Download = {
            content: null,
            progress: 0,
            state: 'PENDING',
            uuid: this.uuid++,
            name,
        };
        this.processesSubject.next(this.processesSubject.getValue().concat(newProcess));
        return newProcess.uuid;
    }

    imageDownload(url: string, filename?: string, contentType?: string): Observable<any> {
        const processId = this.addProcess(filename);
        return this.http
            .post(
                `${environment.apiURL}/images/generate-blob`,
                { url },
                {
                    responseType: 'blob',
                    reportProgress: true,
                    observe: 'events',
                },
            )
            .pipe(this.downloadAll((blob) => this.save(blob, filename), processId));
    }

    download(url: string, filename?: string, contentType?: string): Observable<Download> {
        filename = filename || trackFileName(url);
        const processId = this.addProcess(filename);
        const headers = {
            'Content-Type': contentType,
            Accept: contentType,
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Origin': window.location.origin,
            'Access-Control-Allow-Methods': 'GET, HEAD',
            'Access-Control-Allow-credentials': 'true',
        };
        return this.http
            .get(url, {
                headers: new HttpHeaders(headers),
                reportProgress: true,
                observe: 'events',
                responseType: 'blob',
            })
            .pipe(this.downloadAll((blob) => this.save(blob, filename), processId));
    }

    isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
        return event.type === HttpEventType.Response;
    }

    isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
        return event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.UploadProgress;
    }

    private downloadAll(
        saver?: (b: Blob) => void,
        processId?: number,
    ): (source: Observable<HttpEvent<Blob>>) => Observable<Download> {
        return (source: Observable<HttpEvent<Blob>>) =>
            source.pipe(
                scan(
                    (res: Download, event): Download => {
                        const processes = this.processesSubject.getValue();
                        const idx = this.processesSubject.getValue().findIndex((element) => element.uuid === processId);
                        if (this.isHttpProgressEvent(event)) {
                            const progress = event.total
                                ? Math.round((100 * event.loaded) / event.total)
                                : res.progress;
                            if (idx > -1) {
                                processes[idx].progress = progress;
                                this.processesSubject.next(processes);
                            }
                            return {
                                progress,
                                state: 'IN_PROGRESS',
                                content: null,
                            };
                        }
                        if (this.isHttpResponse(event)) {
                            if (saver) {
                                saver(event.body);
                            }
                            if (idx > -1) {
                                processes.splice(idx, 1);
                                this.processesSubject.next(processes);
                            }
                            return {
                                progress: 100,
                                state: 'DONE',
                                content: event.body,
                            };
                        }
                        return res;
                    },
                    { state: 'PENDING', progress: 0, content: null },
                ),
                distinctUntilChanged(
                    (a, b) => a.state === b.state && a.progress === b.progress && a.content === b.content,
                ),
                catchError((error: any) => {
                    const idx = this.processesSubject.getValue().findIndex((element) => element.uuid === processId);
                    const processes = this.processesSubject.getValue();
                    if (idx > -1) {
                        processes.splice(idx, 1);
                        this.processesSubject.next(processes);
                        this.toastrService.error('Cannot download.');
                    }
                    console.log(error);
                    const value: Download = { state: 'PENDING', progress: 0, content: null };
                    return of(value);
                }),
            );
    }
}
