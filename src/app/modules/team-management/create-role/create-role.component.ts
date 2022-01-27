import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PERMISSION_DESCRIPTION } from '@constants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, RoasterService, UserService } from '@services';
import { toSentenceCase } from '@utils';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, TreeNode } from 'primeng/api';

@Component({
    selector: 'app-create-role',
    templateUrl: './create-role.component.html',
    styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    isLoading = false;
    roleID: number;
    role: any;
    btnValue: string;
    roleError: any;
    allPermissions: any[];
    selectedPermissionList: any[];
    selectedPermissionNodes: TreeNode[] = [];
    permissionList: any = [];
    displayModal = false;
    roleForm: FormGroup;
    isDuplicate = false;

    constructor(
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private cookieService: CookieService,
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private router: Router,
        private toasterService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
    ) {
        this.activeRoute.params.subscribe((params) => {
            this.roleID = params.id || null;
            this.btnValue = this.roleID ? this.translator.instant('update_role') : this.translator.instant('add_role');
            this.supplyBreadCrumb();
            const promises = [];
            if (this.roleID) {
                promises.push(
                    new Promise((resolve, reject) => {
                        this.getRole(resolve, reject);
                    }),
                );
                promises.push(
                    new Promise((resolve, reject) => {
                        this.getRolePermission(this.roleID, resolve, reject);
                    }),
                );
            }
            promises.push(
                new Promise((resolve, reject) => {
                    this.getAllPermissions(resolve, reject);
                }),
            );
            Promise.all(promises)
                .then(() => {
                    this.selectPermissions();
                })
                .catch(() => {
                    this.router.navigate(['/team-management/manage-role']);
                });
        });
        if (this.activeRoute.snapshot.queryParams.duplicate) {
            this.isDuplicate = true;
            this.btnValue = this.translator.instant('add_role');
        }
    }

    ngOnInit(): void {
        this.roleForm = this.fb.group({
            roleName: ['', Validators.compose([Validators.required])],
        });
    }

    getRole(resolve, reject) {
        this.isLoading = true;
        this.roasterService.getRole(this.roleID).subscribe((res) => {
            if (res.success) {
                this.role = res.result;
                resolve();
            } else {
                reject();
            }
            this.supplyBreadCrumb();
            this.isLoading = false;
        });
    }

    getAllPermissions(resolve, reject): void {
        this.roasterService.getAllPermissions().subscribe((res) => {
            if (res.success) {
                this.allPermissions = res.result || [];
                resolve();
            } else {
                reject();
            }
        });
    }

    groupByArray(arr = [], key) {
        return arr.reduce((rv, x) => {
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
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('team_management'), routerLink: '/team-management/manage-role' },
            { label: this.translator.instant('manage_roles'), routerLink: '/team-management/manage-role' },
            { label: this.role ? this.role.name : this.translator.instant('create_role') },
        ];
    }

    roleAdd(): void {
        if (this.roleForm.valid) {
            const permissionsArray = [];
            this.selectedPermissionNodes.forEach((permission) => {
                permissionsArray.push(permission.key);
            });
            const body = { permissions: permissionsArray };
            if (this.roleID && !this.isDuplicate) {
                this.updateRole(body);
            } else {
                this.createRole(body);
            }
        } else {
            this.roleForm.controls.roleName.markAsTouched();
            this.toasterService.error('Please fill data');
        }
    }

    createRole(permissionArray): void {
        this.roasterService.createRole({ name: this.roleForm.controls.roleName.value }).subscribe((result: any) => {
            if (result.success) {
                if (this.selectedPermissionNodes !== undefined && !this.role?.is_system) {
                    this.roleID = result.result.role_id;
                    this.assignUpdatedRolePermission(permissionArray);
                } else {
                    this.router.navigate(['/team-management/manage-role']);
                    this.toasterService.success(this.translator.instant('role_created_successfully'));
                }
            } else {
                this.toasterService.error('Error while adding roles and permissions');
            }
        });
    }

    updateRole(permissionArray): void {
        this.roasterService
            .updateRole(this.roleID, { name: this.roleForm.controls.roleName.value })
            .subscribe((data: any) => {
                if (data.success) {
                    if (!this.role?.is_system) {
                        this.assignUpdatedRolePermission(permissionArray);
                    } else {
                        this.router.navigate(['/team-management/manage-role']);
                        this.toasterService.success(this.translator.instant('role_updated_successfully'));
                    }
                } else {
                    this.toasterService.error('Error while adding roles and permissions');
                }
            });
    }

    assignUpdatedRolePermission(body): void {
        this.roasterService.assignRolePermissions(this.roleID, body).subscribe((permissionResult: any) => {
            if (permissionResult.success) {
                this.toasterService.success('Permission assigned successfully for this role.');
                this.router.navigate(['/team-management/manage-role']);
            }
        });
    }

    getUserBasedRoles(): void {
        const loggedInUserID = this.authService.userId;
        this.roasterService.getUserBasedRoles(loggedInUserID).subscribe((res) => {
            if (res.success && res.result) {
                const flagTrue = res.result.some((role) => role.id === this.roleID);
                if (flagTrue) {
                    this.displayModal = true;
                } else {
                    this.router.navigate(['/team-management/manage-role']);
                }
            }
        });
    }

    userLogout(): void {
        this.userService.logOut().subscribe((res: any) => {
            if (res.success) {
                this.cookieService.deleteAll();
                this.router.navigate(['/login']);
                this.toasterService.success('Logout successfully !');
            } else {
                console.error('Error while Logout!');
                this.toasterService.error('Error while Logout!');
            }
        });
    }

    getRolePermission(roleID, resolve, reject) {
        this.roasterService.getRolePermissions(roleID).subscribe((data: any) => {
            this.selectedPermissionList = [];
            if (data.success) {
                if (!this.isDuplicate) {
                    this.roleForm.setValue({ roleName: data.result.role_name });
                }
                this.selectedPermissionList = data.result.permissions;
            }
            resolve();
        });
    }

    selectPermissions() {
        const sortedPermission = this.allPermissions.sort((a: any, b: any) => (a.category > b.category ? -1 : 1));
        const groupedCategory = this.groupByArray(sortedPermission, 'category');
        const groupPermission = [];
        this.selectedPermissionNodes = [];
        groupedCategory.forEach((ele) => {
            const parent: any = {};
            let label = ele.key;
            label = label.replace('-', ' ');
            parent.label = label.charAt(0).toUpperCase() + label.slice(1);
            parent.selectable = false;
            parent.styleClass = 'parentNodeStyle';
            let childItems = [];
            if (ele.values) {
                childItems = ele.values.map((item) => {
                    const obj: any = {};
                    const childLabel = toSentenceCase(item.slug).replace('Apikey', 'API key');
                    obj.label = childLabel + ' (' + item.access_type + ')';
                    obj.key = item.id;
                    obj.data = item.slug;
                    obj.description = PERMISSION_DESCRIPTION[item.slug];
                    if (this.selectedPermissionList) {
                        const findSelected = this.selectedPermissionList.find((m) => m.id === item.id);
                        if (findSelected) {
                            this.selectedPermissionNodes.push(obj);
                        }
                    }
                    return obj;
                });
            }
            parent.children = childItems;
            groupPermission.push(parent);
        });
        this.permissionList = groupPermission;
    }
}
