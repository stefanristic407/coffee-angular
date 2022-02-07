import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationType } from '@enums';
import { ApiResponse, ProcuredCoffee } from '@models';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class RoasterService extends ApiService {
    private url = environment.apiURL + '/ro/api';
    private putUrl = environment.apiURL + '/ro/putapi';
    private fileuploadUrl = environment.apiURL + '/ro/filesfolders';
    private putfileuploadUrl = environment.apiURL + '/ro/putfilesfolders';
    private encryptionKey = 'sewen_secrete_key';
    private brandUrl = environment.apiURL + '/ro/brands';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ ACL ------------

    // Get the list of all permissions and their available access levels. There are two kinds of permissions:
    getAllPermissions(): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `permissions`);
    }
    // Get the list of all roles
    getRoles(postData?): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roles?${this.serializeParams(postData)}`);
    }
    // Create new role
    createRole(body: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roles`, 'POST', body);
    }
    // Get the details of role
    getRole(id: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roles/${id}`);
    }
    // Update an existing role
    updateRole(roleId: number, body: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roles/${roleId}`, 'PUT', body);
    }
    // Delete Role
    deleteRole(id: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgDeleteUrl, `roles/${id}`, 'DELETE');
    }
    // Get the list of all permissions for role
    getRolePermissions(roleId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roles/${roleId}/permissions`, 'GET');
    }
    // Assign permission(s) to role. Existing permissions will be deleted and replaced by permissions given in request body.
    assignRolePermissions(roleId: number, body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roles/${roleId}/permissions`, 'POST', body);
    }
    // Get the list of roles of user
    getUserBasedRoles(userId: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `users/${userId}/roles`);
    }
    // This API calls helps to assign new role to the selected user.
    assignUserBasedUserRoles(roleId: number, userId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `users/${userId}/roles/${roleId}`, 'POST');
    }
    // Remove role from user
    deleteUserRole(roleId: any, userId: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `users/${userId}/roles/${roleId}`, 'DELETE');
    }

    // ------------ USER ------------

    // Get list of all organization users and search functionality
    getOrgUsers(postData: object = {}) {
        return this.postWithOrg(this.orgPostUrl, `users?${this.serializeParams(postData)}`);
    }
    // List invited users by organisations
    getInvitedUserLists(postData?): Observable<ApiResponse<any[]>> {
        return this.postWithOrg(this.orgPostUrl, `users/invite-list?${this.serializeParams(postData)}`);
    }
    // This API calls helps to delete the selected user.
    deleteOrgUser(userId: number) {
        return this.postWithOrg(this.orgPostUrl, `users/${userId}`, 'DELETE');
    }

    // This API calls helps to Enable the selected user.
    enableAdminUser(userId: any) {
        return this.postWithOrg(this.orgPostUrl, `users/${userId}/enable`, 'PUT');
    }

    // This API calls helps to Disable the selected user.
    disableAdminUsers(userId: number) {
        return this.postWithOrg(this.orgPostUrl, `users/${userId}/disable`, 'PUT');
    }

    sendRecoveryEmail(userId: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `users/${userId}/send-recovery-email`, 'POST');
    }

    //API Function Name : Get Contacts
    //API Description: This API calls helps to get the contacts of the Roaster.

    getRoasterContacts(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/users/top-contacts`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }

    //API Function Name : Add Contacts
    //API Description: This API calls helps to add contacts of the Roaster.

    addRoasterContacts(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/users/top-contacts`,
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.url, data);
    }

    //API Function Name : Delete Contacts
    //API Description: This API calls helps to add contacts of the Roaster.

    deleteRoasterContacts(roaster_id: any, contact_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/users/top-contacts/${contact_id}`,
            token: this.authService.token,
            method: 'DELETE',
        };
        return this.http.post(this.orgDeleteUrl, data);
    }

    //API Function Name : Get Brands
    //API Description: This API calls helps to get the Brands of the Roaster.

    getRoasterBrands(): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `brands`);
    }

    addRoasterBrand(data: any): Observable<any> {
        return this.http.post(this.brandUrl, data);
    }

    updateRoasterBrand(data: any): Observable<any> {
        return this.http.post(this.brandUrl, data);
    }

    deleteRoasterBrand(brandId: string): Observable<any> {
        const roasterId = this.getOrgId();
        const token = this.authService.token;
        const data = {
            method: 'DELETE',
            api_call: `/ro/${roasterId}/brands/${brandId}`,
            token,
        };
        return this.http.post(this.url, data);
    }

    // Get all reviews posted by organization
    getRoasterReviews(roasterId: any, queryParams = {}): Observable<any> {
        const data = {
            api_call: `/ro/${roasterId}/your-reviews?${this.serializeParams(queryParams)}`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Brands
    //API Description: This API calls helps to create the folder .

    createFolder(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders';
        data['token'] = this.authService.token;
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Delete Folder
    //API Description: This API calls helps to delete the Folder.

    deleteFolder(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders/' + id;
        data['token'] = this.authService.token;
        return this.http.post(this.orgDeleteUrl, data);
    }

    //API Function Name : Delete File
    //API Description: This API calls helps to delete the File.

    deleteFile(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/files/' + id;
        data['token'] = this.authService.token;
        return this.http.post(this.orgDeleteUrl, data);
    }

    //API Function Name : Get Shared Files/Folders
    //API Description: This API calls helps to get the shared files/folders.

    getSharedFilesandFolders(roaster_id: any) {
        let params = new HttpParams();
        params = params.append('file_module', 'File-Share');
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/shared?' + params;
        // data['params'] = params;
        data['token'] = this.authService.token;
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
        data['token'] = this.authService.token;
        //  const params = new HttpParams().append( 'file_module', fileModule )

        return this.http.post(this.url, data);
    }

    //API Function Name : Pin File/Folder
    //API Description: This API calls helps to Pin the File/Folder.

    pinFileorFolder(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + id + '/pin';
        data['method'] = 'PUT';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }

    //API Function Name : Rename the Details of the  Folder
    //API Description: This API calls helps to rename the details of the folder.

    updateFolderDetails(roaster_id: any, id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders/' + id;
        data['method'] = 'PUT';
        data['token'] = this.authService.token;
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Folder Details
    //API Description: This API calls helps to get the folder details.

    getFolderDetails(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/folders/' + id;
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }

    //API Function Name : Get Files Details
    //API Description: This API calls helps to get the files details.

    getFileDetails(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/files/' + id;
        data['token'] = this.authService.token;
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

    // API Function Name : Upload Coffee Files API.
    // API Description   : This API call helps to upload the Files.
    uploadCoffeeFiles(formData: FormData): any {
        return this.http.post(this.fileUploadUrl, formData);
    }

    // Upload brand profile files
    uploadBrandProfile(file) {
        const roasterId = this.getOrgId();
        const uploadData = new FormData();
        uploadData.append('api_call', `/ro/${roasterId}/file-manager/files`);
        uploadData.append('method', 'POST');
        uploadData.append('file', file);
        uploadData.append('name', moment().format('YYYYMMDDHHmmss') + '.' + file.name.split('.').pop());
        uploadData.append('file_module', 'Brand-Profile');
        uploadData.append('token', this.authService.token);
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
        data['token'] = this.authService.token;
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }

    //API Function Name : Share File/Folder
    //API Description: This API calls helps to share the file/folder to the user.

    shareFolder(roaster_id: any, file_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + file_id + '/share';
        data['token'] = this.authService.token;
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    // API Function Name : Get Agreements
    // API Description: This API calls helps to get the agreements .
    getAgreements(roaster_id: any, customer_type: any) {
        const data = { api_call: '', token: '', method: '' };
        data.api_call = '/ro/' + roaster_id + '/' + customer_type + '/agreements';
        data.token = this.authService.token;
        data.method = 'GET';
        return this.http.post(this.url, data);
    }

    // API Function Name : Upload Agreements
    // API Description: This API calls helps to upload the agreements.

    uploadAgreements(roaster_id: any, customer_type: any, body: any) {
        const data = { api_call: '', token: '', method: '', data: '' };
        data.api_call = '/ro/' + roaster_id + '/' + customer_type + '/agreements';
        data.token = this.authService.token;
        data.data = body;
        data.method = 'POST';
        return this.http.post(this.url, data);
    }

    // API Function Name : Update Agreements
    // API Description: This API calls helps to update the agreements.

    updateAgreements(roaster_id: any, customer_type: any, id: any, body: any) {
        const data = { api_call: '', token: '', method: '', data: '' };
        data.api_call = '/ro/' + roaster_id + '/' + customer_type + '/agreements/' + id;
        data.method = 'PUT';
        data.token = this.authService.token;
        data.data = body;
        return this.http.post(this.url, data);
    }

    // API Function Name : Update Agreements
    // API Description: This API calls helps to update the agreements.

    getAgreementValue(roaster_id: any, customer_type: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/' + customer_type + '/agreements/' + id;
        data['method'] = 'GET';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }

    //API Function Name : Delete Agreement
    //API Description: This API calls helps to Delete the Agreement.

    deleteAgreement(roaster_id: any, customer_type: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/' + customer_type + '/agreements/' + id;
        data['token'] = this.authService.token;
        return this.http.post(this.orgDeleteUrl, data);
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
        data['token'] = this.authService.token;
        //  const params = new HttpParams().append( 'file_module', fileModule )
        // console.log(data);
        return this.http.post(this.url, data);
    }

    //API Function Name : Get shared users list
    //API Description: This API calls helps to get the shared users list.
    getSharedUserList(roasterId: any, fileId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/file-manager/' + fileId + '/shared-users';
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }

    //API Function Name : UnShare File/Folder
    //API Description: This API calls helps to unshare the file/folder to the user.

    unShareFolder(roaster_id: any, file_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/' + file_id + '/unshare';
        data['token'] = this.authService.token;
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
        data['token'] = this.authService.token;
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    getMicroRoasters(roasterId: any, postData?) {
        const data = { api_call: '', token: '', method: '' };
        data.api_call = `/ro/${roasterId}/micro-roasters?${this.serializeParams(postData)}`;
        data.token = this.authService.token;
        data.method = 'GET';
        return this.http.post(this.url, data);
    }

    getInviteUsers(options) {
        return this.postWithOrg(this.orgPostUrl, `invite-users?${this.serializeParams(options)}`, 'GET');
    }

    sendPortalInvite(email: any, portal): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `${portal}/invite-token`, 'POST', { email });
    }

    getPartnerDetails(roasterId: any, postData?) {
        const data = { api_call: '', token: '', method: '' };
        data.api_call = `/ro/${roasterId}/hrc?${this.serializeParams(postData)}`;
        data.token = this.authService.token;
        data.method = 'GET';
        return this.http.post(this.url, data);
    }

    getMicroRoastersList(roaster_id: any) {
        const data = { api_call: '', token: '', method: '' };
        data.api_call = '/ro/' + roaster_id + '/micro-roasters';
        data.token = this.authService.token;
        data.method = 'GET';
        return this.http.post(this.url, data);
    }

    getSelectOrderListTable(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/roasted-batches';
        // data['params'] = params;
        data['token'] = this.authService.token;
        //  const params = new HttpParams().append( 'file_module', fileModule )
        console.log(data);
        return this.http.post(this.url, data);
    }

    // Get the list of all default products
    getDefaultProducts(roaster_id: any, postData?) {
        const data = {
            api_call: `/ro/${roaster_id}/products/default?${this.serializeParams(postData)}`,
            token: this.authService.token,
        };
        return this.http.post(this.url, data);
    }
    // Update featured products list by RO
    updateFeatured(roasterId: any, body: any): Observable<any> {
        const data = {
            api_call: `/ro/${roasterId}/products/update-featured`,
            data: body,
            method: 'PUT',
            token: this.authService.token,
        };
        return this.http.post(this.url, data);
    }

    getEstateOrders(roaster_id: any, postData = null, orderType = '') {
        const data: any = {};
        data.api_call = '/ro/' + roaster_id + '/orders?' + this.serializeParams(postData);
        if (orderType == 'MR') {
            data.api_call = '/ro/' + roaster_id + '/mr-orders?' + this.serializeParams(postData);
        }
        data.token = this.authService.token;
        data.method = 'GET';
        return this.http.post(this.url, data);
    }

    getCoffeeExperienceOrders(roasterId: any, orderType: string, queryParams?: any) {
        const data = { api_call: '', method: '', token: '' };
        data.api_call = `/ro/${roasterId}/${orderType}?` + this.serializeParams(queryParams);
        data.method = 'GET';
        data.token = this.authService.token;
        return this.http.post(this.url, data);
    }

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
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    getHorecaStimulatedLogin(id: any, roasterId: any) {
        const data = {};
        data['api_call'] = '/ro/' + roasterId + '/hrc/' + id + '/support-login';
        data['method'] = 'POST';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    placeOrder(roaster_id: any, harvest_id: any, body: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/availability/${harvest_id}/gc`;
        data['method'] = 'POST';
        data['data'] = body;
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    getHorecaTable(roaster_id: any, hrc_id) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/hrc/${hrc_id}/partners`;
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    getHorecaTableDetails(roaster_id: any, hrc_id) {
        const data = { api_call: '', token: '', method: '' };
        data.api_call = `/ro/${roaster_id}/hrc/${hrc_id}`;
        data.token = this.authService.token;
        data.method = 'GET';
        return this.http.post(this.url, data);
    }
    getMrOrders(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    getMrAvailabilityRequests(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/availability-requests';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    getViewOrderDetails(roaster_id: any, order_id: any, orderType = null): Observable<any> {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/orders/' + order_id;
        if (orderType && (orderType == 'MR' || orderType == 'mr')) {
            data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id;
        }
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    getViewCustomerDetails(roaster_id: any, hrc_id: any, orderType = null): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/hrc/${hrc_id}`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }
    getCustomerDetails(roaster_id: any, customerType: string, customerId: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/${customerType}/${customerId}`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }

    getUserDetails(roasterID: any): Observable<any> {
        const data = {
            api_call: `/ro/${roasterID}/users`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }

    getsalesMemberDetails(roasterID: any, userID: any): Observable<any> {
        const data = {
            api_call: `/ro/${roasterID}/users/${userID}`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }

    getListOrderDetails(roasterId: any, orderType: string, postData = null): Observable<any> {
        const data = {
            api_call: `/ro/${roasterId}/${orderType}?` + this.serializeParams(postData),
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }
    addOrderDetails(roaster_id: any, body: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/outtake-orders`,
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.url, data);
    }
    getViewOrder(roaster_id: any, outtake_order_id: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/outtake-orders/${outtake_order_id}`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }
    updateOrderDetails(roaster_id: any, outtake_order_id: any, body: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/outtake-orders/${outtake_order_id}`,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.url, data);
    }

    getOrderDisputeList(roaster_id: any, order_id: any, orderType?) {
        var data = {};
        data['method'] = 'GET';
        data['api_call'] = '/ro/' + roaster_id + '/orders/' + order_id + '/disputes';
        if (orderType === 'MR') {
            data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/disputes';
        }
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    getOrderChatList(roaster_id: any, order_id: any, orderType?: OrganizationType) {
        var data = {};
        data['method'] = 'GET';
        data['api_call'] = '/ro/' + roaster_id + '/orders/' + order_id + '/threads';
        if (orderType === OrganizationType.MICRO_ROASTER) {
            data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/threads';
        }
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }

    orderReceived(roaster_id: any, order_id: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/orders/${order_id}/mark/received`;
        data['method'] = 'PUT';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }

    // Get Procured Coffees List
    getProcuredCoffeeList(params?: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `procured-coffees?${this.serializeParams(params)}`);
    }

    //Get Coffee Sale List
    getCoffeeSaleList(roaster_id: any, status?, displayCount?): Observable<any> {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/marked-sale-coffees';
        data['method'] = 'GET';
        data['api_call'] = status ? data['api_call'] + '?status=' + status : data['api_call'];
        if (status && displayCount) {
            data['api_call'] = data['api_call'] + '&per_page=' + displayCount;
        } else if (displayCount) {
            data['api_call'] = data['api_call'] + '?per_page=' + displayCount;
        }
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }

    // Get Procured Coffees Details
    getProcuredOrderDetails(orderID): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `orders/${orderID}`);
    }

    // Create Mark for Sale from Procured Coffee
    createMarkForSale(orderID: number, data: object): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `procured-coffees/${orderID}/sale`, 'POST', data);
    }

    // Get Mark For Sale order details
    getMarkForSaleDetails(orderID): Observable<ApiResponse<ProcuredCoffee>> {
        return this.postWithOrg(this.orgPostUrl, `procured-coffees/${orderID}/sale`);
    }

    // upate Mark for Sale from Procured Coffee
    updateMarkForSale(orderID: number, data: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `procured-coffees/${orderID}/sale`, 'PUT', data);
    }

    // upate Mark for Sale status
    updateMarkForSaleStatus(orderID: number, data: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `procured-coffees/${orderID}/sale/status`, 'PUT', data);
    }

    //Get Harvest GC available details
    getGCAvailableDetails(harvest_id: any): Observable<any> {
        var data = {};
        data['api_call'] = '/general/availability/gc/' + harvest_id;
        data['token'] = this.authService.token;
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
        obj['token'] = this.authService.token;
        obj['data'] = data;
        return this.http.post(this.url, obj);
    }

    getEvaluatorsList(roaster_id: any, cupping_report_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/cupping-process/' + cupping_report_id + '/evaluators';
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    //API Function Name : Get user list of roaster
    getRoasterUserList(roasterId: any, query) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/users';
        data['api_call'] = query ? data['api_call'] + '?name=' + query : data['api_call'];
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    //API Function Name : Get user list of roaster
    markTicketasResolved(roasterId: any, disputeId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/resolve';
        data['token'] = this.authService.token;
        data['method'] = 'PUT';
        return this.http.post(this.url, data);
    }
    //API Function Name : Escalate a Dispute
    escalteTicket(roasterId: any, disputeId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/escalate';
        data['token'] = this.authService.token;
        data['method'] = 'PUT';
        return this.http.post(this.url, data);
    }
    //API Function Name : Assign user to Dispute
    assignUserDispute(roasterId: any, disputeId: any, userData, flag?) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/assign';
        data['method'] = 'POST';
        if (flag) {
            data['api_call'] = '/ro/' + roasterId + '/orders/' + disputeId + '/users/' + userData.user_id + '/assign';
            data['method'] = 'PUT';
        }
        data['token'] = this.authService.token;
        data['data'] = userData;

        return this.http.post(this.url, data);
    }
    //API Function Name : Add file IDs to dispute
    addFileIDDispute(roasterId: any, disputeId: any, userData) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/disputes/' + disputeId + '/files';
        data['token'] = this.authService.token;
        data['data'] = userData;
        data['method'] = 'POST';
        return this.http.post(this.url, data);
    }

    externalCuppingReportsList(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/external-cupping-reports';
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }

    listCuppingRequest(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/external-cupping-invite-list';
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    updateExternalSample(roasterId: any, cupping_report_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/external-samples';
        data['method'] = 'PUT';
        data['token'] = this.authService.token;
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    deleteExternalSample(roasterId: any, cupping_report_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/external-samples';
        data['method'] = 'DELETE';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    //API Function Name : Get Harvest details
    getHarvestDetails(harvest_id: any) {
        var data = {};
        data['api_call'] = '/general/harvests/' + harvest_id + '/cupping-scores';
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    //Get cupping report details
    getCuppingReportDetails(harvest_id: any): Observable<any> {
        var data = {};
        data['api_call'] = '/general/harvests/' + harvest_id + '/cupping-report';
        data['method'] = 'GET';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }

    getActivityDetails(orderID: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `orders/${orderID}/activity-logs`);
    }

    listSampleCuppingReports(roaster_id: any, external_sample_id: any) {
        var data = {};
        data[
            'api_call'
        ] = `​/ro/${roaster_id}​/cupping-process/external-samples/${external_sample_id}​/cupping-reports`;
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    deleteEvaluator(roaster_id: any, cupping_report_id: any, evaluator_id: any) {
        var data = {};
        data['api_call'] =
            '/ro/' + roaster_id + '/cupping-process/' + cupping_report_id + '/evaluators/' + evaluator_id;
        data['method'] = 'DELETE';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    getMrGcOrderDetails(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id;
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    acceptMrConfirmOrder(roaster_id: any, order_id: any, body: any) {
        const data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/confirm';
        data['token'] = this.authService.token;
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    rejectBookedOrder(roaster_id: any, order_id: any, body: any) {
        const data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/reject';
        data['token'] = this.authService.token;
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.url, data);
    }
    addOrderNotes(roaster_id: any, order_id: any, orderData: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/notes';
        data['token'] = this.authService.token;
        data['data'] = orderData;
        data['method'] = 'POST';
        return this.http.post(this.url, data);
    }
    getOrderNotes(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/mr-orders/' + order_id + '/notes';
        data['token'] = this.authService.token;
        return this.http.post(this.url, data);
    }
    getAvailableRequestDetail(roaster_id: any, availability_request_id: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/availability-requests/${availability_request_id}`;
        data['token'] = this.authService.token;
        data['method'] = 'GET';
        return this.http.post(this.url, data);
    }
    updateAvailabilityStatus(roaster_id: any, availability_request_id: any, status: any) {
        const data = {};
        data['api_call'] = `/ro/${roaster_id}/availability-requests/${availability_request_id}/${status}`;
        data['token'] = this.authService.token;
        data['method'] = 'PUT';
        return this.http.post(this.url, data);
    }

    // Get GC order settings
    getGcOrderSettings(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `general/gc-order-settings`);
    }

    // Get order settings details
    getOrderSettings(): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `order-settings`);
    }

    // Update order settings details
    updateOrderSettings(body: object): Observable<ApiResponse<any>> {
        return this.putWithOrg(this.orgPutUrl, `order-settings`, 'PUT', body);
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
    addCertificate(roaster_id: any, fileData: any) {
        const data = {
            api_call: `/ro/${roaster_id}/certificates/`,
            method: 'POST',
            token: this.authService.token,
            data: {
                file: fileData,
                certificate_type_id: 1234,
                year: 2021,
            },
        };
        return this.http.post(this.url, data);
    }

    deleteCertificate(roaster_id: any, certificateId: any) {
        const data = {
            api_call: `/ro/${roaster_id}/certificates/${certificateId}`,
            method: 'DELETE',
            token: this.authService.token,
        };
        return this.http.post(this.url, data);
    }

    // Save the slug for the organization
    updateRoasterSlug(roasterId, slug: any) {
        const data = {
            api_call: `/ro/${roasterId}/slug`,
            token: this.authService.token,
            method: 'POST',
            data: { slug },
        };
        return this.http.post(this.url, data);
    }

    // Get the Roaster order notes list
    getRoasterNotes(orderId): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `orders/${orderId}/notes`);
    }

    deleteOuttakeOrders(roasterId: any, outTakeOrderId): Observable<any> {
        const data = {
            api_call: `/ro/${roasterId}/outtake-orders/${outTakeOrderId}`,
            token: this.authService.token,
            method: 'DELETE',
        };
        return this.http.post(this.url, data);
    }

    cancelOuttakeOrders(outTakeOrderId): Observable<ApiResponse<any>> {
        return this.putWithOrg(this.orgPutUrl, `outtake-orders/${outTakeOrderId}/cancel`);
    }

    exportOuttakeOrders(exportType: string, params: object = {}) {
        return this.postWithOrg(this.orgPostUrl, `outtake-orders/export/${exportType}?${this.serializeParams(params)}`);
    }

    // Delete Procured Coffee.
    deleteProcuredCoffee(orderId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgDeleteUrl, `procured-coffees/${orderId}/sale`, 'DELETE');
    }

    getRoasterOuttakeOrders(roasterId) {
        const data = {
            api_call: `/ro/${roasterId}/outtake-orders`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.url, data);
    }
}
