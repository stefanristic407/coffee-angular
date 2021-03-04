export class Api {}
import { HttpClient } from '@angular/common/http';
import { ApiResponse, RequestDto } from '@models';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

type HttpMethod = '' | 'GET' | 'POST' | 'PUT' | 'DELETE';

export class ApiService {
    protected orgType: string;
    protected url: string;
    protected putUrl: string;
    protected deleteUrl: string;
    protected fileuploadUrl: string;
    protected putfileuploadUrl: string;

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        this.orgType = environment.orgType;
        this.url = environment.apiURL + '/ro/api';
        this.putUrl = `${environment.apiURL}/${environment.orgType}/putapi`;
        this.deleteUrl = `${environment.apiURL}/${environment.orgType}/deleteapi`;
        this.fileuploadUrl = `${environment.apiURL}/${environment.orgType}/filesfolders`;
        this.putfileuploadUrl = `${environment.apiURL}/${environment.orgType}/putfilesfolders`;
    }

    protected post(
        url: string,
        apiCall: string,
        method: HttpMethod = '',
        query?: object,
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDto(apiCall, method, query, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }

    protected postWithoutOrg(
        url: string,
        apiCall: string,
        method: HttpMethod = '',
        query?: object,
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDtoWithoutOrg(apiCall, method, query, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }
    protected put(
        url: string,
        apiCall: string,
        method: HttpMethod = '',
        query?: object,
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDto(apiCall, method, query, data);

        return this.http.put<ApiResponse<any>>(`${url}`, dto);
    }

    protected serializeParams(obj: object): string {
        const str = [];
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop) && !_.isNull(obj[prop]) && !_.isUndefined(obj[prop])) {
                str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
            }
        }

        return str.join('&');
    }

    private getDto(apiCall: string, method: string, query?: object, data?: object): RequestDto {
        const orgId = this.cookieSrv.get('roaster_id');
        const dto: RequestDto = {
            api_call: `/${this.orgType}/${orgId}/${apiCall}${query ? '?' + this.serializeParams(query) : ''}`,
            method,
            token: this.cookieSrv.get('Auth'),
        };

        if (data) {
            dto.data = data;
        }

        return dto;
    }

    private getDtoWithoutOrg(apiCall: string, method: string, query?: object, data?: object): RequestDto {
        const dto: RequestDto = {
            api_call: `/${apiCall}${query ? '?' + this.serializeParams(query) : ''}`,
            method,
            token: this.cookieSrv.get('Auth'),
        };

        if (data) {
            dto.data = data;
        }

        return dto;
    }
}
