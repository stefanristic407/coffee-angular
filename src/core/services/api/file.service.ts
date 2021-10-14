import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponse } from '@models';
import { Observable } from 'rxjs';
import { OrganizationType } from '@enums';
import { UploadService } from '../upload';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class FileService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService, private uploadService: UploadService) {
        super(http, authService);
    }

    // ------------ Farmlink Folders ------------

    // Delete the folder details
    createFolder(body: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/folders`, 'POST', body);
    }
    // View the folder details
    getFolder(id: number) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/folders/${id}`, 'GET');
    }
    // Update folder details
    updateFolder(id: number, body: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/folders/${id}`, 'PUT', body);
    }
    // Delete the folder details
    deleteFolder(id: any) {
        return this.postWithOrg(this.orgDeleteUrl, `file-manager/folders/${id}`, 'DELETE');
    }

    // ------------ Farmlink File share ------------
    // Share the file/folder access to user
    shareFileFolder(fileId: any, body: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/${fileId}/share`, 'POST', body);
    }

    // Removed the file/folder access to user
    unshareFileFolder(fileId: any, body: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/${fileId}/unshare`, 'POST', body);
    }

    // Update the file/folder access to user
    updatePermission(fileId: any, body: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/${fileId}/permission`, 'PUT', body);
    }

    // Get the shared user details by file/folder ID
    getSharedUsers(fileId: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/${fileId}/shared-users`, 'GET');
    }

    // ------------ Farmlink Files ------------
    // Upload Farmlink files
    uploadFiles(formData: FormData) {
        formData.append('api_call', `/${this.orgType}/${this.getOrgId()}/file-manager/files`);
        formData.append('token', this.authService.token);
        formData.append('method', 'POST');
        const processId = this.uploadService.addProcess(formData.get('name') as string);
        return this.http
            .post(this.fileUploadUrl, formData, {
                headers: new HttpHeaders({ Accept: 'application/json' }),
                reportProgress: true,
                observe: 'events',
            })
            .pipe(this.uploadService.upload(processId));
    }
    // Update the file
    updateFile(fileId, formData: FormData) {
        const orgId = this.getOrgId();
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        formData.append('api_call', `/${this.orgType}/${orgId}/file-manager/files/${fileId}`);
        formData.append('token', this.authService.token);
        return this.http.post(this.putFileUploadUrl, formData, httpOptions);
    }
    // Delete the file details
    deleteFile(id: any) {
        return this.postWithOrg(this.orgDeleteUrl, `file-manager/files/${id}`, 'DELETE');
    }
    // Pin the file/folder
    pinFileorFolder(id: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/${id}/pin`, 'PUT');
    }
    // Unpin the file/folder
    unpinFileorFolder(id: any) {
        return this.postWithOrg(this.orgDeleteUrl, `file-manager/${id}/pin`, 'DELETE');
    }
    // List all files/folders under My files section
    getMyFiles(query?: object) {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `file-manager/my-files?${params}`, 'GET');
    }
    // List all file/folders shared with me
    getSharedFilesandFolders(query?: object) {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `file-manager/shared?${params}`, 'GET');
    }
    // List all pinned file/folders for quick access
    getPinnedFilesandFolders(query?: object) {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `file-manager/pinned?${params}`, 'GET');
    }
    // Map files with order_id
    mapOrder(id: any, body: any) {
        return this.postWithOrg(this.orgPostUrl, `file-manager/${id}/order-mapping`, 'POST', body);
    }
    // List all files/folders under My files section
    getAllFiles(query?: object) {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `file-manager/all-files?${params}`, 'GET');
    }

    getGeneralFiles(orgId: any, orgType: OrganizationType, query?: object): Observable<any> {
        const params = this.serializeParams(query);
        return this.post(this.postUrl, `${orgType}/${orgId}/file-manager/all-files?${params}`, 'GET');
    }
}
