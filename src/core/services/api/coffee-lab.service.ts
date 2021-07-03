import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { UplaodService } from '../upload';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    @Output() originalPost = new EventEmitter();
    forumDeleteEvent = new EventEmitter();
    copyCoverImage = new EventEmitter();
    forumLanguage = new BehaviorSubject('en');
    organization = this.orgType;
    // filterBy and sortBy
    qaForumViewFilterBy = '';
    qaForumViewSortBy = 'latest';
    articleViewFilterBy = '';
    articleViewSortBy = 'latest';
    recipeViewIsAvailableTranslation = '';
    recipeViewLevel = '';
    recipeViewSortBy = 'latest';
    qaPostSortBy = 'latest';
    assignedToMeSortBy = 'latest';
    myAnswersSortBy = 'desc';
    myCommentsSortBy = 'desc';

    get currentForumLanguage(): string {
        return this.forumLanguage.value;
    }

    constructor(
        protected http: HttpClient,
        protected authService: AuthService,
        private uploadService: UplaodService,
        private toastService: ToastrService,
    ) {
        super(http, authService);
    }

    getJustText(content: any) {
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        });
        return contentElement.innerHTML;
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
            token: this.authService.token,
        };
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        return this.http.post(this.orgPostUrl, data, httpOptions);
    }

    getOrganizationForumList(type: string, options?: any, language = this.currentForumLanguage): Observable<any> {
        const data = {
            api_call: `/${this.orgType}/${this.getOrgId()}/${type}s?${this.serializeParams(options)}`,
            method: 'GET',
            token: this.authService.token,
        };
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        return this.http.post(this.orgPostUrl, data, httpOptions);
    }

    getForumDetails(type: string, idOrSlug: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${idOrSlug}`, 'GET');
    }

    getCommentList(type: string, slug: any): any {
        return this.post(this.orgPostUrl, `general/${type}s/${slug}/comments`, 'GET');
    }

    postComment(type: string, id: any, data: any): any {
        const commentType = type === 'question' ? 'answers' : 'comments';
        return this.post(
            this.orgPostUrl,
            `${this.orgType}/${this.getOrgId()}/${type}s/${id}/${commentType}`,
            'POST',
            data,
        );
    }

    postForum(type: string, data: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s`, 'POST', data);
    }

    updateForum(type: string, id: any, data: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${id}`, 'PUT', data);
    }

    deleteForumById(type: string, id: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${id}`, 'DELETE');
    }

    unSaveFormByType(type: string, id: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${id}/unsave`, 'PUT');
    }

    getAuthors(type: string): Observable<any> {
        return this.post(this.orgPostUrl, `general/coffee-lab/authors?post_type=${type}s`, 'GET');
    }

    getDrafts(): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/drafts`, 'GET');
    }

    getMyForumList(type: string, params = {}): Observable<any> {
        return this.post(
            this.orgPostUrl,
            `${this.orgType}/${this.getOrgId()}/${type}s?${this.serializeParams(params)}`,
            'GET',
        );
    }

    getSavedForumList(type: string, options: any): Observable<any> {
        return this.post(
            this.orgPostUrl,
            `${this.orgType}/${this.getOrgId()}/${type}s/saved?${this.serializeParams(options)}`,
            'GET',
        );
    }

    saveForum(type: any, id: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${id}/save`, 'PUT');
    }

    postCoffeeRecipe(data: any): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/recipes`, 'POST', data);
    }

    uploadFile(file: any, module: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append(
            'name',
            file.name ?? Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        );
        formData.append('file_module', module);
        formData.append('api_call', `/${this.orgType}/${this.getOrgId()}/file-manager/files`);
        formData.append('method', 'POST');
        formData.append('token', this.authService.token);
        const processId = this.uploadService.addProcess(formData.get('name') as string);
        return this.http
            .post(this.fileUploadUrl, formData, {
                headers: new HttpHeaders({ Accept: 'application/json' }),
                reportProgress: true,
                observe: 'events',
            })
            .pipe(this.uploadService.upload(processId));
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
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${id}/translate`, 'POST', data);
    }

    translateAnswer(id: any, data: any) {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/translated-answers/${id}`, 'PUT', data);
    }

    copyFile(fileId: number) {
        return this.post(
            this.orgPostUrl,
            `${this.orgType}/${this.getOrgId()}/file-manager/files/${fileId}/copy`,
            'POST',
        );
    }
}
