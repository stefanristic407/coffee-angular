import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    private orgType: string;
    private orgId: number | string;
    private token: string;
    private url: string;
    private deleteUrl: string;
    private fileuploadUrl: string;
    private putfileuploadUrl: string;

    constructor(private cookieSrv: CookieService, private http: HttpClient) {
        this.orgId = this.cookieSrv.get('roaster_id');
        this.orgType = environment.orgType;
        this.url = environment.apiURL + '/ro/api';
        this.deleteUrl = `${environment.apiURL}/${environment.orgType}/deleteapi`;
        this.fileuploadUrl = `${environment.apiURL}/${environment.orgType}/filesfolders`;
        this.putfileuploadUrl = `${environment.apiURL}/${environment.orgType}/putfilesfolders`;
    }

    // ------------ Farmlink Folders ------------

    // Delete the folder details
    deleteFolder(id: any) {
        const data = {
            api_call: `/${this.orgType}/${this.orgId}/file-manager/folders/${id}`,
            token: this.cookieSrv.get('Auth'),
        };
        return this.http.post(this.deleteUrl, data);
    }

    // ------------ Farmlink Files ------------
    // Upload Farmlink files
    uploadFiles(formData: FormData) {
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.fileuploadUrl, formData, httpOptions);
    }

    // Update the file
    updateFile(fileId, formData: FormData) {
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        formData.append('api_call', `/${environment.orgType}/${this.orgId}/file-manager/files/${fileId}`);
        formData.append('token', this.cookieSrv.get('Auth'));
        return this.http.post(this.putfileuploadUrl, formData, httpOptions);
    }

    // Delete the file details
    deleteFile(id: any) {
        const data = {
            api_call: `/${this.orgType}/${this.orgId}/file-manager/files/${id}`,
            token: this.cookieSrv.get('Auth'),
        };
        return this.http.post(this.deleteUrl, data);
    }
}
