// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains all API calls for SEWN-Roaster users.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketService } from '../socket.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserserviceService {
    // API call URL's
    private roasterUrl = environment.apiURL + '/ro/api';
    private roasterDeleteUrl = environment.apiURL + '/ro/deleteapi';
    private putUrl = environment.apiURL + '/ro/putapi';
    private url = environment.apiURL + '/api';
    private deleteUrl = environment.apiURL + '/deleteapi';
    private certificatesURL = environment.apiURL + '/ro/certificates';
    private profileImageURL = environment.apiURL + '/ro/uploadfiles';
    private languageURL = environment.apiURL + '/language';
    private sendEmailURL = environment.apiURL + '/sendemail';
    private inviteUrl = environment.apiURL + '/ro/inviteusers';
    private estateUrl = environment.apiURL + '/es/api';

    // private roasterUrl = "/ro/api";
    // private roasterDeleteUrl = "https://fed-api.sewnstaging.com/ro/deleteapi";
    // private putUrl = "https://fed-api.sewnstaging.com/ro/putapi";
    // private url = "https://fed-api.sewnstaging.com/api";
    // private deleteUrl = "https://fed-api.sewnstaging.com/deleteapi";

    constructor(private http: HttpClient, public cookieService: CookieService, private socketService: SocketService) {}

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
        const userId = this.cookieService.get('user_id');
        const roasterId = this.cookieService.get('roaster_id');
        const data = {
            api_call: '/ro/' + roasterId + '/users/' + userId,
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.url, data);
    }

    // API Function Name :Logout
    // API Description: This API calls helps to Logout from the current session.

    logOut() {
        const data = {
            api_call: '/users/token',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.deleteUrl, data).pipe(
            tap(() => {
                // Closing socket connection on logout
                this.socketService.destorySocket();
            }),
        );
    }

    // API Function Name :Roaster Profile
    // API Description: This API calls helps to Roaster User Profile.

    // tslint:disable: variable-name
    getRoasterProfile(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/profile',
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name :Update Roaster Profile
    // API Description: This API calls helps to update Roaster User Profile.

    updateRoasterProfile(roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/profile',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
            data: body,
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Change Password
    // API Description: This API calls helps to Change the User Password.

    changePassword(body: any) {
        const data = {
            api_call: '/users/reset-password',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Roaster Account
    // API Description: This API calls helps to update the Roaster Account profile.

    updateRoasterAccount(id: any, body: any) {
        const data = {
            api_call: '/ro/' + id + '/profile/',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Update Edit Member
    // API Description: This API calls helps to Edit userdata Details.

    updateUserData(body: any, roaster_id: any, user_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + user_id,
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    searchUser(key: string) {
        const data = {
            api_call: '/users/user-list?query=' + key,
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post<any>(this.roasterUrl, data);
    }

    // API Function Name : Roaster User Last Login
    // API Description: This API calls helps to get the logged in user last login details.
    userLastlogin() {
        const data = {
            api_call: '/users/sessions',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Privacy Settings
    // API Description: This API call helps to set the Privacy policy terms.

    privacyTerms(body: any) {
        const data = {
            api_call: '/users/privacy-terms',
            method: 'POST',
            token: this.cookieService.get('Auth'),
            data: body,
        };
        return this.http.post(this.url, data);
    }

    // API Function Name : Privacy Settings
    // API Description: This API call helps to get the Privacy policy terms.

    getPrivacyTerms() {
        const data = {
            api_call: '/users/privacy-terms',
            method: 'GET',
            token: this.cookieService.get('Auth'),
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

    getCertificates(roaster_id: any, userId: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + userId + '/certificates',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Certificates
    // API Description: This API call helps to get the Certificates.

    deleteCertificate(roaster_id: any, userId: any, certificateId: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + userId + '/certificates/' + certificateId,
            method: 'DELETE',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterDeleteUrl, data);
    }

    // API Function Name :Profile Image Delete
    // API Description: This API calls helps to delete the profile Image of the user.

    deleteProfileImage(userId: any, roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/' + userId + '/profile-image',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterDeleteUrl, data);
    }

    // API Function Name : Language Setting
    // API Description: This API call helps to get the Language of the Roaster.

    getLanguageSetting(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/settings',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Language Setting
    // API Description: This API calls helps to update the Roaster Language Setting.

    updateLanguageSetting(body: any, id: any) {
        const data = {
            api_call: '/ro/' + id + '/settings',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Certificates
    // API Description: This API call helps to get the Certificates.

    deleteCompanyCertificate(roaster_id: any, certificateId: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/certificates/' + certificateId,
            method: 'DELETE',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterDeleteUrl, data);
    }

    // API Function Name : Preferences Settings
    // API Description: This API call helps to set the Preferences terms.

    updatePreferences(roasterId: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/preferences',
            method: 'PUT',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getConverseLanguage() {
        const data = {
            api_call: '/users/converse-languages',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    sendMicroRoasterInvite(roasterId: any, email: any, name: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/micro-roasters/invite-token',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: {
                email,
                horeca_name: name,
                horeca_type: type,
            },
        };

        return this.http.post(this.roasterUrl, data);
    }

    sendUrlToEmail(body: any) {
        const data = body;
        return this.http.post(this.sendEmailURL, data);
    }
    getAvailableEstates(roasterId: any, queryParams = '') {
        const data = {
            api_call: `/ro/${roasterId}/estates/availability${queryParams}`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getAvailableEstateList(roasterId: any, estateId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/estates/' + estateId,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    public getUserPermissions(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/permissions',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getUserPermissionPromise(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/users/permissions',
            method: 'GET',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getAvailableGreenCoffeeDetail(roaster_id: any, harvest_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/availability/gc/' + harvest_id,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getRoasterLots(roaster_id: any, estate_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/estates/' + estate_id + '/lots',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getRoasterLotDetails(roaster_id: any, estate_id: any, lot_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/estates/' + estate_id + '/lots/' + lot_id,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name : Green Coffee availability Detail Page
    // API Description: This API call helps details of green coffee availability.
    getGreenCoffeeDetails(roaster_id: any, harvest_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/availability/gc/' + harvest_id,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name :  Estate Land lots
    // API Description: This API call helps to list land lots of an estate.
    getavailableLots(roaster_id: any, estate_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/estates/' + estate_id + '/lots',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    // API Function Name :  Flavour Profile
    // API Description: This API call helps get list of flavour profile.
    getFlavourProfile() {
        const data = {
            api_call: '/general/flavour-profile',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateLearnDetails(roaster_id: any, body: any, slug: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/brand-profile/' + slug,
            token: this.cookieService.get('Auth'),
            method: 'PUT',
            data: body,
        };
        return this.http.put(this.putUrl, data);
    }

    updateHomeDetails(roaster_id: any, body: any, slug: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/brand-profile/' + slug,
            token: this.cookieService.get('Auth'),
            method: 'PUT',
            data: body,
        };
        return this.http.put(this.putUrl, data);
    }
    addRoastingProfile(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile`,
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoastingProfileDetail(roaster_id: any, id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile/${id}`,
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateRoastingProfileDetail(roaster_id: any, id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile/${id}`,
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    deleteRoastingProfile(roaster_id: any, id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/roasting-profile/${id}`,
            method: 'DELETE',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterDeleteUrl, data);
    }

    getGreenCoffee(roaster_id: any, detailestateId: any) {
        let params = new HttpParams();
        params = params.append('estate_id', detailestateId);
        const data = {
            api_call: '/ro/' + roaster_id + '/availability/gc?' + params,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEstateContacts(estate_id: any) {
        const data = {
            api_call: '/general/es/' + estate_id + '/users/top-contacts',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEstateCertificates() {
        const data = {
            api_call: '/general/certificate-types/',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateRoastedBatchDetail(roaster_id: any, id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/roasted-batches/${id}`,
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    getRoastedBatchDetail(roaster_id: any, id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/roasted-batches/${id}`,
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    addRoastedBatches(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/roasted-batches`,
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterFlavourProfile(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/flavour-profile`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getPageDetails(roaster_id: any, slug: any) {
        // let params = new HttpParams();
        const data = {
            api_call: '/ro/' + roaster_id + '/brand-profile/' + slug,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getFileDetails(roaster_id: any, file_id: any): Observable<any> {
        // let params = new HttpParams();
        const data = {
            api_call: '/ro/' + roaster_id + '/file-manager/files/' + file_id,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        // tslint:disable: no-string-literal
        return this.http.post(this.roasterUrl, data).pipe(map((response) => response['result']));
    }
    getMicroDetails(roaster_id: any, micro_roaster_id: any) {
        // let params = new HttpParams();
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getFAQList(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/faq',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getHorecaDetails(roaster_id: any, hrc_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateMicroDiscount(roaster_id: any, micro_roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/discounts',
            token: this.cookieService.get('Auth'),
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateHorecaDiscount(roaster_id: any, hrc_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id + '/discounts',
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'PUT',
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateHorecaEnable(roaster_id: any, hrc_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id + '/enable',
            token: this.cookieService.get('Auth'),
        };
        return this.http.put(this.putUrl, data);
    }
    updateHorecaDisable(roaster_id: any, hrc_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/hrc/' + hrc_id + '/disable',
            token: this.cookieService.get('Auth'),
        };
        return this.http.put(this.putUrl, data);
    }
    updateMicroRoasterEnable(roaster_id: any, micro_roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/enable',
            token: this.cookieService.get('Auth'),
        };
        return this.http.put(this.putUrl, data);
    }
    updateMicroRoasterDisable(roaster_id: any, micro_roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/disable',
            token: this.cookieService.get('Auth'),
        };
        return this.http.put(this.putUrl, data);
    }
    deleteMicroRoaster(roaster_id: any, micro_roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id,
            method: 'DELETE',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterDeleteUrl, data);
    }
    getMicroroasterCertificates(micro_roaster_id: any) {
        const data = {
            api_call: '/general/mr/' + micro_roaster_id + '/certificates',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getMicroroasterContacts(micro_roaster_id: any) {
        const data = {
            api_call: '/general/mr/' + micro_roaster_id + '/users/top-contacts',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    deleteFAQ(roaster_id: any, faq_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/faq/' + faq_id,
            method: 'DELETE',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterDeleteUrl, data);
    }

    addFAQ(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/faq`,
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    updateFAQ(roaster_id: any, faq_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/faq/${faq_id}`,
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }

    getTeamMembers(roaster_id: any, group) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/' + group,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getHorecaContacts(hrc_id: any) {
        const data = {
            api_call: '/general/hrc/' + hrc_id + '/users/top-contacts',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    addteamMember(roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/users/top-contacts',
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEachEsateCertificates(estate_id: any) {
        const data = {
            api_call: '/general/es/' + estate_id + '/certificates',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterVatDetails(roaster_id: any, vat_data: any): Observable<any> {
        let params = new HttpParams();
        params = params.append('vat_type', vat_data);
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings?' + params,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    addVatDetails(roaster_id: any, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getDefaultCoffeeExperience(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/coffee-experience`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getMrCustomerPendingDetails(roaster_id: any, email_id: any) {
        let params = new HttpParams();
        params = params.append('email', email_id);
        const data = {
            api_call: '/ro/' + roaster_id + '/micro-roasters?' + params,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEstateGallery(estateId: any) {
        const data = {
            api_call: `/general/es/${estateId}/file-manager/all-files?file_module=Gallery`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getShippingInfo(roaster_id: any, estate_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/estates/${estate_id}/shipping-info`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getAddresses(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/addresses`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    addAddresses(roaster_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/addresses`,
            method: 'POST',
            token: this.cookieService.get('Auth'),
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getUserSessions(): Observable<any> {
        const data = {
            api_call: `/users/sessions`,
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        const url = `${environment.apiURL}/es/api`;
        return this.http.post(url, data).pipe(map((res) => res));
    }
    deactivateAccount(): Observable<any> {
        const data = {
            api_call: `/co/users/deactivate`,
            token: this.cookieService.get('Auth'),
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data).pipe(map((res) => res));
    }
    getEachEsateReviews(estate_id: any, params = '') {
        const data = {
            // data['api_call'] = "/general/es/" + estate_id + "/reviews";
            api_call: `/general/es/${estate_id}/reviews/?${params}`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEachEsateReviewsSummary(estate_id: any) {
        const data = {
            api_call: '/general/es/' + estate_id + '/reviews-summary',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    addRoasterShippingDetails(roaster_id: any, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/shipping-types',
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterShippingTypes(roaster_id: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/shipping-types',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateRoasterShippingTypes(roaster_id: any, shipping_id: any, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/shipping-types/' + shipping_id,
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    postDefaultCoffeeExperienceDetail(roaster_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/coffee-experience',
            method: 'POST',
            data: body,
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getGeneralRoasterCertificates(roaster_id: any) {
        const data = {
            api_call: `/general/ro/${roaster_id}/certificates`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    updateMrVat(roaster_id: any, body: any, vat_id: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings/' + vat_id,
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'PUT',
        };
        return this.http.put(this.putUrl, data);
    }
    deleteMrVat(roaster_id: any, vat_id: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roaster_id + '/vat-settings/' + vat_id,
            method: 'DELETE',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterDeleteUrl, data);
    }
    getMrOrdersCoffeeExperience(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/coffee-experience`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    postMrOrdersCoffeeExperience(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/coffee-experience`,
            method: 'POST',
            data: body,
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getHrcOrdersCoffeeExperience(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/hr-orders/${order_id}/coffee-experience`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    postHrcOrdersCoffeeExperience(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/hrc-orders/${order_id}/coffee-experience`,
            method: 'POST',
            data: body,
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getMarketingMaterials(roaster_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/marketing-materials`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    paymentReceiptUpload(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/orders/${order_id}/payment`,
            data: body,
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getRecentActivity(roasterId: any, orderId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/orders/' + orderId + '/events',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getCuppingInviteList(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-invite-list',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getProcessDetails(roasterId: any, harvest_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/harvests/' + harvest_id + '/milling',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getEvaluatorsList(roasterId: any, cupping_report_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/evaluators',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    addPhysicalDefects(roasterId: any, cupping_report_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/physical-defects',
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    updateCuppingType(cupping_report_id: any, body: any): Observable<any> {
        const roaster_id = Number(this.cookieService.get('roaster_id'));
        const data = {
            api_call: `​/ro/${roaster_id}​/cupping-process​/${cupping_report_id}​/cupping-type`,
            token: this.cookieService.get('Auth'),
            method: 'PUT',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    addEvaluators(cupping_report_id: any, body: any) {
        const roaster_id = Number(this.cookieService.get('roaster_id'));
        const data = {
            api_call: `​/ro/${roaster_id}​/cupping-process​/${cupping_report_id}​/evaluators`,
            token: this.cookieService.get('Auth'),
            data: body,
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getPhysicalDefectsList(roasterId: any, cupping_report_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/physical-defects',
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    addCuppingScore(roasterId: any, cupping_report_id, body: any): Observable<any> {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/cupping-score',
            method: 'POST',
            token: this.cookieService.get('Auth'),
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    editAddress(roasterId: any, address_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/addresses/' + address_id,
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getSingleCuppingDetails(roasterId: any, cupping_report_id: any) {
        const data = {
            api_call: `/ro/${roasterId}/cupping-process/${cupping_report_id}`,
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    addRequestSample(roasterId: any, harvest_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/availability/' + harvest_id + '/request-sample',
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }

    viewGcOrderDocuments(roasterId: any, order_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/orders/' + order_id + '/documents',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    addExternalCuppingReport(roasterId: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/external-samples',
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    listCuppingReports(roasterId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/my-cupping-reports',
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.roasterUrl, data);
    }

    listCuppingRequest(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/external-cupping-invite-list',
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getReviewsSummary(roaster_id: any) {
        const data = {
            api_call: '/general/ro/' + roaster_id + '/reviews-summary',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    recupSample(roasterId: any, order_id: any) {
        const data = {
            api_call: `/ro/${roasterId}/orders/${order_id}/re-cup`,
            token: this.cookieService.get('Auth'),
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }

    downloadReportEvaluator(roasterId: any, cupping_report_id: any, filterEval: any) {
        let params = new HttpParams();
        params = params.append('evaluator_ids_in', filterEval);
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/download?' + params,
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    externalRecupSample(roasterId: any, sample_id: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/cupping-process​/external-samples/' + sample_id + '/re-cup',
            token: this.cookieService.get('Auth'),
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    getRecentActivities(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/recent-activity',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getPrebookBatchList(roaster_id: any, estate_id: any, lot_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/estates/' + estate_id + '/lots/' + lot_id + '/prebook-batches',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    addPrebookLots(roasterId: any, batch_id: any, body: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/batches/' + batch_id + '/prebook',
            token: this.cookieService.get('Auth'),
            method: 'POST',
            data: body,
        };
        return this.http.post(this.roasterUrl, data);
    }
    recupSampleRequest(roaster_id: any, external_sample_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/cupping-process/external-samples/${external_sample_id}/re-cup`,
            token: this.cookieService.get('Auth'),
            method: 'POST',
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateStatus(roaster_id: any, cupping_report_id: any, body: any) {
        const data = {
            api_call: `/fc​/${roaster_id}​/cupping-process​/${cupping_report_id}​/status`,
            token: this.cookieService.get('Auth'),
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
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    // Get FAQ Dispute List
    getDisputeFAQList(roaster_id: any) {
        const data = {
            api_call: '/ro/' + roaster_id + '/faq?faq_type=DISPUTE',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    getMrRecentActivity(roasterId: any, orderId: any) {
        const data = {
            api_call: '/ro/' + roasterId + '/mr-orders/' + orderId + '/events',
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    updatePaymentVerify(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/payment/verify`,
            method: 'PUT',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    updatePaymentAfterDelivery(roaster_id: any, order_id: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/payment/after-delivery`,
            method: 'PUT',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
    updateShipmentDetails(roaster_id: any, order_id: any, body: any) {
        const data = {
            api_call: `/ro/${roaster_id}/mr-orders/${order_id}/shipment`,
            method: 'PUT',
            data: body,
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getEstateBrandProfileDetail(estateId, pageSlug) {
        const data = {
            api_call: `/general/es/${estateId}/brand-profile/${pageSlug}`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }

    getNofitication() {
        const organization = 'ro';
        const organizationId = this.cookieService.get('roaster_id');
        const userId = this.cookieService.get('user_id');
        const data = {
            api_call: `/${organization}/${organizationId}/notifications?from_user_id=${userId}&from_org_type=ro&is_read=false`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, data);
    }
}
