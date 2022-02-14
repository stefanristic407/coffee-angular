import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth';
import { GlobalsService } from '../globals';
import { I18NService } from '../i18n';
import { UploadService } from '../upload';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    @Output() originalPost = new EventEmitter();
    @Output() draftPost = new EventEmitter();
    forumDeleteEvent = new EventEmitter();
    copyCoverImage = new EventEmitter();
    forumLanguage = new BehaviorSubject('en');
    searchResult = new BehaviorSubject([]);
    allDrafts = new BehaviorSubject([]);
    otherCategories = new BehaviorSubject([]);
    organization = this.orgType;
    // filterBy and sortBy
    qaForumViewFilterBy = null;
    qaForumViewSortBy = null;
    qaForumViewCategory = null;
    articleViewCategory = null;
    recipeViewCategory = null;
    articleViewFilterBy = null;
    articleViewSortBy = null;
    recipeViewIsAvailableTranslation = null;
    recipeViewLevel = null;
    recipeViewSortBy = null;
    qaPostSortBy = null;
    assignedToMeSortBy = 'latest';
    myAnswersSortBy = 'desc';
    myCommentsSortBy = 'desc';

    get currentForumLanguage(): string {
        return this.forumLanguage.value;
    }

    constructor(
        private globals: GlobalsService,
        private i18n: I18NService,
        private toastService: ToastrService,
        private translator: TranslateService,
        private uploadService: UploadService,
        protected authService: AuthService,
        protected http: HttpClient,
    ) {
        super(http, authService);
        this.updateLang(this.i18n.currentLang, this.globals.languageJson);
    }

    updateLang(lang: string = 'en', pLangData: any = null): Promise<any> {
        if (pLangData) {
            this.translator.setTranslation(lang, pLangData);
            this.translator.use(lang);
            this.forumLanguage.next(lang);
        } else {
            return new Promise((resolve) => {
                this.http.get(`${environment.apiURL}/translations/${lang}/roaster?default=1`).subscribe((langData) => {
                    this.translator.setTranslation(lang, langData);
                    this.translator.use(lang);
                    this.forumLanguage.next(lang);
                    resolve(true);
                });
            });
        }
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

    getPopularList(type: string, options?: any, language = this.currentForumLanguage): Observable<any> {
        const data = {
            api_call: `/general/coffee-lab/popular-posts/${type}s?${this.serializeParams(options)}`,
            method: 'GET',
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

    getCategory(params): Observable<any> {
        return this.post(this.orgPostUrl, `general/categories?${this.serializeParams(params)}`, 'GET');
    }

    getTopWriters(options): Observable<any> {
        return this.post(this.orgPostUrl, `general/coffee-lab/top-writers?${this.serializeParams(options)}`, 'GET');
    }

    updateLike(type, id): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${id}/like`, 'PUT');
    }

    updateUnLike(type, id): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${id}/unlike`, 'PUT');
    }

    markBrewed(type, recipeId): Observable<any> {
        return this.post(this.orgPostUrl, `${this.orgType}/${this.getOrgId()}/${type}s/${recipeId}/mark-brewed`, 'PUT');
    }

    unMarkBrewed(type, recipeId): Observable<any> {
        return this.post(
            this.orgPostUrl,
            `${this.orgType}/${this.getOrgId()}/${type}s/${recipeId}/unmark-brewed`,
            'PUT',
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

    verifySlug(type: string, slug: string) {
        return this.post(this.orgPostUrl, `general/${type}s/${slug}/verify`, 'GET');
    }
}
