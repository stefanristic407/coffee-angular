import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { RoasterserviceService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, TreeNode } from 'primeng/api';
import { GlobalsService } from 'src/services/globals.service';
import { ManagePermissionComponent } from '../manage-permission/manage-permission.component';

@Component({
    selector: 'app-create-role',
    templateUrl: './create-role.component.html',
    styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    roleID: string;
    btnValue: string;
    roleError: any;
    selectedPermission: TreeNode[] = [];
    roaster_id: any;
    permissionList: any = [];
    displayModal = false;
    roleForm: FormGroup;
    @ViewChild(ManagePermissionComponent, { static: false }) managePermission;

    constructor(
        public globals: GlobalsService,
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private route: Router,
        private activeRoute: ActivatedRoute,
        private userService: UserserviceService,
        private toasterService: ToastrService,
        private fb: FormBuilder,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
        this.activeRoute.params.subscribe((params) => {
            this.roleID = params.id ? params.id : '';
            this.btnValue = this.roleID ? 'Update Role' : 'Add Role';
            if (this.roleID) {
                this.getRolePermission(this.roleID);
            } else {
                this.getRoasterPermission();
            }
        });
    }

    ngOnInit(): void {
        this.roleForm = this.fb.group({
            roleName: ['', Validators.compose([Validators.required])],
        });
        this.supplyBreadCrumb();
    }
    getRoasterPermission(selectedPermission = []): void {
        this.roasterService.getRoasterPermissions(this.roaster_id).subscribe(
            (res) => {
                const groupedCategory = this.groupByArray(res['result'], 'category');
                const groupPermission = [];
                this.selectedPermission = [];
                groupedCategory.forEach((ele) => {
                    const parent = {};
                    let label = ele.key;
                    label = label.replace('-', ' ');
                    parent['label'] = label.charAt(0).toUpperCase() + label.slice(1);
                    parent['selectable'] = false;
                    parent['styleClass'] = 'parentNodeStyle';
                    let childItems = [];
                    if (ele['values']) {
                        childItems = ele['values'].map((item) => {
                            const obj = {};
                            let childLabel = item.slug;
                            childLabel = childLabel.replace('-', ' ');
                            childLabel = childLabel.charAt(0).toUpperCase() + childLabel.slice(1);
                            obj['label'] = childLabel + ' (' + item.access_type + ')';
                            obj['key'] = item.id;
                            obj['data'] = item.slug;
                            if (selectedPermission) {
                                const findSelected = selectedPermission.find((m) => m.id == item.id);
                                if (findSelected) {
                                    this.selectedPermission.push(obj);
                                }
                            }

                            return obj;
                        });
                    }
                    parent['children'] = childItems;
                    groupPermission.push(parent);
                });
                this.managePermission.selectedPermission = this.selectedPermission;
                this.permissionList = groupPermission;
            },
            (err) => {
                console.error(err);
            },
        );
    }
    groupByArray(arr = [], key) {
        return arr.reduce(function (rv, x) {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find((r) => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({
                    key: v,
                    values: [x],
                });
            }
            return rv;
        }, []);
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/features/welcome-aboard',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.people,
            routerLink: '/people/manage-role',
            disabled: false,
        };
        const obj3: MenuItem = {
            label: this.globals.languageJson?.manage_roles,
            routerLink: '/people/manage-role',
            disabled: false,
        };
        const obj4: MenuItem = { label: this.globals.languageJson?.create_role, disabled: true };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
        this.breadCrumbItem.push(obj4);
    }
    roleAdd(): void {
        if (this.roleForm.valid) {
            const permissionsArray = [];
            this.managePermission.selectedPermission.forEach((permission) => {
                permissionsArray.push(permission['key']);
            });
            const body = { permissions: permissionsArray };
            if (this.roleID) {
                const data = { name: this.roleForm.controls.roleName.value, roleId: this.roleID };
                this.updateRole(data, body);
            } else {
                const data = { name: this.roleForm.controls.roleName.value, id: this.roaster_id };
                this.createRole(data, body);
            }
        }
    }
    createRole(params, permissionArray): void {
        this.roasterService.createRole(params).subscribe((result) => {
            if (result['success'] == true) {
                this.toasterService.success('Role has been created. We are assigning permissions.');
                if (this.managePermission.selectedPermission !== undefined) {
                    const roleID = result['result']['role_id'];
                    this.assignCreateRole(permissionArray, roleID);
                }
            } else {
                this.toasterService.error('Error while adding roles and permissions');
            }
        });
    }
    assignCreateRole(data, roleID): void {
        this.roasterService.assignRolePermissions(data, roleID, this.roaster_id).subscribe(
            (permissionResult) => {
                if (permissionResult['success'] == true) {
                    this.toasterService.success('Permission created successfully for added role.');
                }
                this.route.navigate(['/people/manage-role']);
            },
            (err) => {
                this.route.navigate(['/people/manage-role']);
            },
        );
    }
    updateRole(params, body): void {
        this.roasterService.updateRoasterRoleName(params, this.roaster_id).subscribe((data) => {
            if (data['success'] == true) {
                this.assignUpdatedRolePermission(body);
            } else {
                this.toasterService.error('Error while adding roles and permissions');
            }
        });
    }
    assignUpdatedRolePermission(body): void {
        this.roasterService.assignRolePermissions(body, this.roleID, this.roaster_id).subscribe((permissionResult) => {
            if (permissionResult['success'] == true) {
                this.toasterService.success('Permission Updated successfully for Edited role.');
                this.globals.permissionMethod();
            } else {
                if (permissionResult['success'] == false) {
                    this.toasterService.error('System role permissions cannot be altered');
                    setTimeout(() => {
                        this.route.navigate(['/people/manage-role']);
                    }, 2000);
                }
            }
        });
    }
    getUserBasedRoles(): void {
        const loggedInUserID = this.cookieService.get('user_id');
        this.roasterService.getUserBasedRoles(this.roaster_id, loggedInUserID).subscribe((result) => {
            if (result['success'] == true) {
                if (result['result']) {
                    const flagTrue = result['result'].some((role) => role.id == this.roleID);
                    if (flagTrue) {
                        this.displayModal = true;
                    } else {
                        this.route.navigate(['/people/manage-role']);
                    }
                }
            }
        });
    }
    userLogout(): void {
        this.userService.logOut().subscribe((res) => {
            if (res['success'] == true) {
                this.cookieService.deleteAll();
                this.route.navigate(['/login']);
                this.toasterService.success('Logout successfully !');
            } else {
                console.error('Error while Logout!');
                this.toasterService.error('Error while Logout!');
            }
        });
    }
    // Function Name : Get Role Name
    // Description: This function helps to get name of the Selected role.

    getRolePermission(roleID) {
        this.roasterService.getRolePermissions(this.roaster_id, roleID).subscribe(
            (data) => {
                let selectedPermission = [];
                if (data['success'] == true) {
                    this.roleForm.setValue({ roleName: data['result']['role_name'] });
                    selectedPermission = data['result']['permissions'];
                }
                this.getRoasterPermission(selectedPermission);
            },
            (err) => {
                this.getRoasterPermission();
            },
        );
    }
}
