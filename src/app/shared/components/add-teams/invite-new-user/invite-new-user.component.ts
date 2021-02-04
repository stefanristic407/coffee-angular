import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { EditUserDetailsComponent } from '../edit-user-details/edit-user-details.component';

@Component({
    selector: 'app-invite-new-user',
    templateUrl: './invite-new-user.component.html',
    styleUrls: ['./invite-new-user.component.scss'],
})
export class InviteNewUserComponent implements OnInit {
    currentRoleID: any = '';
    selectedRole: any = 'Select Role';
    roleList: any = [];
    roaster_id: any = '';
    breadCrumbItem: MenuItem[] = [];
    password = 'Ro@Sewn1234';
    @ViewChild(EditUserDetailsComponent, { static: false }) userDetails;
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
                console.error(err);
            },
        );
    }
    setTeamRole(currentRole): void {
        this.selectedRole = currentRole['name'];
        this.currentRoleID = currentRole['id'];
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
        const obj4: MenuItem = { label: this.globals.languageJson?.manage_roles, disabled: true };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj4);
    }
    onInvite() {
        if (this.userDetails.userForm.valid) {
            const getArrayLength = this.userDetails.userForm.value.items;
            this.userDetails.userForm.value.items.forEach((ele, index) => {
                const userInput = this.getUserInputObj(ele);
                this.addUserToRoaster(userInput);
                if (index === getArrayLength - 1) {
                    this.router.navigate(['/people/user-management']);
                }
            });
        } else {
            this.toastrService.error('Please fill correct data');
        }
    }
    async addUserToRoaster(userInput) {
        const addUserResponse = await this.userService.addUserRoaster(userInput).toPromise();
        if (addUserResponse && addUserResponse['success']) {
            const assignRoleResponse = await this.roasterService
                .assignUserBasedUserRoles(this.roaster_id, this.currentRoleID, addUserResponse['result']['user_id'])
                .toPromise();
            if (assignRoleResponse && assignRoleResponse['success']) {
                const getEmailInput = this.getEmailInputBody(userInput);
                const sendInviteEmail = this.userService.sendUrlToEmail(getEmailInput).toPromise();
                if (sendInviteEmail && sendInviteEmail['status'] === '200 OK') {
                    return;
                } else {
                    this.showError('email');
                }
            } else {
                this.showError('assign');
            }
        } else {
            this.showError('add');
        }
    }
    showError(flag) {
        if (flag == 'add') {
            this.toastrService.error('Error while creating a new user');
        } else if (flag == 'assign') {
            this.toastrService.error('Error while assigning a role to new user');
        } else {
            this.toastrService.error('Error while sending Invite to new user');
        }
    }
    getEmailInputBody(newUser) {
        const body = {
            portal: 'RO',
            content_type: 'invite_with_password',
            data: [
                {
                    email: newUser.email,
                    password: newUser.password,
                    name: newUser.firstname,
                    url: 'https://roaster.sewnstaging.com',
                },
            ],
        };
        return body;
    }
    getUserInputObj(item) {
        return {
            firstname: item['name'],
            lastname: '',
            email: item['email'],
            password: this.password,
            confirm_password: this.password,
            timezone: '',
            language: '',
        };
    }
}
