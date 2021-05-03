import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { ApiResponse } from '@models';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    @Output() originalPost = new EventEmitter();
    forumDeleteEvent = new EventEmitter();
    copyCoverImage = new EventEmitter();
    forumLanguage = new BehaviorSubject('en');
    organization = 'ro';
    organizationId = this.cookieSrv.get('roaster_id');

    get currentForumLanguage(): string {
        return this.forumLanguage.value;
    }

    constructor(protected cookieSrv: CookieService, protected http: HttpClient, private toastService: ToastrService) {
        super(cookieSrv, http);
    }

    dataURItoBlob(dataURI: any): any {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    copyContext(context: any): void {
        const textArea = document.createElement('textarea');
        textArea.value = context;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();
        this.toastService.success('Successfully copied');
    }

    getForumList(type: string, options?: any, language = this.currentForumLanguage): Observable<any> {
        const data = {
            api_call: `/general/${type}s?${this.serializeParams(options)}`,
            method: 'GET',
            token: this.cookieSrv.get('Auth'),
        };
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        return this.http.post(this.orgPostUrl, data, httpOptions);
    }

    getFOrganizationForumList(type: string, options?: any, language = this.currentForumLanguage): Observable<any> {
        const data = {
            api_call: `/${this.organization}/${this.organizationId}/${type}s?${this.serializeParams(options)}`,
            method: 'GET',
            token: this.cookieSrv.get('Auth'),
        };
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        return this.http.post(this.orgPostUrl, data, httpOptions);
    }

    getForumDetails(type: string, idOrSlug: any): Observable<any> {
        return this.post(this.orgPostUrl, `general/${type}s/${idOrSlug}`, 'GET');
    }

    getRecipeById(type: string, idOrSlug: any, roasterId): Observable<any> {
        return this.post(this.orgPostUrl, `ro/${roasterId}/${type}s/${idOrSlug}`, 'GET');
    }

    getCommentList(type: string, slug: any): any {
        return this.post(this.orgPostUrl, `general/${type}s/${slug}/comments`, 'GET');
    }

    postComment(type: string, id: any, data: any): any {
        const commentType = type === 'question' ? 'answers' : 'comments';
        return this.post(
            this.orgPostUrl,
            `${this.organization}/${this.organizationId}/${type}s/${id}/${commentType}`,
            'POST',
            data,
        );
    }

    postForum(type: string, data: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/${type}s`, 'POST', data);
    }

    updateForum(type: string, id: any, data: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/${type}s/${id}`, 'PUT', data);
    }

    deleteForumById(type: string, id: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/${type}s/${id}`, 'DELETE');
    }

    getAuthors(type: string): Observable<any> {
        return this.post(this.orgPostUrl, `general/coffee-lab/authors?post_type=${type}s`, 'GET');
    }

    getDrafts(): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/drafts`, 'GET');
    }

    getMyForumList(type: string): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/${type}s`, 'GET');
    }

    getSavedForumList(type: string): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/${type}s/saved`, 'GET');
    }

    saveForum(type: any, id: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/${type}s/${id}/save`, 'PUT');
    }

    postCoffeeRecipe(data: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/recipes`, 'POST', data);
    }

    uploadFile(file: any, module: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append(
            'name',
            Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        );
        formData.append('file_module', module);
        formData.append('api_call', `/${this.organization}/${this.organizationId}/file-manager/files`);
        formData.append('method', 'POST');
        formData.append('token', this.cookieSrv.get('Auth'));
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.fileUploadUrl, formData, httpOptions);
    }

    getFileBlob(url: string): Observable<any> {
        return this.http.post(
            `${environment.apiURL}/images/generate-blob`,
            { url },
            {
                responseType: 'blob',
            },
        );
    }

    translateForum(type: string, id: any, data: any): Observable<any> {
        return this.post(
            this.orgPostUrl,
            `${this.organization}/${this.organizationId}/${type}s/${id}/translate`,
            'POST',
            data,
        );
    }

    copyFile(fileId: number) {
        return this.post(
            this.orgPostUrl,
            `${this.organization}/${this.organizationId}/file-manager/files/${fileId}/copy-image`,
            'POST',
        );
    }

    getComment(id: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.organization}/${this.organizationId}/comments/${id}`, 'GET');
    }
}
