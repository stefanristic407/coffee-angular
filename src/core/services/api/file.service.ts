import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class FileService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    // ------------ Farmlink Folders ------------

    // Delete the folder details
    createFolder(body: any) {
        return this.post(this.url, `file-manager/folders`, 'POST', null, body);
    }
    // Delete the folder details
    deleteFolder(id: any) {
        return this.post(this.deleteUrl, `file-manager/folders/${id}`, 'DELETE');
    }

    // ------------ Farmlink File share ------------
    // Share the file/folder access to user
    shareFileFolder(fileId: any, body: any) {
        return this.post(this.url, `file-manager/${fileId}/share`, 'POST', null, body);
    }

    // Update the file/folder access to user
    updatePermission(fileId: any, body: any) {
        return this.post(this.url, `file-manager/${fileId}/permission`, 'PUT', null, body);
    }

    // Get the shared user details by file/folder ID
    getSharedUsers(fileId: any) {
        return this.post(this.url, `file-manager/${fileId}/shared-users`, 'GET');
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
        const orgId = this.cookieSrv.get('roaster_id');
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        formData.append('api_call', `/${environment.orgType}/${orgId}/file-manager/files/${fileId}`);
        formData.append('token', this.cookieSrv.get('Auth'));
        return this.http.post(this.putfileuploadUrl, formData, httpOptions);
    }
    // Delete the file details
    deleteFile(id: any) {
        return this.post(this.deleteUrl, `file-manager/files/${id}`, 'DELETE');
    }
    // Pin the file/folder
    pinFileorFolder(id: any) {
        return this.post(this.url, `file-manager/${id}/pin`, 'PUT');
    }
    // Unpin the file/folder
    unpinFileorFolder(id: any) {
        return this.post(this.deleteUrl, `file-manager/${id}/pin`, 'DELETE');
    }
    // List all files/folders under My files section
    getFilesandFolders(query?: object) {
        return this.post(this.url, `file-manager/my-files`, 'GET', query);
    }
    // List all file/folders shared with me
    getSharedFilesandFolders(query?: object) {
        return this.post(this.url, `file-manager/shared`, 'GET', query);
    }
    // List all pinned file/folders for quick access
    getPinnedFilesandFolders(query?: object) {
        return this.post(this.url, `file-manager/pinned`, 'GET', query);
    }
    // Map files with order_id
    mapOrder(id: any, body: any) {
        return this.post(this.url, `file-manager/${id}/order-mapping`, 'POST', null, body);
    }
}
