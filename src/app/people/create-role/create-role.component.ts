// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Create a Role.

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  role: String;
  roleError: any;
  files: TreeNode[];
  selectedFile: TreeNode[];
  roaster_id: any;
  showPermission: TreeNode[] = [];
  selectPermission: TreeNode[] = [];
  roleId: any;
  roleflag: boolean;
  permissionList: TreeNode[];
  loginButtonValue: any;
  updateButtonValue: any;
  constructor(private router: Router,
    private roasterService: RoasterserviceService,
    private cookieService: CookieService,
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService) {
    this.roaster_id = this.cookieService.get('roaster_id');
    this.activeRoute.params.subscribe(params => {
      if (params.id != undefined) {
        this.roleId = params.id;

        this.getRoleName(this.roleId);
        this.roleflag = false;
      } else {
        this.roleId = "";
        this.roleflag = true;
      }
    });
  }

  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    this.roleError = '';
    this.showPermission = [];
    this.permissionList = [];
    this.updateButtonValue = "Update role";
    this.loginButtonValue = "Add role";
  }

  // Function Name : Permissions
  // Description: This function helps to get the all permissions of the user. 

  ngAfterViewInit() {
    var selectedPermissionsArray = [];
    this.roasterService.getRoasterPermissions(this.roaster_id).subscribe(
      data => {

        if (!this.roleflag) {
          this.roasterService.getRolePermissions(this.roaster_id, this.roleId).subscribe(
            rolePermissionResult => {
              if (rolePermissionResult['result']['permissions'] != null) {
                rolePermissionResult['result']['permissions'].forEach(permission => {
                  console.log(permission);
                  var label = permission['slug'];
                  label = label.replace('-', ' ');
                  this.files = [{
                    "label": label + " (" + permission['access_type'] + ")",
                    "key": permission['id'],
                    "data": permission['slug'],
                    "expanded": true
                  }];

                  //this.selectedFile = selectedPermissionsArray;
                  this.selectPermission.push(this.files[0]);
                });
                this.selectedFile = this.selectPermission;
              }
            }
          );
        }

        for (let i = 0; i < data['result'].length; i++) {
          var label = data['result'][i].slug;
          label = label.replace('-', ' ');
          this.files =
            [
              {
                "label": label + " (" + data['result'][i].access_type + ")",
                "key": data['result'][i].id,
                "data": data['result'][i].slug,
                "expanded": true,
              }]
          this.showPermission.push(this.files[0]);
        }
        this.permissionList = this.showPermission;
      }
    );
  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #E8E8E8";
    }
  }

  // Function Name : Role and permissions
  // Description: This function helps to add & Update roles and permissons.

  roleAdd() {
    if (this.role == "" || this.role == null || this.role == undefined) {
      this.roleError = "Please enter your role";
      document.getElementById('roleName').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.roleError = "";
      }, 3000);
    } else {
      this.loginButtonValue = "Adding";
      var data = {
        'name': this.role,
        'id': this.roaster_id
      }

      if (this.roleflag == true) {
        this.roasterService.createRole(data).subscribe(
          result => {
            console.log(result);
            if (result['success'] == true) {
              this.loginButtonValue = "Add role";
              this.toastrService.success("Role has been created. We are assigning permissions.")
              if (this.selectedFile !== undefined) {
                var permissionsArray = [];
                this.selectedFile.forEach(permission => {
                  permissionsArray.push(permission['key']);
                });
                var body = { 'permissions': permissionsArray };
                var roleId = result['result']['role_id'];
                this.roasterService.assignRolePermissions(body, roleId, this.roaster_id).subscribe(
                  permissionResult => {
                    if (permissionResult['success'] == true) {
                      this.toastrService.success("Permission created successfully for added role.")

                    }
                  }
                );
              }
              this.router.navigate(["/people/manage-role"]);


            }
            else {
              this.toastrService.error("Error while adding roles and permissions");
            }
            this.loginButtonValue = "Add role";
          }
        )
      } else {
        // alert("Coming");
        this.updateButtonValue = "Updating";
        var data1 = [];
        data1["name"] = this.role;
        data1["roleId"] = this.roleId;
        this.roasterService.updateRoasterRoleName(data1, this.roaster_id).subscribe(
          data => {
            if (data['success'] == true) {
              this.updateButtonValue = "Update role";
              var permissionsArray = [];
              this.selectedFile.forEach(permission => {
                permissionsArray.push(permission['key']);
              });
              var body = { 'permissions': permissionsArray };
              this.roasterService.assignRolePermissions(body, this.roleId, this.roaster_id).subscribe(
                permissionResult => {
                  if (permissionResult['success'] == true) {
                    this.toastrService.success("Permission Updated successfully for Edited role.");
                    this.router.navigate(["/people/manage-role"]);
                  }
                }
              );
            }
            else {
              this.toastrService.error("Error while adding roles and permissions");
            }
            this.updateButtonValue = "Update role";
          }
        )

      }


    }

  }


  // Function Name : Get Role Name
  // Description: This function helps to get name of the Selected role. 

  getRoleName(roleID) {
    this.roasterService.getRoasterRoleName(roleID, this.roaster_id).subscribe(
      data => {
        if (data['success'] == true) {
          this.role = data['result']['name'];
          // this.getuserrolepermissions(roleID);
        }
      });
  }

}
