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
        this.orgType = 'ro';
        this.url = `${environment.apiURL}/${this.orgType}/api`;
        this.putUrl = `${environment.apiURL}/${this.orgType}/putapi`;
        this.deleteUrl = `${environment.apiURL}/${this.orgType}/deleteapi`;
        this.fileuploadUrl = `${environment.apiURL}/${this.orgType}/filesfolders`;
        this.putfileuploadUrl = `${environment.apiURL}/${this.orgType}/putfilesfolders`;
    }

    protected post(url: string, apiCall: string, method: HttpMethod = '', data?: object): Observable<ApiResponse<any>> {
        const dto = this.getDto(apiCall, method, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }

    protected postWithOrg(
        url: string,
        apiCall: string,
        method: HttpMethod = '',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDtoWithOrg(apiCall, method, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }

    protected putWithOrg(
        url: string,
        apiCall: string,
        method: HttpMethod = '',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDtoWithOrg(apiCall, method, data);

        return this.http.put<ApiResponse<any>>(`${url}`, dto);
    }

    protected getDtoWithOrg(apiCall: string, method: string, data?: object): RequestDto {
        const orgId = this.cookieSrv.get('roaster_id');
        const dto: RequestDto = {
            api_call: `/${this.orgType}/${orgId}/${apiCall}`,
            method,
            token: this.cookieSrv.get('Auth'),
        };
        if (data) {
            dto.data = data;
        }
        return dto;
    }

    protected getDto(apiCall: string, method: string, data?: object): RequestDto {
        const dto: RequestDto = {
            api_call: `/${apiCall}`,
            method,
            token: this.cookieSrv.get('Auth'),
        };
        if (data) {
            dto.data = data;
        }
        return dto;
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
}
