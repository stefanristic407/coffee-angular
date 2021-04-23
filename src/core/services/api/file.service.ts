import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponse } from '@models';
import { Observable } from 'rxjs';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class FileService extends ApiService {
    constructor(protected cookieService: CookieService, protected http: HttpClient) {
        super(cookieService, http);
    }

    dataURItoBlob(dataURI: any) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        const byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
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
    uploadFiles(formData: FormData): Observable<ApiResponse<any>> {
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        const roasterId = this.cookieService.get('roaster_id');
        formData.append('api_call', `/ro/${roasterId}/file-manager/files`);
        formData.append('token', this.cookieService.get('Auth'));
        formData.append('method', 'POST');
        return this.http.post<ApiResponse<any>>(this.fileUploadUrl, formData, httpOptions);
    }
    // Update the file
    updateFile(fileId, formData: FormData) {
        const orgId = this.cookieService.get('roaster_id');
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        formData.append('api_call', `/${this.orgType}/${orgId}/file-manager/files/${fileId}`);
        formData.append('token', this.cookieService.get('Auth'));
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
    getFilesandFolders(query?: object) {
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
        return this.post(this.orgPostUrl, `${orgType}/${orgId}/file-manager/all-files?${params}`, 'GET');
    }
}
