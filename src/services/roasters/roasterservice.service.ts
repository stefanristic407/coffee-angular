// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains all API calls for SEWN-Roaster Roles and User Management.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoasterserviceService {
  //API call URL's
  private url = "http://15.206.153.210:8000/ro/api";
  private deleteUrl = "http://15.206.153.210:8000/ro/deleteapi";
  private putUrl = "http://15.206.153.210:8000/ro/putapi";

  // private url = "https://qa-fed-api.sewnstaging.com/ro/api";
  // private deleteUrl = "https://qa-fed-api.sewnstaging.com/ro/deleteapi";
  // private putUrl = "https://qa-fed-api.sewnstaging.com/ro/putapi";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //API Function Name : Role List
  //API Description: This API calls helps to get all roles to the user.

  getRoles(id: any) {
    var data = {};
    data['api_call'] = "/ro/" + id + "/roles";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  };

  //API Function Name : Delete Role
  //API Description: This API calls helps to delete the role.

  deleteRoles(roaster_id: any, id: any) {
    var data = {};
    console.log(this.deleteUrl);
    data['api_call'] = "/ro/" + roaster_id + "/roles/" + id;
    data['token'] = this.cookieService.get('Auth');
    console.log(data);
    return this.http.post(this.deleteUrl, data);
  }

  //API Function Name : Roaster User Data
  //API Description: This API calls helps to get the all Roaster user data.

  getRoasterUsers(id: any) {
    var data = {};
    data['api_call'] = "/ro/" + id + "/users";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  }

  //API Function Name : Create Role
  //API Description: This API calls helps to create a role to the user.

  createRole(body: any) {
    var data = {};
    data['api_call'] = "/ro/" + body.id + "/roles";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = {
      "name": body.name
    };
    return this.http.post(this.url, data);
  };

  //API Function Name : roaster permissions
  //API Description: This API calls helps to get the  permissions of the particular Roaster.

  getRoasterPermissions(id: any) {
    var data = {};
    data['api_call'] = "/ro/" + id + "/permissions";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  }

  //API Function Name : Role Name
  //API Description: This API calls helps to get the Role name of the Selected role.

  getRoasterRoleName(id: any, roaster_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/roles/" + id;
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  }

  //API Function Name : Update Role
  //API Description: This API calls helps to Update role name.

  updateRoasterRoleName(body: any, roaster_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/roles/" + body.roleId;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "PUT";
    data['data'] = {
      'name': body.name
    }
    return this.http.post(this.url, data);
  }

  //API Function Name : Role permissions
  //API Description: This API calls helps to get all permissions.

  getRolePermissions(roaster_id: any, roleid: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/roles/" + roleid + "/permissions";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  }

  //API Function Name : Assign Role Permissions
  //API Description: This API calls helps to assign role permissions to the user

  assignRolePermissions(body: any, roleId: any, roaster_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/roles/" + roleId + "/permissions";
    data['token'] = this.cookieService.get('Auth');
    data['data'] = body;
    return this.http.post(this.url, data);
  }

  //API Function Name : Get User Roles
  //API Description: This API calls helps to get the roles of the selected user.

  getUserBasedRoles(roaster_id: any, user_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + user_id + "/roles";
    data['token'] = this.cookieService.get('Auth');
    return this.http.post(this.url, data);
  }

  //API Function Name : delete user
  //API Description: This API calls helps to delete the selected user.

  deleteRoasterUser(roaster_id: any, user_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + user_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "DELETE";
    return this.http.post(this.url, data);
  }

  //API Function Name : Assign Role
  //API Description: This API calls helps to assign new role to the selected user.

  assignUserBasedUserRoles(roaster_id: any, role_id: any, user_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + user_id + "/roles/" + role_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "POST";
    return this.http.post(this.url, data);
  }

  //API Function Name : Delete user role
  //API Description: This API calls helps to delete the role of the selected user

  deleteRoasterUserRole(roaster_id: any, role_id: any, user_id: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + user_id + "/roles/" + role_id;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = "DELETE";
    return this.http.post(this.url, data);
  }


  //API Function Name : Enable Admin User
  //API Description: This API calls helps to Enable the selected user.

  enableAdminUser(roaster_id: any, enableUserId: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + enableUserId + "/enable";
    data['method'] = "PUT";
    data['token'] = this.cookieService.get('Auth');
    return this.http.put(this.putUrl, data);
  }

  //API Function Name : Disable Admin User
  //API Description: This API calls helps to Disable the selected user.

  disableAdminUsers(roaster_id: any, disableUserId: any) {
    var data = {};
    data['api_call'] = "/ro/" + roaster_id + "/users/" + disableUserId + "/disable";
    data['method'] = "PUT";
    data['token'] = this.cookieService.get('Auth');
    return this.http.put(this.putUrl, data);
  }

  
}
