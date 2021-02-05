// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains all API calls for SEWN-Roaster Roles and User Management.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class RoasterserviceService {
    //API call URL's
    private url = environment.apiURL + '/ro/api';
    private deleteUrl = environment.apiURL + '/ro/deleteapi';
    private putUrl = environment.apiURL + '/ro/putapi';
    private fileuploadUrl = environment.apiURL + '/ro/filesfolders';
    private putfileuploadUrl = environment.apiURL + '/ro/putfilesfolders';
    private encryptionKey = 'sewen_secrete_key';
    private uploadBrandsUrl = environment.apiURL + '/ro/uploadBrands';

    // private url = "https://fed-api.sewnstaging.com/ro/api";
    // private deleteUrl = "https://fed-api.sewnstaging.com/ro/deleteapi";
    // private putUrl = "https://fed-api.sewnstaging.com/ro/putapi";

    constructor(private http: HttpClient, private cookieService: CookieService) {}

    //API Function Name : Role List
    //API Description: This API calls helps to get all roles to the user.

    getRoles(id: any) {
        var data = {};
        data['api_call'] = '/ro/' + id + '/roles';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Delete Role
    //API Description: This API calls helps to delete the role.

    deleteRoles(roaster_id: any, id: any) {
        var data = {};
        console.log(this.deleteUrl);
        data['api_call'] = '/ro/' + roaster_id + '/roles/' + id;
        data['token'] = this.cookieService.get('Auth');
        console.log(data);
        return this.http.post(this.deleteUrl, data);
    }

    //API Function Name : Roaster User Data
    //API Description: This API calls helps to get the all Roaster user data.

    getRoasterUsers(id: any, postData?) {
        var data = {};
        data['api_call'] = '/ro/' + id + '/users?' + this.serlialise(postData);
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    serlialise(obj) {
        const str = [];
        for (const p in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    }

    //API Function Name : Create Role
    //API Description: This API calls helps to create a role to the user.

    createRole(body: any) {
        var data = {};
        data['api_call'] = '/ro/' + body.id + '/roles';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = {
            name: body.name,
        };
        return this.http.post(this.url, data);
    }

    //API Function Name : roaster permissions
    //API Description: This API calls helps to get the  permissions of the particular Roaster.

    getRoasterPermissions(id: any) {
        var data = {};
        data['api_call'] = '/ro/' + id + '/permissions';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Role Name
    //API Description: This API calls helps to get the Role name of the Selected role.

    getRoasterRoleName(id: any, roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roles/' + id;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Update Role
    //API Description: This API calls helps to Update role name.

    updateRoasterRoleName(body: any, roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roles/' + body.roleId;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = {
            name: body.name,
        };
        return this.http.post(this.url, data);
    }

    //API Function Name : Role permissions
    //API Description: This API calls helps to get all permissions.

    getRolePermissions(roaster_id: any, roleid: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roles/' + roleid + '/permissions';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Assign Role Permissions
    //API Description: This API calls helps to assign role permissions to the user

    assignRolePermissions(body: any, roleId: any, roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roles/' + roleId + '/permissions';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Get User Roles
    //API Description: This API calls helps to get the roles of the selected user.

    getUserBasedRoles(roaster_id: any, user_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + user_id + '/roles';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : delete user
    //API Description: This API calls helps to delete the selected user.

    deleteRoasterUser(roaster_id: any, user_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + user_id;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'DELETE';
        return this.http.post(this.url, data);
    }

    //API Function Name : Assign Role
    //API Description: This API calls helps to assign new role to the selected user.

    assignUserBasedUserRoles(roaster_id: any, role_id: any, user_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + user_id + '/roles/' + role_id;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        return this.http.post(this.url, data);
    }

    //API Function Name : Delete user role
    //API Description: This API calls helps to delete the role of the selected user

    deleteRoasterUserRole(roaster_id: any, role_id: any, user_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + user_id + '/roles/' + role_id;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'DELETE';
        return this.http.post(this.url, data);
    }

    //API Function Name : Enable Admin User
    //API Description: This API calls helps to Enable the selected user.

    enableAdminUser(roaster_id: any, enableUserId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + enableUserId + '/enable';
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        return this.http.put(this.putUrl, data);
    }

    //API Function Name : Disable Admin User
    //API Description: This API calls helps to Disable the selected user.

    disableAdminUsers(roaster_id: any, disableUserId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + disableUserId + '/disable';
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        return this.http.put(this.putUrl, data);
    }

    //API Function Name : Get Contacts
    //API Description: This API calls helps to get the contacts of the Roaster.

    getRoasterContacts(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/top-contacts';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Add Contacts
    //API Description: This API calls helps to add contacts of the Roaster.

    addRoasterContacts(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/top-contacts';
        data['method'] = 'POST';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Delete Contacts
    //API Description: This API calls helps to add contacts of the Roaster.

    deleteRoasterContacts(roaster_id: any, contact_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/top-contacts/' + contact_id;
        // data['method'] = "DELETE";
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }

    //API Function Name : Get Brands
    //API Description: This API calls helps to get the Brands of the Roaster.

    getRoasterBrands(roaster_id: any): Observable<any> {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/brands';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    addRoasterBrand(data: any): Observable<any> {
        return this.http.post(this.uploadBrandsUrl, data);
    }

    getRoasterReviews(roaster_id: any): Observable<any> {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/your-reviews';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Brands
    //API Description: This API calls helps to create the folder .

    createFolder(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Files/Folders
    //API Description: This API calls helps to get the files/folders.

    getFilesandFolders(roaster_id: any, parentId: any) {
        let params = new HttpParams();
        params = params.append('file_module', 'File-Share');
        params = params.append('parent_id', parentId);
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/my-files?' + params;
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )

        return this.http.post(this.url, data);
    }

    //API Function Name : Delete Folder
    //API Description: This API calls helps to delete the Folder.

    deleteFolder(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders/' + id;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }

    //API Function Name : Delete File
    //API Description: This API calls helps to delete the File.

    deleteFile(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/files/' + id;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }

    //API Function Name : Get Shared Files/Folders
    //API Description: This API calls helps to get the shared files/folders.

    getSharedFilesandFolders(roaster_id: any) {
        let params = new HttpParams();
        params = params.append('file_module', 'File-Share');
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/shared?' + params;
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )

        return this.http.post(this.url, data);
    }

    //API Function Name : Get Pinned Files/Folders
    //API Description: This API calls helps to get the pinned files/folders.

    getPinnedFilesandFolders(roaster_id: any) {
        let params = new HttpParams();
        params = params.append('file_module', 'File-Share');
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/pinned?' + params;
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )

        return this.http.post(this.url, data);
    }

    //API Function Name : Pin File/Folder
    //API Description: This API calls helps to Pin the File/Folder.

    pinFileorFolder(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + id + '/pin';
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Unpin File/Folder
    //API Description: This API calls helps to unpin the File/Folder.

    unpinFileorFolder(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + id + '/pin';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }

    //API Function Name : Rename the Details of the  Folder
    //API Description: This API calls helps to rename the details of the folder.

    updateFolderDetails(roaster_id: any, id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders/' + id;
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Folder Details
    //API Description: This API calls helps to get the folder details.

    getFolderDetails(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders/' + id;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Files Details
    //API Description: This API calls helps to get the files details.

    getFileDetails(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/files/' + id;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    // API Function Name : Upload Files API.
    // API Description   : This API call helps to upload the Files.
    uploadFiles(formData: any) {
        var httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.fileuploadUrl, formData, httpOptions);
    }

    // Upload brand profile files
    uploadBrandProfile(file) {
        const roasterId = this.cookieService.get('roaster_id');
        const uploadData = new FormData();
        uploadData.append('api_call', `/ro/${roasterId}/file-manager/files`);
        uploadData.append('method', 'POST');
        uploadData.append('file', file);
        uploadData.append('name', moment().format('YYYYMMDDHHmmss') + '.' + file.name.split('.').pop());
        uploadData.append('file_module', 'Brand-Profile');
        uploadData.append('token', this.cookieService.get('Auth'));
        return this.http.post(this.fileuploadUrl, uploadData);
    }

    // API Function Name : update Files API.
    // API Description   : This API call helps to update the Files.
    updateFiles(formData: any) {
        var httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.putfileuploadUrl, formData, httpOptions);
    }

    //API Function Name : Get Video files
    //API Description: This API calls helps to get the video files.
    getVideos(roaster_id: any, parentId: any) {
        let params = new HttpParams();
        params = params.append('file_module', 'File-Share');
        params = params.append('type_in', 'VIDEO');
        params = params.append('parent_id', parentId);
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/my-files?' + params;
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }

    //API Function Name : Share File/Folder
    //API Description: This API calls helps to share the file/folder to the user.

    shareFolder(roaster_id: any, file_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + file_id + '/share';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Agreements
    //API Description: This API calls helps to get the agreements .
    getAgreements(roaster_id: any, customer_type: any) {
        // let params = new HttpParams();
        // params = params.append('file_module', 'File-Share');
        // params = params.append('type_in','VIDEO');
        // params = params.append('parent_id', parentId)
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/' + customer_type + '/agreements';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }

    //API Function Name : Upload Agreements
    //API Description: This API calls helps to upload the agreements .
    uploadAgreements(roaster_id: any, customer_type: any, body: any) {
        // let params = new HttpParams();
        // params = params.append('file_module', 'File-Share');
        // params = params.append('type_in','VIDEO');
        // params = params.append('parent_id', parentId)
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/' + customer_type + '/agreements';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }

    //API Function Name : Update Agreements
    //API Description: This API calls helps to update the agreements.

    getAgreementValue(roaster_id: any, customer_type: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/' + customer_type + '/agreements/' + id;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Update Agreements
    //API Description: This API calls helps to update the agreements.

    updateAgreements(roaster_id: any, customer_type: any, id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/' + customer_type + '/agreements/' + id;
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    //API Function Name : Delete Agreement
    //API Description: This API calls helps to Delete the Agreement.

    deleteAgreement(roaster_id: any, customer_type: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/' + customer_type + '/agreements/' + id;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }

    //API Function Name : Get Users List
    //API Description: This API calls helps to get the Users List.
    getUsersList(typeValue: any) {
        let params = new HttpParams();
        // params = params.append('file_module', 'File-Share');
        // params = params.append('type_in','VIDEO');
        params = params.append('query', typeValue);
        var data = {};
        data['api_call'] = '/users/user-list?' + params;
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        // console.log(data);
        return this.http.post(this.url, data);
    }

    //API Function Name : Get shared users list
    //API Description: This API calls helps to get the shared users list.
    getSharedUserList(roasterId: any, fileId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/file-manager/' + fileId + '/shared-users';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }

    //API Function Name : UnShare File/Folder
    //API Description: This API calls helps to unshare the file/folder to the user.

    unShareFolder(roaster_id: any, file_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + file_id + '/unshare';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Update permissions of the File/Folder
    //API Description: This API calls helps to update permissions of the File/Folder.

    updatePermissions(roaster_id: any, file_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + file_id + '/permission';
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    getMicroRoasters(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        // console.log(data);
        return this.http.post(this.url, data);
    }
    getMicroRoastersHoreca(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/hrc';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        // console.log(data);
        return this.http.post(this.url, data);
    }

    getMicroRoastersList(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        // console.log(data);
        return this.http.post(this.url, data);
    }

    getRoastingProfile(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roasting-profile';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }
    getRoasterCoffeeBatchs(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roasted-batches';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }
    getSelectOrderListTable(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roasted-batches';
        // data['params'] = params;
        data['token'] = this.cookieService.get('Auth');
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }
    getSelectProductDetails(roaster_id: any, queryParams = '') {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/products${queryParams}`;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getProductDetails(roaster_id: any, productId: any): Observable<any> {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/products/${productId}`;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    // Update featured products list by RO
    updateFeatured(roasterId: any, product_ids: number[] = []): Observable<any> {
        const data = {
            api_call: `/ro/${roasterId}/products/update-featured`,
            data: { product_ids },
            method: 'PUT',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.url, data);
    }

    getEstateOrders(roaster_id: any, queryParams = '') {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/orders${queryParams}`;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getRaisedTicketData(roaster_id: any, orderType?) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/disputes';
        if (orderType == 'MR') {
            data['api_call'] = '/ro/' + roaster_id + '/micro_roasters/disputes';
        }
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    // getEstateSelectAnOrderTableData(roaster_id: any) {
    //   var data = {};
    //   data['api_call'] = "/ro/" + roaster_id + "/orders";
    //   data['token'] = this.cookieService.get('Auth');
    //   return this.http.post(this.url, data);
    // }
    encryptData(data) {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptionKey).toString();
        } catch (e) {
            console.log(e);
        }
    }
    decryptData(data) {
        try {
            const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
            console.log(bytes);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            return data;
        } catch (e) {
            console.log(e);
        }
    }
    navigate(href, newTab) {
        const a = document.createElement('a');
        a.href = href;
        if (newTab) {
            a.setAttribute('target', '_blank');
        }
        a.click();
        a.remove();
    }
    getMicroRoasterStimulatedLogin(id: any, roasterId: any) {
        const data = {};
        data['api_call'] = '/ro/' + roasterId + '/micro-roasters/' + id + '/support-login';
        data['method'] = 'POST';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getHorecaStimulatedLogin(id: any, roasterId: any) {
        const data = {};
        data['api_call'] = '/ro/' + roasterId + '/hrc/' + id + '/support-login';
        data['method'] = 'POST';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    getLoggedinUserRoles(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/roles';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    placeOrder(roaster_id: any, harvest_id: any, body: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/availability/${harvest_id}/gc`;
        data['method'] = 'POST';
        data['data'] = body;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getHorecaTable(roaster_id: any, hrc_id) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/hrc/${hrc_id}/partners`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    getMrOrders(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getMrAvailabilityRequests(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/availability-requests';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getViewOrderDetails(roaster_id: any, order_id: any, orderType?) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/orders/' + order_id;
        if (orderType && orderType == 'MR') {
            data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id;
        }
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    getOrderDisputeList(roaster_id: any, order_id: any, orderType?) {
        var data = {};
        data['method'] = 'GET';
        data['api_call'] = '/ro/' + roaster_id + '/orders/' + order_id + '/disputes';
        if (orderType == 'MR') {
            data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/disputes';
        }
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    deleteRoastedCoffeeBatch(roaster_id: any, batch_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasted-batches/${batch_id}`;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }
    orderReceived(roaster_id: any, order_id: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/orders/${order_id}/mark/received`;
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //E-com APIs
    getVatSettings(roaster_id: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/vat-settings`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getRoastedBatches(roaster_id: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/roasted-batches`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getCoffeeBatchDetails(roaster_id: any, batch_id: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/roasted-batches/${batch_id}`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data).pipe(map((res) => (res['result'] ? res['result'] : {})));
    }
    addProductDetails(roaster_id: any, body: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/products`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    deleteProductDetails(roaster_id: any, productId: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/products/${productId}`;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }
    updateProductDetails(roaster_id: any, productId: any, body: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/products/${productId}`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.put(this.putUrl, data);
    }
    addProductWeightVarients(roaster_id: any, product_id: any, body: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/products/${product_id}/weight-variants`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    updateProductWeightVarients(roaster_id: any, product_id: any, body: any, weightVariantId: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/products/${product_id}/weight-variants/${weightVariantId}`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.put(this.putUrl, data);
    }
    uploadProductImage(roaster_id: any, file: any): Observable<any> {
        let data = new FormData();
        const d = new Date();
        const n = d.getTime();
        data.append('api_call', `/ro/${roaster_id}/file-manager/files`);
        data.append('token', this.cookieService.get('Auth'));
        data.append('file', file);
        data.append('file_module', 'Product');
        data.append('name', n.toString());
        return this.http.post(this.fileuploadUrl, data).pipe(map((res) => res));
    }
    deleteProductImage(roaster_id: any, file_id: any): Observable<any> {
        let data = {};
        data['api_call'] = `/ro/${roaster_id}/file-manager/files/${file_id}`;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data).pipe(map((res) => res));
    }
    //E-com APIs-ends

    //Get Procured Coffees List
    getProcuredCoffeeList(roaster_id: any, origin?, displayCount?, searchString?) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/procured-coffees';
        data['method'] = 'GET';
        data['api_call'] = origin ? data['api_call'] + '?origin=' + origin : data['api_call'];
        if (origin && displayCount) {
            data['api_call'] = data['api_call'] + '&per_page=' + displayCount;
        } else if (displayCount) {
            data['api_call'] = data['api_call'] + '?per_page=' + displayCount;
        }
        if ((origin || displayCount) && searchString) {
            data['api_call'] = data['api_call'] + '&search_query=' + searchString;
        } else if (searchString) {
            data['api_call'] = data['api_call'] + '?search_query=' + searchString;
        }
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    //Get Coffee Sale List
    getCoffeeSaleList(roaster_id: any, status?, displayCount?) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/marked-sale-coffees';
        data['method'] = 'GET';
        data['api_call'] = status ? data['api_call'] + '?status=' + status : data['api_call'];
        if (status && displayCount) {
            data['api_call'] = data['api_call'] + '&per_page=' + displayCount;
        } else if (displayCount) {
            data['api_call'] = data['api_call'] + '?per_page=' + displayCount;
        }
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    //Get Procured Coffees Details
    getProcuredCoffeeDetails(roaster_id: any, orderID) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/orders/' + orderID;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    //Create Mark for Sale from Procured Coffee
    CreateMarkForSale(roaster_id: any, orderID, data) {
        let obj = {};
        obj['method'] = 'POST';
        obj['api_call'] = '/ro/' + roaster_id + '/procured-coffees/' + orderID + '/sale';
        obj['token'] = this.cookieService.get('Auth');
        obj['data'] = data;
        return this.http.post(this.url, obj);
    }
    //Get MarkFor Sale order details
    getMarkForSaleDetails(roaster_id: any, orderID) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/procured-coffees/' + orderID + '/sale';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }

    //upate Mark for Sale from Procured Coffee
    updateMarkForSale(roaster_id: any, orderID, data) {
        let obj = {};
        obj['method'] = 'PUT';
        obj['api_call'] = '/ro/' + roaster_id + '/procured-coffees/' + orderID + '/sale';
        obj['data'] = data;
        obj['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, obj);
    }
    //upate Mark for Sale status
    updateMarkForSaleStatus(roaster_id: any, orderID, data) {
        let obj = {};
        obj['method'] = 'PUT';
        obj['api_call'] = '/ro/' + roaster_id + '/procured-coffees/' + orderID + '/sale/status';
        obj['data'] = data;
        obj['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, obj);
    }
    //Get Harvest GC available details
    getGCAvailableDetails(harvest_id: any) {
        var data = {};
        data['api_call'] = '/general/availability/gc/' + harvest_id;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }

    //Raise a Ticket for the order
    raiseTicket(roaster_id: any, orderID, data, orderType?) {
        let obj = {};
        obj['method'] = 'POST';
        obj['api_call'] = '/ro/' + roaster_id + '/orders/' + orderID + '/disputes';
        if (orderType && orderType == 'MR') {
            obj['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + orderID + '/disputes';
        }
        obj['token'] = this.cookieService.get('Auth');
        obj['data'] = data;
        return this.http.post(this.url, obj);
    }

    getEvaluatorsList(roaster_id: any, cupping_report_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/cupping-process/' + cupping_report_id + '/evaluators';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    //API Function Name : Get user list of roaster
    getRoasterUserList(roasterId: any, query) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/users';
        data['api_call'] = query ? data['api_call'] + '?name=' + query : data['api_call'];
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    //API Function Name : Get user list of roaster
    markTicketasResolved(roasterId: any, disputeId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/resolve';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        return this.http.post(this.url, data);
    }
    //API Function Name : Escalate a Dispute
    escalteTicket(roasterId: any, disputeId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/escalate';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        return this.http.post(this.url, data);
    }
    //API Function Name : Assign user to Dispute
    assignUserDispute(roasterId: any, disputeId: any, userData) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/assign';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = userData;
        data['method'] = 'POST';
        return this.http.post(this.url, data);
    }
    //API Function Name : Add file IDs to dispute
    addFileIDDispute(roasterId: any, disputeId: any, userData) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/files';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = userData;
        data['method'] = 'POST';
        return this.http.post(this.url, data);
    }

    externalCuppingReportsList(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/external-cupping-reports';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }

    listCuppingRequest(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/external-cupping-invite-list';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    updateExternalSample(roasterId: any, cupping_report_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/external-samples';
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    deleteExternalSample(roasterId: any, cupping_report_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/external-samples';
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    //API Function Name : Get Harvest details
    getHarvestDetails(harvest_id: any) {
        var data = {};
        data['api_call'] = '/general/harvests/' + harvest_id + '/cupping-scores';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    //Get cupping report details
    getCuppingReportDetails(harvest_id: any) {
        var data = {};
        data['api_call'] = '/general/harvests/' + harvest_id + '/cupping-report';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    listServiceCuppingReports(roaster_id: any, gc_order_id: any) {
        var data = {};
        data['api_call'] = `​/gc/${roaster_id}​/orders/${gc_order_id}​/cupping-reports`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }

    listSampleCuppingReports(roaster_id: any, external_sample_id: any) {
        var data = {};
        data[
            'api_call'
        ] = `​/ro/${roaster_id}​/cupping-process/external-samples/${external_sample_id}​/cupping-reports`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    deleteEvaluator(roaster_id: any, cupping_report_id: any, evaluator_id: any) {
        var data = {};
        data['api_call'] =
            '/ro/' + roaster_id + '/cupping-process/' + cupping_report_id + '/evaluators/' + evaluator_id;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getMrGcOrderDetails(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    acceptMrConfirmOrder(roaster_id: any, order_id: any, body: any) {
        const data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/confirm';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    rejectBookedOrder(roaster_id: any, order_id: any, body: any) {
        const data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/reject';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    addOrderNotes(roaster_id: any, order_id: any, orderData: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/notes';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = orderData;
        data['method'] = 'POST';
        return this.http.post(this.url, data);
    }
    getOrderNotes(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/notes';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }
    getAvailableRequestDetail(roaster_id: any, availability_request_id: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/availability-requests/${availability_request_id}`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    updateAvailabilityStatus(roaster_id: any, availability_request_id: any, status: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/availability-requests/${availability_request_id}/${status}`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        return this.http.post(this.url, data);
    }

    // Order settings details
    getOrderSettings(roasterId) {
        const data = {
            api_call: `/ro/${roasterId}/order-settings`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.url, data);
    }

    getFeaturedProducts(roasterId): Observable<any> {
        const data = {
            api_call: `/general/ro/${roasterId}/featured-products`,
            method: 'GET',
            token: '',
        };
        return this.http.post(this.url, data);
    }

    // Delete certificate.
    deleteCertificate(roaster_id: any, certificateId: any) {
        const data = {
            api_call: `/ro/${roaster_id}/certificates/${certificateId}`,
            method: 'DELETE',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.url, data);
    }
}
