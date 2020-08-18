// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains all API calls for SEWN-Roaster users.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  //API call URL's
  private roasterUrl = environment.apiURL+"/ro/api";
  private roasterDeleteUrl = environment.apiURL+"/ro/deleteapi";
  private putUrl = environment.apiURL+"/ro/putapi";
  private url = environment.apiURL+"/api";
  private deleteUrl = environment.apiURL+"/deleteapi";
  private certificatesURL = environment.apiURL+"/ro/certificates";
  private profileImageURL = environment.apiURL+"/ro/uploadfiles";

  // private roasterUrl = "/ro/api";
  // private roasterDeleteUrl = "https://qa-fed-api.sewnstaging.com/ro/deleteapi";
  // private putUrl = "https://qa-fed-api.sewnstaging.com/ro/putapi";
  // private url = "https://qa-fed-api.sewnstaging.com/api";
  // private deleteUrl = "https://qa-fed-api.sewnstaging.com/deleteapi";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //API Function Name : Roaster Login
  //API Description: This API calls helps to get the username and password of the user and send to the backend to check the user is valid or not.  

  roasterLogin(body: any) {
    var data = {};
    data['api_call'] = "/users/token";
    data['token'] = "No"
    data['data'] = {
      "email": body.email,
      "password": body.password
    };
    return this.http.post(this.roasterUrl, data);
  }

  //API Function Name : Logged in User Data
  //API Description: This API calls helps to get the user Details of the Logged in User.

  getUsers() {
    var data = {};
    var userId = this.cookieService.get('user_id');
    var roasterId = this.cookieService.get('roaster_id');
    data['api_call'] = "/ro/" + roasterId + "/users/" + userId;
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  };

  //API Function Name :Logout
  //API Description: This API calls helps to Logout from the current session.

  logOut() {
    var data = {};
    data['api_call'] = "/users/token";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.deleteUrl, data);
  };

  //API Function Name :Roaster Profile
  //API Description: This API calls helps to Roaster User Profile.
  
  getRoasterProfile(roaster_id : any) {
    var data = {};
    data['api_call'] = "/ro/"+ roaster_id+"/users/profile";
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "GET";
    return this.http.post(this.roasterUrl, data);
  }

    //API Function Name :Update Roaster Profile
  //API Description: This API calls helps to update Roaster User Profile.
  
  updateRoasterProfile(roaster_id : any,body : any) {
    var data = {};
    data['api_call'] = "/ro/"+ roaster_id+"/users/profile";
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "PUT";
    data['data'] = body;
    return this.http.put(this.putUrl, data);
  }

  //API Function Name : Update Password
  //API Description: This API calls helps to Updated the User Password.

  updatePassword(body: any) {
    var data = {};
    data['api_call'] = "/users/change-password";
    data['token'] = this.cookieService.get("Auth");
    data["data"] = body;
    return this.http.post(this.url, data);
  }

  //API Function Name : Change Password
  //API Description: This API calls helps to Change the User Password.

  changePassword(body: any) {
    var data = {};
    data['api_call'] = "/users/reset-password";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = {
      "email": body.email,
      "token": body.token,
      "password": body.password,
      "confirm_password": body.confirm_password
    };

    return this.http.post(this.url, data);
  }

  //API Function Name : Verify OTP
  //API Description: This API calls helps to genarate OTP and send to the user recovery Email and Verify it.

  verifyOtp(body: any) {
    var data = {};
    data['api_call'] = "/users/verify-otp";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = {
      "email": body.email,
      "otp": body.otp
    };
    return this.http.post(this.url, data);
  }

  //API Function Name : Recovery Email
  //API Description: This API calls helps, if the user forgot his password, this API will get the user recovery Email and Verify it.

  recoveryEmail(body: any) {
    var data = {};
    data['api_call'] = "/users/forgot-password";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = {
      "email": body.email
    };
    return this.http.post(this.url, data);
  }

  //API Function Name : Roaster Account
  //API Description: This API calls helps to get Roaster Account profile.

  getRoasterAccount(id: any) {
    var data = {};
    data['api_call'] = "/ro/" + id + "/profile/";
    data['token'] = this.cookieService.get('Auth');
    data["method"] = "GET";
    return this.http.post(this.roasterUrl, data);
  }

    //API Function Name : Roaster Account
  //API Description: This API calls helps to update the Roaster Account profile.

  updateRoasterAccount(id: any,body: any) {
    var data = {};
    data['api_call'] = "/ro/" + id + "/profile/";
    data['token'] = this.cookieService.get('Auth');
    data["method"] = "PUT";
    data["data"] = body;
    return this.http.post(this.roasterUrl, data);
  }
  

  //API Function Name :ADD Members
  //API Description: This API calls helps to add new users.

  addUserRoaster(body: any) {
    var data = {};
    data['api_call'] = "/users";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = body;
    return this.http.post(this.roasterUrl, data);
  }

  //API Function Name : Update Edit Member
  //API Description: This API calls helps to Edit userdata Details.

  updateUserData(body: any, roaster_id: any, user_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + user_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "PUT";
    data['data'] = body;
    return this.http.put(this.putUrl, data);
  }

  //API Function Name : Roaster User Data
  //API Description: This API calls helps to get the particular Roaster user data.

  getRoasterUserData(roaster_id: any, user_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + user_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "GET";
    return this.http.post(this.roasterUrl, data);
  }

  searchUser(key: string){
    var data = {};
    data['api_call'] = "/users/user-list?query="+key;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "GET";
    return this.http.post(this.roasterUrl, data);
  }

  //API Function Name : Roaster User Last Login
  //API Description: This API calls helps to get the logged in user last login details.
  userLastlogin() {
    var data = {};
    data["api_call"] = "/users/sessions";
    data["method"] = "GET";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.url, data);
  }

   //API Function Name : Privacy Settings
  //API Description: This API call helps to set the Privacy policy terms.

  privacyTerms(body: any) {
    var data = {};
    data['api_call'] = "/users/privacy-terms";
    data['method'] = "POST";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = body;
    return this.http.post(this.url, data);
  }

    //API Function Name : Privacy Settings
  //API Description: This API call helps to get the Privacy policy terms.

  getPrivacyTerms() {
    var data = {};
    data["api_call"] = "/users/privacy-terms";
    data["method"] = "GET";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.url, data);
  }

    // API Function Name : Upload Profile Image API.
  // API Description   : This API call helps to upload the Profile Image.
  uploadProfileImage(formData: any) {
    var httpOptions = {
      headers: new HttpHeaders({ Accept: "application/json" })
    };
    return this.http.post(this.profileImageURL, formData, httpOptions);
  }

    // API Function Name : Upload License and Certificates API.
  // API Description   : This API call helps to upload the license and certificates details.
  uploadCertificate(formData: any) {
    var httpOptions = {
      headers: new HttpHeaders({ Accept: "application/json" })
    };
    return this.http.post(this.certificatesURL, formData, httpOptions);
  }


      //API Function Name : Certificates 
  //API Description: This API call helps to get the Certificates.

  getCertificates(roaster_id : any, userId : any) {
    var data = {};
    data["api_call"] = "/ro/" + roaster_id + "/users/" + userId +"/certificates";
    data["method"] = "GET";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.roasterUrl, data);
  }

       //API Function Name : Certificates 
  //API Description: This API call helps to get the Certificates.

  deleteCertificate(roaster_id : any,userId : any,certificateId : any) {
    var data = {};
    data["api_call"] = "/ro/" + roaster_id + "/users/" + userId +"/certificates/"+ certificateId;
    data["method"] = "DELETE";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.roasterDeleteUrl, data);
  }


  //API Function Name :Profile Image Delete
  //API Description: This API calls helps to delete the profile Image of the user.

  deleteProfileImage(userId : any , roasterId : any) {
    var data = {};
    data['api_call'] = "ro/"+roasterId+"/users/"+userId+"/profile-image";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.roasterDeleteUrl, data);
  };

       //API Function Name : Language Setting 
  //API Description: This API call helps to get the Language of the Roaster.

  getLanguageSetting(roaster_id : any) {
    var data = {};
    data["api_call"] = "/ro/" + roaster_id + "/settings";
    data["method"] = "GET";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.roasterUrl, data);
  }

    //API Function Name : Language Setting
  //API Description: This API calls helps to update the Roaster Language Setting.

  updateLanguageSetting(body: any,id: any) {
    var data = {};
    data['api_call'] = "/ro/" + id + "/settings";
    data['token'] = this.cookieService.get('Auth');
    data["method"] = "PUT";
    data["data"] = body;
    return this.http.post(this.roasterUrl, data);
  }

       //API Function Name : Certificates 
  //API Description: This API call helps to get the Certificates.

  getCompanyCertificates(roaster_id : any) {
    var data = {};
    data["api_call"] = "/ro/" + roaster_id +"/certificates";
    data["method"] = "GET";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.roasterUrl, data);
  }

       //API Function Name : Certificates 
  //API Description: This API call helps to get the Certificates.

  deleteCompanyCertificate(roaster_id : any,certificateId : any) {
    var data = {};
    data["api_call"] = "/ro/" + roaster_id + "/certificates/"+ certificateId;
    data["method"] = "DELETE";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.roasterDeleteUrl, data);
  }

   //API Function Name : Preferences Settings
  //API Description: This API call helps to set the Preferences terms.

  updatePreferences(roasterId:any,body: any) {
    var data = {};
    data['api_call'] = "/ro/"+roasterId+"/users/preferences";
    data['method'] = "PUT";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = body;
    return this.http.put(this.putUrl, data);
  }

    //API Function Name : Preferences Settings
  //API Description: This API call helps to get the Preferences terms.

  getPreferences(roasterId:any) {
    var data = {};
    data["api_call"] = "/ro/"+roasterId+"/users/preferences";
    data["method"] = "GET";
    data["token"] = this.cookieService.get("Auth");
    return this.http.post(this.roasterUrl, data);
  }
  

}