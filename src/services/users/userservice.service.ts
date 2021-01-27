// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains all API calls for SEWN-Roaster users.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
    // private roasterDeleteUrl = "https://qa-fed-api.sewnstaging.com/ro/deleteapi";
    // private putUrl = "https://qa-fed-api.sewnstaging.com/ro/putapi";
    // private url = "https://qa-fed-api.sewnstaging.com/api";
    // private deleteUrl = "https://qa-fed-api.sewnstaging.com/deleteapi";

    constructor(private http: HttpClient, public cookieService: CookieService) {}

    //API Function Name : Roaster Login
    //API Description: This API calls helps to get the username and password of the user and send to the backend to check the user is valid or not.

    roasterLogin(body: any) {
        var data = {};
        data['api_call'] = '/users/token';
        data['token'] = 'No';
        data['data'] = {
            email: body.email,
            password: body.password,
        };
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Logged in User Data
    //API Description: This API calls helps to get the user Details of the Logged in User.

    getUsers() {
        var data = {};
        var userId = this.cookieService.get('user_id');
        var roasterId = this.cookieService.get('roaster_id');
        data['api_call'] = '/ro/' + roasterId + '/users/' + userId;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name :Logout
    //API Description: This API calls helps to Logout from the current session.

    logOut() {
        var data = {};
        data['api_call'] = '/users/token';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.deleteUrl, data);
    }

    //API Function Name :Roaster Profile
    //API Description: This API calls helps to Roaster User Profile.

    getRoasterProfile(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/profile';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name :Update Roaster Profile
    //API Description: This API calls helps to update Roaster User Profile.

    updateRoasterProfile(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/profile';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.put(this.putUrl, data);
    }

    //API Function Name : Update Password
    //API Description: This API calls helps to Updated the User Password.

    updatePassword(body: any) {
        var data = {};
        data['api_call'] = '/users/change-password';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Change Password
    //API Description: This API calls helps to Change the User Password.

    changePassword(body: any) {
        var data = {};
        data['api_call'] = '/users/reset-password';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = {
            email: body.email,
            token: body.token,
            password: body.password,
            confirm_password: body.confirm_password,
        };

        return this.http.post(this.url, data);
    }

    //API Function Name : Verify OTP
    //API Description: This API calls helps to genarate OTP and send to the user recovery Email and Verify it.

    verifyOtp(body: any) {
        var data = {};
        data['api_call'] = '/users/verify-otp';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = {
            email: body.email,
            otp: body.otp,
        };
        return this.http.post(this.url, data);
    }

    //API Function Name : Recovery Email
    //API Description: This API calls helps, if the user forgot his password, this API will get the user recovery Email and Verify it.

    recoveryEmail(body: any) {
        var data = {};
        data['api_call'] = '/users/forgot-password';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = {
            email: body.email,
        };
        return this.http.post(this.url, data);
    }

    //API Function Name : Roaster Account
    //API Description: This API calls helps to get Roaster Account profile.

    getRoasterAccount(id: any) {
        var data = {};
        data['api_call'] = '/ro/' + id + '/profile';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Roaster Account
    //API Description: This API calls helps to update the Roaster Account profile.

    updateRoasterAccount(id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + id + '/profile/';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name :ADD Members
    //API Description: This API calls helps to add new users.

    addUserRoaster(body: any) {
        var data = {};
        data['api_call'] = '/users';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Update Edit Member
    //API Description: This API calls helps to Edit userdata Details.

    updateUserData(body: any, roaster_id: any, user_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + user_id;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.put(this.putUrl, data);
    }

    //API Function Name : Roaster User Data
    //API Description: This API calls helps to get the particular Roaster user data.

    getRoasterUserData(roaster_id: any, user_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + user_id;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    searchUser(key: string) {
        var data = {};
        data['api_call'] = '/users/user-list?query=' + key;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Roaster User Last Login
    //API Description: This API calls helps to get the logged in user last login details.
    userLastlogin() {
        var data = {};
        data['api_call'] = '/users/sessions';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    //API Function Name : Privacy Settings
    //API Description: This API call helps to set the Privacy policy terms.

    privacyTerms(body: any) {
        var data = {};
        data['api_call'] = '/users/privacy-terms';
        data['method'] = 'POST';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.url, data);
    }

    //API Function Name : Privacy Settings
    //API Description: This API call helps to get the Privacy policy terms.

    getPrivacyTerms() {
        var data = {};
        data['api_call'] = '/users/privacy-terms';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.url, data);
    }

    // API Function Name : Upload Profile Image API.
    // API Description   : This API call helps to upload the Profile Image.
    uploadProfileImage(formData: any) {
        var httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.profileImageURL, formData, httpOptions);
    }

    // API Function Name : Upload License and Certificates API.
    // API Description   : This API call helps to upload the license and certificates details.
    uploadCertificate(formData: any) {
        var httpOptions = {
            headers: new HttpHeaders({ Accept: 'application/json' }),
        };
        return this.http.post(this.certificatesURL, formData, httpOptions);
    }

    //API Function Name : Certificates
    //API Description: This API call helps to get the Certificates.

    getCertificates(roaster_id: any, userId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + userId + '/certificates';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Certificates
    //API Description: This API call helps to get the Certificates.

    deleteCertificate(roaster_id: any, userId: any, certificateId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + userId + '/certificates/' + certificateId;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterDeleteUrl, data);
    }

    //API Function Name :Profile Image Delete
    //API Description: This API calls helps to delete the profile Image of the user.

    deleteProfileImage(userId: any, roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/users/' + userId + '/profile-image';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterDeleteUrl, data);
    }

    //API Function Name : Language Setting
    //API Description: This API call helps to get the Language of the Roaster.

    getLanguageSetting(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/settings';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Language Setting
    //API Description: This API calls helps to update the Roaster Language Setting.

    updateLanguageSetting(body: any, id: any) {
        var data = {};
        data['api_call'] = '/ro/' + id + '/settings';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Certificates
    //API Description: This API call helps to get the Certificates.

    getCompanyCertificates(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/certificates';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Certificates
    //API Description: This API call helps to get the Certificates.

    deleteCompanyCertificate(roaster_id: any, certificateId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/certificates/' + certificateId;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterDeleteUrl, data);
    }

    //API Function Name : Preferences Settings
    //API Description: This API call helps to set the Preferences terms.

    updatePreferences(roasterId: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/users/preferences';
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.put(this.putUrl, data);
    }

    //API Function Name : Preferences Settings
    //API Description: This API call helps to get the Preferences terms.

    getPreferences(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/users/preferences';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    //API Function Name: getLanguage
    //API Description: Get the Language based on user's signin and apply all application static text
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
        var data = {};
        data['api_call'] = '/ro/users/' + userId + '/attach-image/' + fileId;
        data['token'] = token;
        data['method'] = 'POST';
        return this.http.post(this.roasterUrl, data);
    }
    // API Function Name : Onboarding - Personal Details addition API.
    // API Description   : This API call helps to add Personal details of the user.
    personalDetails(body: any) {
        var data = {};
        data['api_call'] = '/invite/users';
        data['data'] = body;
        data['token'] = '';
        return this.http.post(this.inviteUrl, data);
    }
    // API Function Name : Roaster Onboarding - Roaster Account addition API.
    // API Description   : This API call helps to add Roaster Account user.
    roasterDetails(body: any) {
        var data = {};
        data['api_call'] = '/ro/onboard';
        data['data'] = body;
        data['token'] = this.cookieService.get('authorization_key');
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Certificate Types
    //API Description: This API call helps to get the Certificate types.

    getCertificateTypes() {
        var data = {};
        data['api_call'] = '/general/certificate-types';
        data['method'] = 'GET';
        data['token'] = '';
        return this.http.post(this.roasterUrl, data);
    }
    addConverseLanguage(body: any) {
        var data = {};
        data['api_call'] = '/users/converse-languages';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    getConverseLanguage() {
        var data = {};
        data['api_call'] = '/users/converse-languages';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    sendMicroRoasterInvite(roasterId: any, email: any, name: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/micro-roasters/invite-token';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = {
            email: email,
            micro_roaster_name: name,
        };
        return this.http.post(this.roasterUrl, data);
    }
    sendHorecaInvite(roasterId: any, email: any, name: any, type: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/hrc/invite-token';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = {
            email: email,
            horeca_name: name,
            horeca_type: type,
        };

        return this.http.post(this.roasterUrl, data);
    }

    sendUrlToEmail(body: any) {
        var data = body;
        return this.http.post(this.sendEmailURL, data);
    }
    getAvailableEstates(roasterId: any, queryParams = '') {
        var data = {};
        data['api_call'] = `/ro/${roasterId}/estates/availability${queryParams}`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getAvailableEstateList(roasterId: any, estateId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/estates/' + estateId;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    public getUserPermissions(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/users/permissions';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getUserPermissionPromise(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/users/permissions';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
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
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/availability/gc/' + harvest_id;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getRoasterLots(roaster_id: any, estate_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/estates/' + estate_id + '/lots';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getRoasterLotDetails(roaster_id: any, estate_id: any, lot_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/estates/' + estate_id + '/lots/' + lot_id;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name : Green Coffee availability Detail Page
    //API Description: This API call helps details of green coffee availability.
    getGreenCoffeeDetails(roaster_id: any, harvest_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/availability/gc/' + harvest_id;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name :  Estate Land lots
    //API Description: This API call helps to list land lots of an estate.
    getavailableLots(roaster_id: any, estate_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/estates/' + estate_id + '/lots';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    //API Function Name :  Flavour Profile
    //API Description: This API call helps get list of flavour profile.
    getFlavourProfile() {
        var data = {};
        data['api_call'] = '/general/flavour-profile';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    updateLearnDetails(roaster_id: any, body: any, slug: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/brand-profile/' + slug;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.put(this.putUrl, data);
    }

    updateHomeDetails(roaster_id: any, body: any, slug: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/brand-profile/' + slug;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.put(this.putUrl, data);
    }
    addRoastingProfile(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasting-profile`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'POST';
        return this.http.post(this.roasterUrl, data);
    }
    getRoastingProfileDetail(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasting-profile/${id}`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }
    updateRoastingProfileDetail(roaster_id: any, id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasting-profile/${id}`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'PUT';
        return this.http.put(this.putUrl, data);
    }
    deleteRoastingProfile(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasting-profile/${id}`;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterDeleteUrl, data);
    }

    getGreenCoffee(roaster_id: any, detailestateId: any) {
        let params = new HttpParams();
        params = params.append('estate_id', detailestateId);
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/availability/gc?' + params;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getEstateContacts(estate_id: any) {
        var data = {};
        data['api_call'] = '/general/es/' + estate_id + '/users/top-contacts';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getEstateCertificates() {
        var data = {};
        data['api_call'] = '/general/certificate-types/';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    updateRoastedBatchDetail(roaster_id: any, id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasted-batches/${id}`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'PUT';
        return this.http.put(this.putUrl, data);
    }
    getRoastedBatchDetail(roaster_id: any, id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasted-batches/${id}`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    addRoastedBatches(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/roasted-batches`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'POST';
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterFlavourProfile(roaster_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/flavour-profile`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getPageDetails(roaster_id: any, slug: any) {
        // let params = new HttpParams();
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/brand-profile/' + slug;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getFileDetails(roaster_id: any, file_id: any) {
        // let params = new HttpParams();
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/file-manager/files/' + file_id;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data).pipe(map((response) => response['result']));
    }
    getMicroDetails(roaster_id: any, micro_roaster_id: any) {
        // let params = new HttpParams();
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getFAQList(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/faq';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getHorecaDetails(roaster_id: any, hrc_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/hrc/' + hrc_id;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    updateMicroDiscount(roaster_id: any, micro_roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/discounts';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    updateHorecaDiscount(roaster_id: any, hrc_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/hrc/' + hrc_id + '/discounts';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'PUT';
        return this.http.post(this.roasterUrl, data);
    }
    updateHorecaEnable(roaster_id: any, hrc_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/hrc/' + hrc_id + '/enable';
        data['token'] = this.cookieService.get('Auth');
        return this.http.put(this.putUrl, data);
    }
    updateHorecaDisable(roaster_id: any, hrc_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/hrc/' + hrc_id + '/disable';
        data['token'] = this.cookieService.get('Auth');
        return this.http.put(this.putUrl, data);
    }
    updateMicroRoasterEnable(roaster_id: any, micro_roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/enable';
        data['token'] = this.cookieService.get('Auth');
        return this.http.put(this.putUrl, data);
    }
    updateMicroRoasterDisable(roaster_id: any, micro_roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id + '/disable';
        data['token'] = this.cookieService.get('Auth');
        return this.http.put(this.putUrl, data);
    }
    deleteMicroRoaster(roaster_id: any, micro_roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters/' + micro_roaster_id;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterDeleteUrl, data);
    }
    getMicroroasterCertificates(micro_roaster_id: any) {
        var data = {};
        data['api_call'] = '/general/mr/' + micro_roaster_id + '/certificates';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getMicroroasterContacts(micro_roaster_id: any) {
        var data = {};
        data['api_call'] = '/general/mr/' + micro_roaster_id + '/users/top-contacts';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    deleteFAQ(roaster_id: any, faq_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/faq/' + faq_id;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterDeleteUrl, data);
    }

    addFAQ(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/faq`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    updateFAQ(roaster_id: any, faq_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/faq/${faq_id}`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'PUT';
        return this.http.put(this.putUrl, data);
    }

    getTeamMembers(roaster_id: any, group) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/' + group;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getHorecaContacts(hrc_id: any) {
        var data = {};
        data['api_call'] = '/general/hrc/' + hrc_id + '/users/top-contacts';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    addteamMember(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/users/top-contacts';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    getEachEsateCertificates(estate_id: any) {
        var data = {};
        data['api_call'] = '/general/es/' + estate_id + '/certificates';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterVatDetails(roaster_id: any, vat_data: any) {
        var data = {};
        let params = new HttpParams();
        params = params.append('vat_type', vat_data);
        data['api_call'] = '/ro/' + roaster_id + '/vat-settings?' + params;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    addVatDetails(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/vat-settings';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    getCustomerPendingDetails(roaster_id: any, email_id: any) {
        var data = {};
        let params = new HttpParams();
        params = params.append('email', email_id);
        data['api_call'] = '/ro/' + roaster_id + '/hrc?' + params;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getDefaultCoffeeExperience(roaster_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/coffee-experience`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getMrCustomerPendingDetails(roaster_id: any, email_id: any) {
        var data = {};
        let params = new HttpParams();
        params = params.append('email', email_id);
        data['api_call'] = '/ro/' + roaster_id + '/micro-roasters?' + params;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getEstateGallery(estateId: any) {
        var data = {};
        data['api_call'] = `/general/es/${estateId}/file-manager/all-files?file_module=Gallery`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getShippingInfo(roaster_id: any, estate_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/estates/${estate_id}/shipping-info`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getAddresses(roaster_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/addresses`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    addAddresses(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/addresses`;
        data['method'] = 'POST';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    getUserSessions(): Observable<any> {
        const data = {};
        data['api_call'] = `/users/sessions`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        const url = `${environment.apiURL}/es/api`;
        return this.http.post(url, data).pipe(map((res) => res));
    }
    deactivateAccount(): Observable<any> {
        const data = {};
        data['api_call'] = `/co/users/deactivate`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        return this.http.put(this.putUrl, data).pipe(map((res) => res));
    }
    getEachEsateReviews(estate_id: any, params = '') {
        var data = {};
        // data['api_call'] = "/general/es/" + estate_id + "/reviews";
        data['api_call'] = `/general/es/${estate_id}/reviews/?${params}`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getEachEsateReviewsSummary(estate_id: any) {
        var data = {};
        data['api_call'] = '/general/es/' + estate_id + '/reviews-summary';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    addRoasterShippingDetails(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/shipping-types';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    getRoasterShippingTypes(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/shipping-types';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    updateRoasterShippingTypes(roaster_id: any, shipping_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/shipping-types/' + shipping_id;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'PUT';
        return this.http.put(this.putUrl, data);
    }
    getSocialMediaPosts(roaster_id, type_in: any) {
        let params = new HttpParams();
        params = params.append('file_module', 'Social-Media');
        params = params.append('type_in', type_in);
        var data = {};
        data['api_call'] = `/general/ro/${roaster_id}/file-manager/all-files?${params}`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    postDefaultCoffeeExperienceDetail(roaster_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/coffee-experience';
        data['method'] = 'POST';
        data['data'] = body;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getGeneralRoasterCertificates(roaster_id: any) {
        var data = {};
        data['api_call'] = `/general/ro/${roaster_id}/certificates`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    updateMrVat(roaster_id: any, body: any, vat_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/vat-settings/' + vat_id;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'PUT';
        return this.http.put(this.putUrl, data);
    }
    deleteMrVat(roaster_id: any, vat_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/vat-settings/' + vat_id;
        data['method'] = 'DELETE';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterDeleteUrl, data);
    }
    getMrOrdersCoffeeExperience(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/mr-orders/${order_id}/coffee-experience`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    postMrOrdersCoffeeExperience(roaster_id: any, order_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/mr-orders/${order_id}/coffee-experience`;
        data['method'] = 'POST';
        data['data'] = body;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getHrcOrdersCoffeeExperience(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/hr-orders/${order_id}/coffee-experience`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    postHrcOrdersCoffeeExperience(roaster_id: any, order_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/hrc-orders/${order_id}/coffee-experience`;
        data['method'] = 'POST';
        data['data'] = body;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getMarketingMaterials(roaster_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/marketing-materials`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    paymentReceiptUpload(roaster_id: any, order_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/orders/${order_id}/payment`;
        // data["method"] = "PUT";
        data['data'] = body;
        data['token'] = this.cookieService.get('Auth');
        return this.http.put(this.putUrl, data);
    }
    addReviewOrder(roaster_id: any, orderId: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/orders/' + orderId + '/reviews';
        data['method'] = 'POST';
        data['data'] = body;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getRecentActivity(roasterId: any, orderId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/orders/' + orderId + '/events';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getCuppingInviteList(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-invite-list';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getProcessDetails(roasterId: any, harvest_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/harvests/' + harvest_id + '/milling';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getEvaluatorsList(roasterId: any, cupping_report_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/evaluators';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    addPhysicalDefects(roasterId: any, cupping_report_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/physical-defects';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    updateCuppingType(cupping_report_id: any, body: any): Observable<any> {
        const data = {};
        const roaster_id = parseInt(this.cookieService.get('roaster_id'));
        data['api_call'] = `​/ro/${roaster_id}​/cupping-process​/${cupping_report_id}​/cupping-type`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    addEvaluators(cupping_report_id: any, body: any) {
        const data = {};
        const roaster_id = parseInt(this.cookieService.get('roaster_id'));
        data['api_call'] = `​/ro/${roaster_id}​/cupping-process​/${cupping_report_id}​/evaluators`;
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        data['method'] = 'POST';
        return this.http.post(this.roasterUrl, data);
    }
    getPhysicalDefectsList(roasterId: any, cupping_report_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/physical-defects';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    addCuppingScore(roasterId: any, cupping_report_id, body: any): Observable<any> {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/cupping-score';
        data['method'] = 'POST';
        data['token'] = this.cookieService.get('Auth');
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    editAddress(roasterId: any, address_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/addresses/' + address_id;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    getCuppingScore(roasterId: any, cupping_report_id: any, evaluator_ids: any) {
        let params = new HttpParams();
        params = params.append('evaluator_ids', evaluator_ids);
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/cupping-score';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getSingleCuppingDetails(roasterId: any, cupping_report_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roasterId}/cupping-process/${cupping_report_id}`;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    addRequestSample(roasterId: any, harvest_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/availability/' + harvest_id + '/request-sample';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }

    viewGcOrderDocuments(roasterId: any, order_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/orders/' + order_id + '/documents';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    addExternalCuppingReport(roasterId: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/external-samples';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    listCuppingReports(roasterId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/my-cupping-reports';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    listCuppingRequest(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/external-cupping-invite-list';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'GET';
        return this.http.post(this.roasterUrl, data);
    }

    getStats(roaster_id: any, query: any = {}) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/stats?sections=${query.sections || ''}&customer_type=${
            query.customer_type || ''
        }&chart_type=${query.chart_type || ''}&date_from=${query.date_from || ''}`;
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    getReviewsSummary(roaster_id: any) {
        var data = {};
        data['api_call'] = '/general/ro/' + roaster_id + '/reviews-summary';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    recupSample(roasterId: any, order_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roasterId}/orders/${order_id}/re-cup`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        return this.http.post(this.roasterUrl, data);
    }

    downloadReportEvaluator(roasterId: any, cupping_report_id: any, filterEval: any) {
        let data = {};
        let params = new HttpParams();
        params = params.append('evaluator_ids_in', filterEval);
        data['api_call'] = '/ro/' + roasterId + '/cupping-process/' + cupping_report_id + '/download?' + params;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    externalRecupSample(roasterId: any, sample_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/cupping-process​/external-samples/' + sample_id + '/re-cup';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        return this.http.post(this.roasterUrl, data);
    }
    getRecentActivities(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/recent-activity';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getPrebookBatchList(roaster_id: any, estate_id: any, lot_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/estates/' + estate_id + '/lots/' + lot_id + '/prebook-batches';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    addPrebookLots(roasterId: any, batch_id: any, body: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/batches/' + batch_id + '/prebook';
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    recupSampleRequest(roaster_id: any, external_sample_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/cupping-process/external-samples/${external_sample_id}/re-cup`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'POST';
        return this.http.post(this.roasterUrl, data);
    }
    updateStatus(roaster_id: any, cupping_report_id: any, body: any) {
        var data = {};
        data['api_call'] = `/fc​/${roaster_id}​/cupping-process​/${cupping_report_id}​/status`;
        data['token'] = this.cookieService.get('Auth');
        data['method'] = 'PUT';
        data['data'] = body;
        return this.http.post(this.roasterUrl, data);
    }
    downloadReport(roaster_id: any, cupping_report_id: any, evaluator_ids: any) {
        var data = {};
        let params = new HttpParams();
        params = params.append('evaluator_ids_in', evaluator_ids);
        data['api_call'] = `/fc/${roaster_id}/cupping-process/${cupping_report_id}/download?${params}`;
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    //Get FAQ Dispute List
    getDisputeFAQList(roaster_id: any) {
        var data = {};
        data['api_call'] = '/ro/' + roaster_id + '/faq?faq_type=DISPUTE';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    getMrRecentActivity(roasterId: any, orderId: any) {
        var data = {};
        data['api_call'] = '/ro/' + roasterId + '/mr-orders/' + orderId + '/events';
        data['method'] = 'GET';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }

    updatePaymentVerify(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/mr-orders/${order_id}/payment/verify`;
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    updatePaymentAfterDelivery(roaster_id: any, order_id: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/mr-orders/${order_id}/payment/after-delivery`;
        data['method'] = 'PUT';
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.roasterUrl, data);
    }
    updateShipmentDetails(roaster_id: any, order_id: any, body: any) {
        var data = {};
        data['api_call'] = `/ro/${roaster_id}/mr-orders/${order_id}/shipment`;
        data['method'] = 'PUT';
        data['data'] = body;
        data['token'] = this.cookieService.get('Auth');
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
}
