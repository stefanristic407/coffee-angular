import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getForumList(type: string, options?: any): Observable<any> {
        return this.post(this.orgPostUrl, `general/${type}s?${this.serializeParams(options)}`, 'GET');
    }

    getForumDetails(type: string, idOrSlug: any): Observable<any> {
        return this.post(this.orgPostUrl, `general/${type}s/${idOrSlug}`, 'GET');
    }

    getCommentList(type: string, slug: any): any {
        return this.post(this.orgPostUrl, `general/${type}s/${slug}/comments`, 'GET');
    }

    postComment(type: string, id: any, data: any): any {
        return this.post(this.orgPostUrl, `co/${type}s/${id}/comments`, 'POST', data);
    }

    postQuestion(data: any): Observable<any> {
        return this.post(this.orgPostUrl, `co/questions`, 'POST', data);
    }

    getAuthors(type: string): Observable<any> {
        return this.post(this.orgPostUrl, `general/coffee-lab/authors?post_type=${type}s`, 'GET');
    }

    getDrafts(): Observable<any> {
        return this.post(this.orgPostUrl, `co/drafts`, 'GET');
    }

    getMyComments(organizationId): Observable<any> {
        return this.post(this.orgPostUrl, `ro/${organizationId}/my-comments`, 'GET');
    }

    getMyForumList(type: string, organizationId: any): Observable<any> {
        return this.post(this.orgPostUrl, `ro/${organizationId}/${type}s`, 'GET');
    }

    getSavedForumList(type: string, organizationId: any): Observable<any> {
        return this.post(this.orgPostUrl, `ro/${organizationId}/${type}s/saved`, 'GET');
    }
}
