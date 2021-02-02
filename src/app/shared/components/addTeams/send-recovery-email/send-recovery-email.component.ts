import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
    selector: 'app-send-recovery-email',
    templateUrl: './send-recovery-email.component.html',
    styleUrls: ['./send-recovery-email.component.scss'],
})
export class SendRecoveryEmailComponent implements OnInit {
    currentRoleID: any = '';
    selectedRole: any = 'Select Role';
    roleList: any = [];
    roaster_id: any = '';
    breadCrumbItem: MenuItem[] = [];
    isEdit = false;
    statusToggle = false;
    last_activated = '';
    userDetails = {};
    userID = '';
    deleteRoles: any = [];
    constructor(
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public userService: UserserviceService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.roaster_id = this.cookieService.get('roaster_id');
        this.currentRoleID = this.route.snapshot.queryParams['roleID'] ? this.route.snapshot.queryParams['roleID'] : '';
        this.supplyBreadCrumb();
        this.listRoles();
        this.userDetails['last_activated'] = '';
        this.userDetails['name'] = '';
        this.userDetails['email'] = '';
        this.userDetails['roles'] = [];
        if (this.route.snapshot.queryParams['userID'] != undefined) {
            this.userID = decodeURIComponent(this.route.snapshot.queryParams['userID']);
        } else {
            this.toastrService.error('Error in getting the user Id');
            this.router.navigate(['/people/user-management']);
        }
        this.getUserData();
    }
    getUserData(): void {
        this.userService.getRoasterUserData(this.roaster_id, this.userID).subscribe((result) => {
            console.log(result['result']);
            if (result && result['success']) {
                this.userDetails['name'] = result['result']['firstname'] + ' ' + result['result']['lastname'];
                this.userDetails['email'] = result['result']['email'];
                this.userDetails['last_activated'] = result['result']['created_at'];
                this.userDetails['status'] = result['result']['status'];
                this.statusToggle = result['result']['status'] == 'ACTIVE' ? true : false;
                this.listAssignedRoles();
            }
        });
    }
    listAssignedRoles(): void {
        this.roasterService.getUserBasedRoles(this.roaster_id, this.userID).subscribe((response) => {
            if (response['success'] == true) {
                this.userDetails['roles'] = response['result'];
            } else {
                this.toastrService.error('Error while getting the roles of the user.');
            }
        });
    }
    listRoles(): void {
        this.roasterService.getRoles(this.roaster_id).subscribe(
            (response) => {
                if (response['success']) {
                    const getCurrentRole = response['result'].find((ele) => ele['id'] == this.currentRoleID);
                    this.selectedRole = getCurrentRole ? getCurrentRole['name'] : 'Select Role';
                    this.currentRoleID = getCurrentRole ? getCurrentRole['id'] : '';
                }
                this.roleList = response['result'];
            },
            (err) => {
                console.log(err);
            },
        );
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
            label: 'User Management',
            routerLink: '/people/team-members',
            queryParams: { roleID: this.currentRoleID, isAddMember: false },
            disabled: false,
        };
        const obj4: MenuItem = { label: this.globals.languageJson?.edit, disabled: true };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
        this.breadCrumbItem.push(obj4);
    }
    addRole(): void {
        this.isEdit = true;
        this.userDetails['roles'].push({ id: '', name: '', isNew: true });
    }
    onEditCancel() {
        this.isEdit = true;
        this.getUserData();
    }
    validateFields(): boolean {
        if (!this.userDetails['name'] || !this.userDetails['email'] || !this.userDetails['roles']) {
            return false;
        } else {
            const findEmptyRole = this.userDetails['roles'].find((ele) => ele['id'] === '');
            return findEmptyRole ? false : true;
        }
        return true;
    }
    onSave(): void {
        const getUserStatus = this.userDetails['status'] == 'ACTIVE' ? true : false;
        if (getUserStatus !== this.statusToggle) {
            if (this.statusToggle) {
                this.enableUser();
            } else {
                this.disableUser();
            }
        } else {
            this.updateUserDetails();
        }
    }
    updateUserDetails() {
        const getValidate = this.validateFields();
        if (getValidate) {
            const inputObj = { firstname: this.userDetails['name'], lastname: '', email: this.userDetails['email'] };
            this.userService.updateUserData(inputObj, this.roaster_id, this.userID).subscribe(
                (res) => {
                    if (res && res['success']) {
                        if (this.deleteRoles && this.deleteRoles.length > 0) {
                            this.deleteRoleForUser();
                        }
                        const getNewRole = this.userDetails['roles'].find((ele) => ele['isNew'] && ele['id']);
                        if (getNewRole) {
                            this.addNewRoles();
                        }
                    }
                },
                (err) => {
                    this.toastrService.error('Error while updating user details');
                },
            );
        } else {
            this.toastrService.error('Please fill data');
        }
    }
    deleteRoleForUser(): void {
        this.deleteRoles.forEach((ele) => {
            this.roasterService.deleteRoasterUserRole(this.roaster_id, ele, this.userID).subscribe((data) => {
                if (!data['success']) {
                    this.toastrService.error('Error while deleting the role');
                }
            }),
                (err) => {
                    this.toastrService.error('Error while deleting the role');
                };
        });
    }
    addNewRoles() {
        const getNewRoles = this.userDetails['roles'].filter((ele) => ele['isNew'] == true && ele['id']);
        getNewRoles.forEach((ele) => {
            const roleID = parseInt(ele['id']);
            this.roasterService.assignUserBasedUserRoles(this.roaster_id, roleID, this.userID).subscribe(
                (result) => {
                    if (result['success'] == true) {
                        this.toastrService.success('Role has been assigned to the user.');
                        this.listAssignedRoles();
                    } else {
                        this.toastrService.error('Error while assigning the role');
                    }
                },
                (err) => {
                    this.toastrService.error('Error while assigning the role');
                },
            );
        });
    }
    enableUser() {
        this.roasterService.enableAdminUser(this.roaster_id, this.userID).subscribe(
            (response) => {
                if (response['success'] == true) {
                    this.toastrService.success('User has been enabled');
                    this.updateUserDetails();
                } else {
                    this.toastrService.error('Error while enabling the user');
                }
            },
            (err) => {
                this.toastrService.error('Error while enabling the user');
            },
        );
    }
    disableUser() {
        this.roasterService.disableAdminUsers(this.roaster_id, this.userID).subscribe(
            (value) => {
                if (value['success'] == true) {
                    this.toastrService.success('User has been disabled');
                } else {
                    this.toastrService.error('Error while disabling the user');
                }
            },
            (err) => {
                this.toastrService.error('Error while disabling the user');
            },
        );
    }
    onSend(): void {
        console.log('onSend');
    }
    removeRole(idx): void {
        const getRole = this.userDetails['roles'][idx];
        if (getRole) {
            this.deleteRoles.push(getRole['id']);
        }
        this.userDetails['roles'].splice(idx, 1);
    }
    sendMail() {
        const body = {
            name: this.userDetails['name'],
            portal: 'Roaster',
            content_type: 'invite_with_url',
            senders: [this.userDetails['email']],
            url: 'https://qa-roaster-portal.sewnstaging.com/#/auth/update-password',
        };
        this.userService.sendUrlToEmail(body).subscribe(
            (res) => {
                if (res['status'] == '200 OK') {
                    this.toastrService.success('Email has been sent successfully');
                } else {
                    this.toastrService.error('Error while sending email to the User');
                }
            },
            (err) => {
                this.toastrService.error('Error while sending email to the User');
            },
        );
    }
}
