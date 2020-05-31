import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // private roasterUrl = "http://15.206.153.210:8000/ro/api";
  // private roasterDeleteUrl = "http://15.206.153.210:8000/ro/deleteapi";
  // private putUrl = "http://15.206.153.210:8000/ro/putapi";
  // private url = "http://15.206.153.210:8000/api";
  // private deleteUrl = "http://15.206.153.210:8000/deleteapi";

  private roasterUrl = "https://qa-fed-api.sewnstaging.com/ro/api";
  private roasterDeleteUrl = "https://qa-fed-api.sewnstaging.com/ro/deleteapi";
  private putUrl = "https://qa-fed-api.sewnstaging.com/ro/putapi";
  private url = "https://qa-fed-api.sewnstaging.com/api";
  private deleteUrl = "https://qa-fed-api.sewnstaging.com/deleteapi";


  constructor(private http : HttpClient, private cookieService : CookieService) { }

  roasterLogin(body : any){
    var data = {};
    data['api_call'] = "/users/token";
    data['token'] = "No"
    data['data'] = {
      "email" : body.email,
      "password": body.password
    };
    return this.http.post(this.roasterUrl, data);
  }

  getUsers(){
    var data = {};
    var userId = this.cookieService.get('user_id');
    var roasterId = this.cookieService.get('roaster_id');
     data['api_call'] = "/ro/"+roasterId+"/users/"+userId;
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
   };

   logOut(){
    var data = {};
    data['api_call'] = "/users/token";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.deleteUrl, data);
   };

  getRoasterProfile(){
    var data = {};
    data['api_call'] = "/ro/users/profile";
    data['token'] = this.cookieService.get('Auth')
    
    return this.http.post(this.roasterUrl, data);
  }
  updatePassword(body: any) {
    var data = {};
    data['api_call'] = "/users/change-password";
    data['token'] = this.cookieService.get("Auth");
    data["data"] = body;
    return this.http.post(this.url, data);
  }


  changePassword(body : any){
    var data = {};
    data['api_call'] = "/users/reset-password";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = {
      "email" : body.email,
      "token" : body.token,
      "password" : body.password,
      "confirm_password" : body.confirm_password
    };

    return this.http.post(this.url,data);
  }

  verifyOtp(body : any){
    var data = {};
    data['api_call'] = "/users/verify-otp";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = {
      "email" : body.email,
      "otp" : body.otp
    };
    return this.http.post(this.url,data);
  }


recoveryEmail(body : any) {
  var data = {};
  data['api_call'] = "/users/forgot-password";
  data['token'] = this.cookieService.get('Auth');
  data['data'] = {
    "email" : body.email
  };
  return this.http.post(this.url,data);
}

getRoasterAccount(id:any){
  var data = {};
  data['api_call'] = "/ro/"+id+"/profile/";
  data['token'] = this.cookieService.get('Auth');
  data["method"] = "GET";
  return this.http.post(this.roasterUrl, data);
}
addUserRoaster(body:any){
  var data = {};
  data['api_call'] = "/users";
  data['token'] = this.cookieService.get('Auth');
  data['data'] = body;
  return this.http.post(this.roasterUrl,data);
}

updateUserData(body:any,roaster_id:any,user_id:any){
  var data = {};
  data['api_call'] = "/ro/"+roaster_id+"/users/"+user_id;
  data['token'] = this.cookieService.get('Auth');
  data['method'] = "PUT";
  data['data'] = body;
  return this.http.put(this.putUrl,data);
}

getRoasterUserData(roaster_id:any,user_id:any){
  var data = {};
  data['api_call'] = "/ro/"+roaster_id+"/users/"+user_id;
  data['token'] = this.cookieService.get('Auth');
  data['method'] = "GET";
  return this.http.post(this.roasterUrl,data);
}


}