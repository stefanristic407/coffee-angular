import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, scan } from 'rxjs/operators';
import { Upload } from '@models';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    private uuid = 1;
    private readonly processesSubject = new BehaviorSubject<Upload[]>([]);
    get processes$(): Observable<Upload[]> {
        return this.processesSubject.asObservable();
    }

    constructor() {}

    addProcess(name: string) {
        const newProcess = new Upload(this.uuid++, name);
        this.processesSubject.next(this.processesSubject.getValue().concat(newProcess));
        return newProcess.uuid;
    }

    upload(processId: number): (source: Observable<HttpEvent<any>>) => Observable<any> {
        return (source: Observable<HttpEvent<any>>) =>
            source.pipe(
                scan((res: any, event): any => {
                    const processes = this.processesSubject.getValue();
                    const idx = this.processesSubject.getValue().findIndex((element) => element.uuid === processId);
                    if (this.isHttpProgressEvent(event)) {
                        const progress = event.total
                            ? Math.round((100 * event.loaded) / event.total)
                            : res?.progress || 0;
                        if (idx > -1) {
                            processes[idx].progress = progress;
                            this.processesSubject.next(processes);
                        }
                    }
                    if (this.isHttpResponse(event)) {
                        if (idx > -1) {
                            processes.splice(idx, 1);
                            this.processesSubject.next(processes);
                        }
                        return event;
                    }
                }),
                filter((event: HttpEvent<any>) => event instanceof HttpResponse),
                map((event: HttpResponse<any>) => {
                    return event.body;
                }),
            );
    }

    isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
        return event.type === HttpEventType.Response;
    }

    isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
        return event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.UploadProgress;
    }
}
