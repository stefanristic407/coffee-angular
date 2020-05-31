import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoasterserviceService {
  // private url = "http://15.206.153.210:8000/ro/api";
  // private deleteUrl = "http://15.206.153.210:8000/ro/deleteapi";
  // private putUrl = "http://15.206.153.210:8000/ro/putapi";

  private url = "https://qa-fed-api.sewnstaging.com/ro/api";
  private deleteUrl = "https://qa-fed-api.sewnstaging.com/ro/deleteapi";
  private putUrl = "https://qa-fed-api.sewnstaging.com/ro/putapi";

  constructor(private http : HttpClient,private cookieService : CookieService) { }
  
  getRoles(id:any){

    var data = {};
    data['api_call'] = "/ro/"+id+"/roles";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
   };
   deleteRoles(roaster_id:any,id: any){
    var data = {};
    console.log(this.deleteUrl);
    data['api_call'] = "/ro/"+roaster_id+"/roles/" + id;
    data['token'] = this.cookieService.get('Auth');
    console.log(data);
    return this.http.post(this.deleteUrl, data);
  }
  getRoasterUsers(id:any){
    var data = {};
    data['api_call'] = "/ro/"+id+"/users";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  }
  createRole(body : any){
    var data = {};
    data['api_call'] = "/ro/"+body.id+"/roles";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = {
      "name" : body.name
    };
    return this.http.post(this.url, data);
   };

   getRoasterPermissions(id:any){
    var data = {};
    data['api_call'] = "/ro/"+id+"/permissions";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
   }
   getRoasterRoleName(id:any,roaster_id:any){
    var data = {};
    data['api_call'] = "/ro/"+roaster_id+"/roles/" + id;
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
   }
   updateRoasterRoleName(body:any,roaster_id:any){
    var data = {};
    data['api_call'] = "/ro/"+roaster_id+"/roles/"+ body.roleId;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "PUT";
    data['data'] = {
      'name' : body.name
    }
    return this.http.post(this.url, data);
   }
   getRolePermissions(roaster_id: any, roleid: any){
    var data = {};
    data['api_call'] = "/ro/"+roaster_id+"/roles/" + roleid + "/permissions";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
   }

   assignRolePermissions(body:any,roleId:any,roaster_id:any){
    var data = {};
    data['api_call'] = "/ro/"+roaster_id+"/roles/"+roleId+"/permissions";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = body;
    return this.http.post(this.url, data);
   }

   getUserBasedRoles(roaster_id:any,user_id:any){
    var data = {};
    data['api_call'] = "/ro/"+roaster_id+"/users/"+user_id+"/roles";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
   }

   deleteRoasterUser(roaster_id:any,user_id:any){
    var data = {};
    data['api_call'] = "/ro/"+roaster_id+"/users/"+user_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "DELETE";
    return this.http.post(this.url, data);
   }
   assignUserBasedUserRoles(roaster_id:any,role_id:any,user_id:any){
     var data = {};
     data['api_call'] = "/ro/"+roaster_id+"/users/"+user_id+"/roles/"+role_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "POST";
    return this.http.post(this.url, data);
   }
   deleteRoasterUserRole(roaster_id:any,role_id: any, user_id:any){
     
    var data = {};
    data['api_call'] = "/ro/"+roaster_id+"/users/"+user_id+"/roles/"+role_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "DELETE";
    return this.http.post(this.url, data);
   }

    /******Users Apis******/
  enableAdminUser(roaster_id:any,enableUserId:any){
    var data={};
    data['api_call'] = "/ro/"+roaster_id+"/users/"+enableUserId+"/enable";
    data['method'] = "PUT";
    data['token'] = this.cookieService.get('Auth');
    return this.http.put(this.putUrl,data);
  }
  disableAdminUsers(roaster_id:any,disableUserId:any){
    var data={};
    data['api_call'] = "/ro/"+roaster_id+"/users/"+disableUserId+"/disable";
    data['method'] = "PUT";
    data['token'] = this.cookieService.get('Auth');
    return this.http.put(this.putUrl,data);
  }
}
