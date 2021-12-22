export class Api {}
import { HttpClient } from '@angular/common/http';
import { OrganizationSlug, OrganizationType } from '@enums';
import { environment } from '@env/environment';
import { ApiResponse, RequestDto } from '@models';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

type HttpMethod = '' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiService {
    readonly version = '2';
    readonly orgType = OrganizationType.ROASTER;
    readonly orgSlug = OrganizationSlug.ROASTER;
    protected certificatesUrl: string;
    protected deleteUrl: string;
    protected fileUploadUrl: string;
    protected generalUrl: string;
    protected inviteUrl: string;
    protected orgDeleteUrl: string;
    protected orgPostUrl: string;
    protected orgPutUrl: string;
    protected postUrl: string;
    protected profileImageUrl: string;
    protected putFileUploadUrl: string;
    protected simulatedLoginUrl: string;

    constructor(protected http: HttpClient, protected authService: AuthService) {
        this.certificatesUrl = `${environment.apiURL}/${this.orgType}/certificates`;
        this.deleteUrl = `${environment.apiURL}/deleteapi`;
        this.fileUploadUrl = `${environment.apiURL}/${this.orgType}/filesfolders`;
        this.generalUrl = `${environment.apiURL}/${this.orgType}/general`;
        this.inviteUrl = `${environment.apiURL}/${this.orgType}/inviteusers`;
        this.orgDeleteUrl = `${environment.apiURL}/${this.orgType}/deleteapi`;
        this.orgPostUrl = `${environment.apiURL}/${this.orgType}/api`;
        this.orgPutUrl = `${environment.apiURL}/${this.orgType}/putapi`;
        this.postUrl = `${environment.apiURL}/api`;
        this.profileImageUrl = `${environment.apiURL}/${this.orgType}/uploadfiles`;
        this.putFileUploadUrl = `${environment.apiURL}/${this.orgType}/putfilesfolders`;
        this.simulatedLoginUrl = `${environment.apiURL}/simulated-login`;
    }

    protected post(
        url: string,
        apiCall: string,
        method: HttpMethod = 'GET',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDto(apiCall, method, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }

    protected postWithOrg(
        url: string,
        apiCall: string,
        method: HttpMethod = 'GET',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDtoWithOrg(apiCall, method, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }

    protected putWithOrg(
        url: string,
        apiCall: string,
        method: HttpMethod = 'PUT',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDtoWithOrg(apiCall, method, data);

        return this.http.put<ApiResponse<any>>(`${url}`, dto);
    }

    protected getDtoWithOrg(apiCall: string, method: string, data?: object): RequestDto {
        const dto: RequestDto = {
            api_call: `/${this.orgType}/${this.getOrgId()}/${apiCall}`,
            method,
            token: this.getToken(),
            v: this.version,
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
            token: this.getToken(),
            v: this.version,
        };
        if (data) {
            dto.data = data;
        }
        return dto;
    }

    protected serializeParams(obj: object): string {
        const str = [];
        for (const prop in obj) {
            if (
                obj.hasOwnProperty(prop) &&
                !_.isNull(obj[prop]) &&
                !_.isUndefined(obj[prop]) &&
                !(_.isArray(obj[prop]) && _.isEmpty(obj[prop])) &&
                obj[prop] !== undefined &&
                obj[prop] !== ''
            ) {
                str.push(
                    encodeURIComponent(prop) +
                        '=' +
                        encodeURIComponent(_.isArray(obj[prop]) ? obj[prop].join(',') : obj[prop]),
                );
            }
        }
        return str.join('&');
    }

    get apiCallPrefix(): string {
        return `/${this.orgType}/${this.orgId}`;
    }

    get orgId(): number {
        return this.authService.getOrgId();
    }

    get userId(): number {
        return this.authService.userId;
    }

    get token(): string {
        return this.authService.token;
    }

    protected getOrgId(): number {
        return this.authService.getOrgId();
    }

    protected getUserId(): number {
        return this.authService.userId;
    }

    protected getToken(): string {
        return this.authService.token;
    }

    protected getOrgEndpoint(orgType: OrganizationType): string {
        switch (orgType) {
            case OrganizationType.ESTATE: {
                return 'estates';
            }
            case OrganizationType.ROASTER: {
                return 'roasters';
            }
            case OrganizationType.MICRO_ROASTER: {
                return 'micro-roasters';
            }
            case OrganizationType.FACILITATOR: {
                return 'facilitators';
            }
            case OrganizationType.HORECA: {
                return 'hrc';
            }
            case OrganizationType.CONSUMER: {
                return 'consumers';
            }
        }
    }
}
