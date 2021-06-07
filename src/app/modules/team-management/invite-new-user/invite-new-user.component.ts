import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { AuthService, GlobalsService } from '@services';
import { RoasterserviceService, UserserviceService } from '@services';
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
    roasterID: any = '';
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
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.roasterID = this.authService.getOrgId();
        this.currentRoleID = this.route.snapshot.queryParams.roleID
            ? Number(this.route.snapshot.queryParams.roleID)
            : '';
        this.supplyBreadCrumb();
        this.listRoles();
    }
    listRoles(): void {
        this.roasterService.getRoles(this.roasterID).subscribe(
            (response: any) => {
                if (response.success) {
                    const getCurrentRole = response.result.find((ele) => ele.id === this.currentRoleID);
                    this.selectedRole = getCurrentRole ? getCurrentRole.name : 'Select Role';
                    this.currentRoleID = getCurrentRole ? getCurrentRole.id : '';
                }
                this.roleList = response.result;
            },
            (err) => {
                console.error(err);
            },
        );
    }
    setTeamRole(currentRole): void {
        this.selectedRole = currentRole.name;
        this.currentRoleID = currentRole.id;
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.team_management,
            routerLink: '/team-management/manage-role',
            disabled: false,
        };
        const obj4: MenuItem = { label: this.globals.languageJson?.manage_roles };
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
                    this.router.navigate(['/team-management/user-management']);
                }
            });
        } else {
            this.userDetails.userForm.markAllAsTouched();
            this.toastrService.error('Please fill correct data');
        }
    }
    async addUserToRoaster(userInput) {
        const existUser: any = await this.userService.getUser({ email: userInput.email }).toPromise();
        let userId;
        if (existUser && existUser.success) {
            userId = existUser.result.id;
        } else {
            const addUserResponse: any = await this.userService.addUserRoaster(userInput).toPromise();
            if (addUserResponse && addUserResponse.success) {
                userId = addUserResponse.result.user_id;
            }
        }
        if (userId) {
            this.roasterService
                .assignUserBasedUserRoles(this.roasterID, this.currentRoleID, userId)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Invite sent successfully');
                        this.router.navigate(['/team-management/manage-role']);
                    } else {
                        if (res.messages.user_id) {
                            this.toastrService.error('This user already exists on this portal.');
                        } else {
                            this.showError('assign');
                        }
                    }
                });
        } else {
            this.showError('add');
        }
    }
    showError(flag) {
        if (flag === 'add') {
            this.toastrService.error('Error while creating a new user');
        } else if (flag === 'assign') {
            this.toastrService.error('Error while assigning a role to new user');
        } else {
            this.toastrService.error('Error while sending Invite to new user');
        }
    }

    getUserInputObj(item) {
        return {
            firstname: item.name,
            lastname: '',
            email: item.email,
            password: this.password,
            confirm_password: this.password,
            timezone: '',
            language: '',
        };
    }
}
