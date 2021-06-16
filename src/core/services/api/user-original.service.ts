// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains all API calls for SEWN-Roaster users.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { OrganizationType } from '@enums';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class UserserviceService extends ApiService {
    // API call URL's
    private roasterUrl = environment.apiURL + '/ro/api';
    private putUrl = environment.apiURL + '/ro/putapi';
    private url = environment.apiURL + '/api';
    private certificatesURL = environment.apiURL + '/ro/certificates';
    private profileImageURL = environment.apiURL + '/ro/uploadfiles';
    private languageURL = environment.apiURL + '/language';
    private inviteUrl = environment.apiURL + '/ro/inviteusers';
    private estateUrl = environment.apiURL + '/es/api';
    private fileUploadURL = environment.apiURL + '/ro/filesfolders';

    constructor(
        protected http: HttpClient,
        protected authService: AuthService,
        private socketService: SocketService,
        private cookieService: CookieService,
    ) {
        super(http, authService);
    }

    // API Function Name : Roaster Login
    // API Description: This API calls helps to get the username and password of the user
    // and send to the backend to check the user is valid or not.

    roasterLogin(body: any) {
        const data = {
            api_call: '/users/token',
            token: 'No',
            data: {
                email: body.email,
                password: body.password,
            },
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Logged in User Data
    // API Description: This API calls helps to get the user Details of the Logged in User.

    getUsers() {
        const userId = this.authService.userId;
        const roasterId = this.getOrgId();
        const data = {
            api_call: '/ro/' + roasterId + '/users/' + userId,
            token: this.authService.token,
        };
        return this.http.post(this.url, data);
    }

    // API Function Name :Logout
    // API Description: This API calls helps to Logout from the current session.

    logOut() {
        const data = {
            api_call: '/users/token',
            token: this.authService.token,
        };
        return this.http.post(this.deleteUrl, data).pipe(
            tap(() => {
                // Closing socket connection on logout
                this.socketService.destorySocket();
            }),
        );
    }

    // API Function Name :Update Roaster Profile
    // API Description: This API calls helps to update Roaster User Profile.

    updateRoasterProfile(roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/profile',
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.put(this.putUrl, data);
    }

    // API Function Name : Update Password
    // API Description: This API calls helps to Updated the User Password.

    updatePassword(body: any) {
        const data = {
            api_call: '/users/change-password',
            token: this.authService.token,
            data: body,
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Change Password
    // API Description: This API calls helps to Change the User Password.

    changePassword(body: any) {
        const data = {
            api_call: '/users/reset-password',
            token: this.authService.token,
            data: {
                email: body.email,
                token: body.token,
                password: body.password,
                confirm_password: body.confirm_password,
            },
        };

        return this.http.post(this.url, data);
    }

    // API Function Name : Verify OTP
    // API Description: This API calls helps to genarate OTP and send to the user recovery Email and Verify it.

    verifyOtp(body: any) {
        const data = {
            api_call: '/users/verify-otp',
            token: this.authService.token,
            data: {
                email: body.email,
                otp: body.otp,
            },
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Recovery Email
    // API Description: This API calls helps, if the user forgot his password, this API will get the user recovery Email and Verify it.

    recoveryEmail(body: any) {
        const data = {
            api_call: '/users/forgot-password',
            token: this.authService.token,
            data: {
                email: body.email,
            },
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Roaster Account
    // API Description: This API calls helps to get Roaster Account profile.

    getRoasterAccount(id: any) {
        const data = {
            api_call: '/ro/' + id + '/profile',
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    getProfileCreationData(orgId: any, orgType: OrganizationType): Observable<any> {
        return this.post(this.orgPostUrl, `${orgType}/${orgId}/profile`, 'GET');
    }

    getGeneralContactList(orgId: any, orgType: OrganizationType): Observable<any> {
        return this.post(this.postUrl, `general/${orgType}/${orgId}/users/top-contacts`, 'GET');
    }

    getGeneralCertificates(orgId: any, orgType: OrganizationType): Observable<any> {
        return this.post(this.postUrl, `general/${orgType}/${orgId}/certificates`, 'GET');
    }

    getGeneralVirtualTourFiles(orgId: any, orgType: OrganizationType, query: Object): Observable<any> {
        const params = this.serializeParams(query);
        return this.post(this.postUrl, `general/${orgType}/${orgId}/file-manager/all-files?${params}`, 'GET');
    }

    // API Function Name : Roaster Account
    // API Description: This API calls helps to update the Roaster Account profile.

    updateRoasterAccount(id: any, body: any) {
        const data = {
            api_call: '/ro/' + id + '/profile/',
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name :ADD Members
    // API Description: This API calls helps to add new users.

    addUserRoaster(body: any) {
        const data = {
            api_call: '/users',
            token: this.authService.token,
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getUser(params: any): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users?${this.serializeParams(params)}`, 'GET');
    }

    // API Function Name : Update Edit Member
    // API Description: This API calls helps to Edit userdata Details.

    updateUserData(body: any, roaster_id: any, user_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + user_id,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.put(this.putUrl, data);
    }

    // API Function Name : Roaster User Data
    // API Description: This API calls helps to get the particular Roaster user

    getRoasterUserData(roaster_id: any, user_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + user_id,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    searchUser(key: string) {
        key = decodeURIComponent(key);
        const data = {
            api_call: '/users/user-list?query=' + key,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post<any>(this.roasterUrl, data);
    }
    reportUser(user_id: number, org_type: OrganizationType, org_id: number) {
        const payloadData = {
            user_id,
            org_type,
            org_id: org_id || undefined,
            reason: 'Messaging abuse',
            origin: 'Messaging System',
        };

        return this.postWithOrg(this.orgPostUrl, 'report-user', 'POST', payloadData);
    }

    // API Function Name : Roaster User Last Login
    // API Description: This API calls helps to get the logged in user last login details.
    userLastlogin() {
        const data = {
            api_call: '/users/sessions',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Privacy Settings
    // API Description: This API call helps to set the Privacy policy terms.

    privacyTerms(body: any) {
        const data = {
            api_call: '/users/privacy-terms',
            method: 'POST',
            token: this.authService.token,
            data: body,
        };
        return this.http.post(this.url, data);
    }

    updatePrivacyTerms(body: any): Observable<any> {
        const data = {
            api_call: '/users/privacy-terms',
            method: 'PUT',
            token: this.authService.token,
            data: body,
        };
        return this.http.post(this.url, data);
    }

    updateOrganizationPrivacyTerms(body: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, 'terms', 'PUT', body);
    }

    // API Function Name : Privacy Settings
    // API Description: This API call helps to get the Privacy policy terms.

    getPrivacyTerms() {
        const data = {
            api_call: '/users/privacy-terms',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Upload Profile Image API.
    // API Description   : This API call helps to upload the Profile Image.
    uploadProfileImage(formData: any) {
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.profileImageURL, formData, httpOptions);
    }

    // API Function Name : Upload License and Certificates API.
    // API Description   : This API call helps to upload the license and certificates details.
    uploadCertificate(formData: any) {
        const httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.certificatesURL, formData, httpOptions);
    }

    // API Function Name : Certificates
    // API Description: This API call helps to get the Certificates.

    getCertificates(organizationId: any, userId: any) {
        const data = {
            api_call: `/ro/${organizationId}/users/${userId}/certificates`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Certificates
    // API Description: This API call helps to get the Certificates.

    deleteCertificate(roaster_id: any, userId: any, certificateId: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + userId + '/certificates/' + certificateId,
            method: 'DELETE',
            token: this.authService.token,
        };
        return this.http.post(this.orgDeleteUrl, data);
    }

    // API Function Name :Profile Image Delete
    // API Description: This API calls helps to delete the profile Image of the user.

    deleteProfileImage(userId: any, roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/' + userId + '/profile-image',
            token: this.authService.token,
        };
        return this.http.post(this.orgDeleteUrl, data);
    }

    // API Function Name : Language Setting
    // API Description: This API call helps to get the Language of the Roaster.

    getLanguageSetting(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/settings',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Language Setting
    // API Description: This API calls helps to update the Roaster Language Setting.

    updateLanguageSetting(body: any, id: any) {
        const data = {
            api_call: '/ro/' + id + '/settings',
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Certificates
    // API Description: This API call helps to get the Certificates.

    getCompanyCertificates(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/certificates',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Certificates
    // API Description: This API call helps to get the Certificates.

    deleteCompanyCertificate(roaster_id: any, certificateId: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/certificates/' + certificateId,
            method: 'DELETE',
            token: this.authService.token,
        };
        return this.http.post(this.orgDeleteUrl, data);
    }

    // API Function Name : Preferences Settings
    // API Description: This API call helps to set the Preferences terms.

    updatePreferences(roasterId: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/preferences',
            method: 'PUT',
            token: this.authService.token,
            data: body,
        };
        return this.http.put(this.putUrl, data);
    }

    // API Function Name : Preferences Settings
    // API Description: This API call helps to get the Preferences terms.

    getPreferences(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/preferences',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    // API Function Name: getLanguage
    // API Description: Get the Language based on user's signin and apply all application static text
    getUserLanguageStrings(language: any) {
        return this.http.post(this.languageURL, { lang: language });
    }
    async getLanguageStrings(language: any) {
        if (localStorage.getItem('languageStrings')) {
            return JSON.parse(decodeURIComponent(localStorage.getItem('languageStrings')));
        } else {
            const languageJSON = await this.getUserLanguageStrings(language)
                .pipe((res) => res)
                .toPromise();
            localStorage.setItem('languageStrings', encodeURIComponent(JSON.stringify(languageJSON)));
            return languageJSON;
        }
    }

    attachRoasterImage(userId: any, fileId: any, token) {
        const data = {
            api_call: '/ro/users/' + userId + '/attach-image/' + fileId,
            token,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    // API Function Name : Onboarding - Personal Details addition API.
    // API Description   : This API call helps to add Personal details of the user.
    personalDetails(body: any) {
        const data = {
            api_call: '/invite/users',
            data: body,
            token: '',
        };
        return this.http.post(this.inviteUrl, data);
    }
    // API Function Name : Roaster Onboarding - Roaster Account addition API.
    // API Description   : This API call helps to add Roaster Account user.
    roasterDetails(body: any) {
        const data = {
            api_call: '/ro/onboard',
            data: body,
            token: this.cookieService.get('authorization_key'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Certificate Types
    // API Description: This API call helps to get the Certificate types.

    getCertificateTypes() {
        const data = {
            api_call: '/general/certificate-types',
            method: 'GET',
            token: '',
        };
        return this.http.post(this.roasterUrl, data);
    }
    addConverseLanguage(body: any) {
        const data = {
            api_call: '/users/converse-languages',
            token: this.authService.token,
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getConverseLanguage() {
        const data = {
            api_call: '/users/converse-languages',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    sendMicroRoasterInvite(roasterId: any, email: any, name: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/micro-roasters/invite-token',
            token: this.authService.token,
            method: 'POST',
            data: {
                email,
                micro_roaster_name: name,
            },
        };
        return this.http.post(this.roasterUrl, data);
    }
    sendHorecaInvite(roasterId: any, email: any, name: any, type: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/hrc/invite-token',
            token: this.authService.token,
            method: 'POST',
            data: {
                email,
                horeca_name: name,
                horeca_type: type,
            },
        };

        return this.http.post(this.roasterUrl, data);
    }

    getAvailableEstates(roasterId: any, query = {}) {
        const queryParams = this.serializeParams(query);
        const data = {
            api_call: `/ro/${roasterId}/estates/availability?${queryParams}`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getAvailableEstateList(roasterId: any, estateId: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roasterId + '/estates/' + estateId,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    public getUserPermissions(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/permissions',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getUserPermissionPromise(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/permissions',
            method: 'GET',
            token: this.authService.token,
        };
        const promise = this.http
            .post(this.roasterUrl, data)
            .toPromise()
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    return err;
                },
            );
        return promise;
    }

    // Return the list of available green coffee by RO.
    getAvailableGreenCoffee(roasterId: any, queryParams = '') {
        const data = {
            api_call: `/ro/${roasterId}/availability/gc${queryParams}`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getAvailableGreenCoffeeDetail(roaster_id: any, harvest_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/availability/gc/' + harvest_id,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getRoasterLots(roaster_id: any, estate_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/estates/' + estate_id + '/lots',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getRoasterLotDetails(roaster_id: any, estate_id: any, lot_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/estates/' + estate_id + '/lots/' + lot_id,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Green Coffee availability Detail Page
    // API Description: This API call helps details of green coffee availability.
    getGreenCoffeeDetails(roaster_id: any, harvest_id: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/availability/gc/' + harvest_id,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name :  Estate Land lots
    // API Description: This API call helps to list land lots of an estate.
    getavailableLots(roaster_id: any, estate_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/estates/' + estate_id + '/lots',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name :  Flavour Profile
    // API Description: This API call helps get list of flavour profile.
    getFlavourProfile() {
        // const data = {
        //     api_call: '/general/flavour-profile',
        //     method: 'GET',
        //     token: this.authService.token,
        // };
        // return this.http.post(this.roasterUrl, data);
        return this.post(this.postUrl, `general/flavour-profile`);
    }

    updateLearnDetails(roaster_id: any, body: any, slug: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/brand-profile/' + slug,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.put(this.putUrl, data);
    }

    updateHomeDetails(roaster_id: any, body: any, slug: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/brand-profile/' + slug,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.put(this.putUrl, data);
    }
    addRoastingProfile(roaster_id: any, body: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile`,
            token: this.authService.token,
            data: body,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoastingProfileDetail(roaster_id: any, id: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile/${id}`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateRoastingProfileDetail(roaster_id: any, id: any, body: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile/${id}`,
            token: this.authService.token,
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    deleteRoastingProfile(roaster_id: any, id: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile/${id}`,
            method: 'DELETE',
            token: this.authService.token,
        };
        return this.http.post(this.orgDeleteUrl, data);
    }

    getGreenCoffee(roaster_id: any, detailestateId: any) {
        let params = new HttpParams();
        params = params.append('estate_id', detailestateId);
        const data = {
            api_call: '/ro/' + roaster_id + '/availability/gc?' + params,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // List of top contacts of an organization.
    getEstateContacts(estate_id: any) {
        return this.post(this.orgPostUrl, `general/es/${estate_id}/users/top-contacts`);
    }

    getEstateCertificates() {
        return this.post(this.postUrl, `general/certificate-types`);
    }

    updateRoastedBatchDetail(roaster_id: any, id: any, body: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/roasted-batches/${id}`,
            token: this.authService.token,
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    getRoastedBatchDetail(roaster_id: any, id: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/roasted-batches/${id}`,
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    addRoastedBatches(roaster_id: any, body: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/roasted-batches`,
            token: this.authService.token,
            data: body,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterFlavourProfile(roaster_id: any): Observable<any> {
        const data = {
            api_call: `/ro/${roaster_id}/flavour-profile`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getPageDetails(roaster_id: any, slug: any) {
        // let params = new HttpParams();
        const data = {
            api_call: '/ro/' + roaster_id + '/brand-profile/' + slug,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getFileDetails(roaster_id: any, file_id: any): Observable<any> {
        // let params = new HttpParams();
        const data = {
            api_call: '/ro/' + roaster_id + '/file-manager/files/' + file_id,
            method: 'GET',
            token: this.authService.token,
        };
        // tslint:disable: no-string-literal
        return this.http.post(this.roasterUrl, data).pipe(map((response) => response['result']));
    }
    getMicroDetails(roaster_id: any, micro_roaster_id: any) {
        // let params = new HttpParams();
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getEstateDetails(roaster_id: any, estate_id: any) {
        // let params = new HttpParams();
        const data = {
            api_call: `/general/es/${estate_id}/profile`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getFAQList(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/faq',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getHorecaDetails(roaster_id: any, hrc_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateMicroDiscount(roaster_id: any, micro_roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/discounts',
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateHorecaDiscount(roaster_id: any, hrc_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id + '/discounts',
            token: this.authService.token,
            data: body,
            method: 'PUT',
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateHorecaEnable(roaster_id: any, hrc_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id + '/enable',
            token: this.authService.token,
        };
        return this.http.put(this.putUrl, data);
    }
    updateHorecaDisable(roaster_id: any, hrc_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id + '/disable',
            token: this.authService.token,
        };
        return this.http.put(this.putUrl, data);
    }
    updateMicroRoasterEnable(roaster_id: any, micro_roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/enable',
            token: this.authService.token,
        };
        return this.http.put(this.putUrl, data);
    }
    updateMicroRoasterDisable(roaster_id: any, micro_roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/disable',
            token: this.authService.token,
        };
        return this.http.put(this.putUrl, data);
    }
    deleteMicroRoaster(roaster_id: any, micro_roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id,
            method: 'DELETE',
            token: this.authService.token,
        };
        return this.http.post(this.orgDeleteUrl, data);
    }
    getMicroroasterCertificates(micro_roaster_id: any) {
        const data = {
            api_call: '/general/mr/' + micro_roaster_id + '/certificates',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getMicroroasterContacts(micro_roaster_id: any) {
        const data = {
            api_call: '/general/mr/' + micro_roaster_id + '/users/top-contacts',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    deleteFAQ(roaster_id: any, faq_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/faq/' + faq_id,
            method: 'DELETE',
            token: this.authService.token,
        };
        return this.http.post(this.orgDeleteUrl, data);
    }

    addFAQ(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/faq`,
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    updateFAQ(roaster_id: any, faq_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/faq/${faq_id}`,
            token: this.authService.token,
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    // Update FAQ sort priorities.
    sortFAQ(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/faq`,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getTeamMembers(roaster_id: any, group) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + group,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getHorecaContacts(hrc_id: any) {
        const data = {
            api_call: '/general/hrc/' + hrc_id + '/users/top-contacts',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    addteamMember(roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/top-contacts',
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEachEsateCertificates(estate_id: any) {
        const data = {
            api_call: '/general/es/' + estate_id + '/certificates',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterVatDetails(roaster_id: any, vat_data: any): Observable<any> {
        let params = new HttpParams();
        params = params.append('vat_type', vat_data);
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings?' + params,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    addVatDetails(roaster_id: any, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings',
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getCustomerPendingDetails(roaster_id: any, email_id: any) {
        let params = new HttpParams();
        params = params.append('email', email_id);
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc?' + params,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getDefaultCoffeeExperience(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/coffee-experience`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getMrCustomerPendingDetails(roaster_id: any, email_id: any) {
        let params = new HttpParams();
        params = params.append('email', email_id);
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters?' + params,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEstateGallery(estateId: any) {
        const data = {
            api_call: `/general/es/${estateId}/file-manager/all-files?file_module=Gallery`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getShippingInfo(roaster_id: any, estate_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/estates/${estate_id}/shipping-info`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getAddresses(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/addresses`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    addAddresses(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/addresses`,
            method: 'POST',
            token: this.authService.token,
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getUserSessions(): Observable<any> {
        const data = {
            api_call: `/users/sessions`,
            token: this.authService.token,
            method: 'GET',
        };
        const url = `${environment.apiURL}/es/api`;
        return this.http.post(url, data).pipe(map((res) => res));
    }
    deactivateAccount(): Observable<any> {
        const data = {
            api_call: `/co/users/deactivate`,
            token: this.authService.token,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data).pipe(map((res) => res));
    }
    // List reviews received for an organization
    getReviews(orgId: any, orgType: OrganizationType, params = '') {
        const data = {
            api_call: `/general/${orgType}/${orgId}/reviews/?${params}`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    // Get review summary received for an organization
    getReviewsSummary(orgId: any, orgType = OrganizationType.ROASTER) {
        const data = {
            api_call: `/general/${orgType}/${orgId}/reviews-summary`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    addRoasterShippingDetails(roaster_id: any, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/shipping-types',
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterShippingTypes(roaster_id: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/shipping-types',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateRoasterShippingTypes(roaster_id: any, shipping_id: any, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/shipping-types/' + shipping_id,
            token: this.authService.token,
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    getSocialMediaPosts(roaster_id, type_in: any) {
        let params = new HttpParams();
        params = params.append('file_module', 'Social-Media');
        params = params.append('type_in', type_in);
        const data = {
            api_call: `/general/ro/${roaster_id}/file-manager/all-files?${params}`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    postDefaultCoffeeExperienceDetail(roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/coffee-experience',
            method: 'POST',
            data: body,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getGeneralRoasterCertificates(roaster_id: any) {
        const data = {
            api_call: `/general/ro/${roaster_id}/certificates`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    updateMrVat(roaster_id: any, body: any, vat_id: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings/' + vat_id,
            token: this.authService.token,
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    deleteMrVat(roaster_id: any, vat_id: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings/' + vat_id,
            method: 'DELETE',
            token: this.authService.token,
        };
        return this.http.post(this.orgDeleteUrl, data);
    }
    getEstateOrdersCoffeeExperience(roasterId: any, orderId: any) {
        const data = {
            api_call: `/ro/${roasterId}/orders/${orderId}/coffee-experience`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getMrOrdersCoffeeExperience(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/coffee-experience`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getCoffeeStory(roaster_id: any, order_id: any, type: string) {
        const data = {
            api_call: `/ro/${roaster_id}/${type}/${order_id}/coffee-story`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getOuttakeCoffeeStory(roasterId: any, outtakeOrderId: any) {
        const data = {
            api_call: `/ro/${roasterId}/outtake-orders/${outtakeOrderId}/coffee-story`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    postMrOrdersCoffeeExperience(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/coffee-experience`,
            method: 'POST',
            data: body,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getHrcOrdersCoffeeExperience(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/hrc-orders/${order_id}/coffee-experience`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getOuttakeOrdersCoffeeExperience(roasterId: any, outtakeOrderId: any) {
        const data = {
            api_call: `/ro/${roasterId}/outtake-orders/${outtakeOrderId}/coffee-experience`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    postHrcOrdersCoffeeExperience(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/hrc-orders/${order_id}/coffee-experience`,
            method: 'POST',
            data: body,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    postOuttakeOrdersCoffeeExperience(roasterId: any, orderId: any, body: any) {
        const data = {
            api_call: `/ro/${roasterId}/outtake-orders/${orderId}/coffee-experience`,
            method: 'POST',
            data: body,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getMarketingMaterials(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/marketing-materials`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    paymentReceiptUpload(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/orders/${order_id}/payment`,
            data: body,
            token: this.authService.token,
        };
        return this.http.put(this.putUrl, data);
    }

    // Save the rating and review of an order.
    addReviewOrder(roasterId: any, orderId: any, body: any, orgType?) {
        let endPoint = 'orders';
        if (orgType && orgType === 'mr') {
            endPoint = 'mr-orders';
        }
        const data = {
            api_call: `/ro/${roasterId}/${endPoint}/${orderId}/reviews`,
            method: 'POST',
            data: body,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getRecentActivity(roasterId: any, orderId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/orders/' + orderId + '/events',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getCuppingInviteList(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-invite-list',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getProcessDetails(roasterId: any, harvest_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/harvests/' + harvest_id + '/milling',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEvaluatorsList(roasterId: any, cupping_report_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/evaluators',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    addPhysicalDefects(roasterId: any, cupping_report_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/physical-defects',
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    updateCuppingType(cupping_report_id: any, body: any): Observable<any> {
        const roaster_id = this.getOrgId();
        const data = {
            api_call: `​/ro/${roaster_id}​/cupping-process​/${cupping_report_id}​/cupping-type`,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    addEvaluators(cupping_report_id: any, body: any) {
        const roaster_id = this.getOrgId();
        const data = {
            api_call: `​/ro/${roaster_id}​/cupping-process​/${cupping_report_id}​/evaluators`,
            token: this.authService.token,
            data: body,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getPhysicalDefectsList(roasterId: any, cupping_report_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/physical-defects',
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    addCuppingScore(roasterId: any, cupping_report_id, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/cupping-score',
            method: 'POST',
            token: this.authService.token,
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    editAddress(roasterId: any, address_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/addresses/' + address_id,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getCuppingScore(roasterId: any, cupping_report_id: any, evaluator_ids: any) {
        let params = new HttpParams();
        params = params.append('evaluator_ids', evaluator_ids);
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/cupping-score',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getSingleCuppingDetails(roasterId: any, cupping_report_id: any) {
        const data = {
            api_call: `/ro/${roasterId}/cupping-process/${cupping_report_id}`,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    addRequestSample(roasterId: any, harvest_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/availability/' + harvest_id + '/request-sample',
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    viewGcOrderDocuments(roasterId: any, order_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/orders/' + order_id + '/documents',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    addExternalCuppingReport(roasterId: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/external-samples',
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    listCuppingReports(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/my-cupping-reports',
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    listCuppingRequest(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/external-cupping-invite-list',
            token: this.authService.token,
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    getStats(roaster_id: any, query: any = {}) {
        const data = {
            api_call: `/ro/${roaster_id}/stats?sections=${query.sections || ''}&customer_type=${
                query.customer_type || ''
            }&chart_type=${query.chart_type || ''}&date_from=${query.date_from || ''}&date_to=${query.date_to || ''}`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    recupSample(roasterId: any, order_id: any) {
        const data = {
            api_call: `/ro/${roasterId}/orders/${order_id}/re-cup`,
            token: this.authService.token,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }

    downloadReportEvaluator(roasterId: any, cupping_report_id: any, filterEval: any) {
        let params = new HttpParams();
        params = params.append('evaluator_ids_in', filterEval);
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/download?' + params,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    externalRecupSample(roasterId: any, sample_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process​/external-samples/' + sample_id + '/re-cup',
            token: this.authService.token,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRecentActivities(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/recent-activity',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getPrebookBatchList(estateId: any, lotId: any, params?: any) {
        return this.postWithOrg(
            this.orgPostUrl,
            `/estates/${estateId}/lots/${lotId}/prebook-batches?${this.serializeParams(params)}`,
        );
    }
    addPrebookLots(roasterId: any, batch_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/batches/' + batch_id + '/prebook',
            token: this.authService.token,
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    recupSampleRequest(roaster_id: any, external_sample_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/cupping-process/external-samples/${external_sample_id}/re-cup`,
            token: this.authService.token,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateStatus(roaster_id: any, cupping_report_id: any, body: any) {
        const data = {
            api_call: `/fc​/${roaster_id}​/cupping-process​/${cupping_report_id}​/status`,
            token: this.authService.token,
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    downloadReport(roaster_id: any, cupping_report_id: any, evaluator_ids: any) {
        let params = new HttpParams();
        params = params.append('evaluator_ids_in', evaluator_ids);
        const data = {
            api_call: `/fc/${roaster_id}/cupping-process/${cupping_report_id}/download?${params}`,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    // Get FAQ Dispute List
    getDisputeFAQList(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/faq?faq_type=DISPUTE',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getMrRecentActivity(roasterId: any, orderId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/mr-orders/' + orderId + '/events',
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    updatePaymentVerify(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/payment/verify`,
            method: 'PUT',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    updatePaymentAfterDelivery(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/payment/after-delivery`,
            method: 'PUT',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateShipmentDetails(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/shipment`,
            method: 'PUT',
            data: body,
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getEstateBrandProfileDetail(estateId, pageSlug) {
        const data = {
            api_call: `/general/es/${estateId}/brand-profile/${pageSlug}`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getNofitication() {
        const organization = 'ro';
        const organizationId = this.getOrgId();
        const data = {
            api_call: `/${organization}/${organizationId}/notifications`,
            method: 'GET',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    makeAsAllRead() {
        const organization = 'ro';
        const organizationId = this.getOrgId();
        const data = {
            api_call: `/${organization}/${organizationId}/notifications/read`,
            method: 'PUT',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    makeAsRead(notificationId) {
        const organization = 'ro';
        const organizationId = this.getOrgId();
        const data = {
            api_call: `/${organization}/${organizationId}/notifications/${notificationId}/read`,
            method: 'PUT',
            token: this.authService.token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    uploadFile(roasterId: any, file: any, fileModule: string): Observable<any> {
        const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const headers = new HttpHeaders({ Accept: 'application/json' });
        const formData = new FormData();
        formData.append('api_call', '/ro/' + roasterId + '/file-manager/files');
        formData.append('token', this.authService.token);
        formData.append('file', file);
        formData.append('name', name);
        formData.append('file_module', fileModule);
        console.log('roaster id >>>>>>>>>>>', roasterId);
        return this.http.post(this.fileUploadURL, formData, { headers });
    }

    deleteFile(roasterId: any, fileId: any): Observable<any> {
        const data = {};
        data['api_call'] = `/ro/${roasterId}/file-manager/files/${fileId}`;
        data['method'] = 'DELETE';
        data['token'] = this.authService.token;
        return this.http.post(this.roasterUrl, data);
    }

    deleteBanner(roasterId: any): Observable<any> {
        const token = this.authService.token;
        const data = {
            api_call: `/ro/${roasterId}/profile/banner`,
            method: 'DELETE',
            token,
        };
        return this.http.post(this.roasterUrl, data);
    }

    getUserDetail(userId: string | number, orgType: string): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `general/${orgType}/users/${userId}`, 'GET');
    }
}
