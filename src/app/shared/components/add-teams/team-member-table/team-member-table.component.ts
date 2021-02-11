import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { GlobalsService, RoasterserviceService, UserserviceService } from '@services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-team-member-table',
    templateUrl: './team-member-table.component.html',
    styleUrls: ['./team-member-table.component.scss'],
})
export class TeamMemberTableComponent implements OnInit {
    roasterID: any;
    breadCrumbItem: MenuItem[] = [];
    selectedRole = 'Role';
    termStatus;
    termRole;
    termSearch = '';
    tableColumns: any = [];
    tableValue: any = [];
    tableSelected: any = [];
    totalCount = 0;
    currentRoleID;
    roleList: any = [];
    selectedUsers: any = [];
    roasterUsers: any = [];
    statusFilterArray: any = [];
    isAddMember = false;
    modalRef: BsModalRef;
    modalUserRoasterId = '';
    modalUserRoasterName = '';
    loginId: any;
    constructor(
        public router: Router,
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public userService: UserserviceService,
        private modalService: BsModalService,
        public sharedService: SharedServiceService,
    ) {}

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.tableColumns = [
            {
                field: 'name',
                header: 'Name',
                sortable: false,
                width: 20,
            },
            {
                field: 'last_login_at',
                header: 'Last login',
                sortable: false,
                width: 15,
            },
            {
                field: 'email',
                header: 'Email',
                width: 25,
            },
            {
                field: 'status',
                header: 'Status',
                sortable: false,
                width: 15,
            },
            {
                field: 'roles',
                header: 'All Roles',
                sortable: false,
                width: 20,
            },
        ];
        this.statusFilterArray = [
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'Inactive' },
            { name: 'Pending', value: 'pending' },
        ];
        this.currentRoleID = Number(this.route.snapshot.queryParams.roleID);
        this.isAddMember =
            this.route.snapshot.queryParams.isAddMember && this.route.snapshot.queryParams.isAddMember === 'true'
                ? true
                : false;
        if (!this.isAddMember) {
            this.tableColumns.push({
                field: 'actions',
                header: 'Actions',
                sortable: false,
                width: 10,
            });
        }
        this.supplyBreadCrumb();
        this.loginId = this.cookieService.get('user_id');
        this.roasterID = this.cookieService.get('roaster_id');
        this.listRoles();
    }
    listRoles(): void {
        this.roasterService.getRoles(this.roasterID).subscribe(
            (response: any) => {
                if (response.success) {
                    const getCurrentRole = response.result.find((ele) => ele.id === this.currentRoleID);
                    this.selectedRole = getCurrentRole ? getCurrentRole.name : '';
                    if (!this.isAddMember) {
                        this.termRole = this.currentRoleID;
                    }
                }
                this.roleList = response.result;
                this.getTableData();
            },
            (err) => {
                this.getTableData();
                console.error(err);
            },
        );
    }
    getTableData(): void {
        this.selectedUsers = [];
        const postData: any = {};
        postData.role_id = this.termRole ? this.termRole : '';
        postData.name = this.termSearch ? this.termSearch : '';
        postData.status = this.termStatus ? this.termStatus : undefined;
        postData.per_page = 100;
        this.roasterService.getRoasterUsers(this.roasterID, postData).subscribe(
            (result: any) => {
                if (result.success) {
                    const userData = result.result;
                    if (userData && userData.length > 0) {
                        this.roasterUsers = [];
                        this.tableValue = [];
                        userData.forEach((element, index) => {
                            const tempData: any = {};
                            tempData.id = element.id;
                            tempData.name = element.firstname + ' ' + element.lastname;
                            tempData.email = element.email;
                            tempData.status = element.status;
                            tempData.last_login_at = element.last_login_at;
                            const roleList = [];
                            if (element.roles) {
                                const rolesName = element.roles.split(',');
                                rolesName.forEach((ele) => {
                                    const getRoles = this.roleList.find((item) => item.name === ele);
                                    if (getRoles) {
                                        roleList.push(getRoles);
                                    }
                                });
                            }
                            tempData.roles = roleList;
                            this.roasterUsers.push(tempData);
                        });
                    }
                    if (this.isAddMember) {
                        this.filterSelectedRoleUser();
                    } else {
                        this.tableValue = this.roasterUsers;
                    }
                } else {
                    this.toastrService.error('Unable to fetch users data');
                }
            },
            (err) => {
                console.error(err);
            },
        );
    }
    filterSelectedRoleUser(): void {
        this.tableValue = [];
        this.roasterUsers.forEach((ele) => {
            const findCurrentRoleID = ele.roles ? ele.roles.find((item) => item.id === this.currentRoleID) : undefined;
            if ((this.isAddMember && !findCurrentRoleID) || (!this.isAddMember && findCurrentRoleID)) {
                this.tableValue.push(ele);
            }
        });
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
        if (!this.isAddMember) {
            obj4.label = this.globals.languageJson?.user_management;
        }
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj4);
    }
    setTeamRole(roleName, roleID): void {
        this.currentRoleID = roleID;
        this.selectedRole = roleName;
        this.filterSelectedRoleUser();
    }
    inviteNewMembers() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                roleID: encodeURIComponent(this.currentRoleID),
            },
        };
        this.router.navigate(['/people/invite-member'], navigationExtras);
    }
    onSearch(event) {
        this.getTableData();
    }
    assignUsersToRole(): void {
        let count = 0;
        this.selectedUsers.forEach((ele) => {
            this.roasterService.assignUserBasedUserRoles(this.roasterID, this.currentRoleID, ele.id).subscribe(
                (res: any) => {
                    count++;
                    if (res.success) {
                        if (count === this.selectedUsers.length) {
                            this.toastrService.success('Role Assigned Successfully!');
                            this.getTableData();
                        }
                    } else {
                        this.toastrService.error('User Role Already exists.Please select another role');
                    }
                },
                (err) => {
                    count++;
                    console.error(err);
                },
            );
        });
    }
    // Function Name : Edit Member
    // Description: This function helps to redirect to edit member page with user id as route params
    editMember(size: any) {
        const userID = size;
        const navigationExtras: NavigationExtras = {
            queryParams: {
                userID: encodeURIComponent(userID),
            },
        };

        this.router.navigate(['/people/edit-members'], navigationExtras);
    }
    // Function Name : Open Modal
    // Description: This function helps to get the Role Id from user management page
    openModal(template: TemplateRef<any>, userId: any, userName: any) {
        this.modalRef = this.modalService.show(template);
        this.modalUserRoasterId = userId;
        this.modalUserRoasterName = userName;
    }
    // Function Name : user Disable
    // Description: This function helps to disable the selected user.
    userDisable(disableId) {
        if (confirm('Please confirm! you want to Disable Account?') === true) {
            this.roasterService.disableAdminUsers(this.roasterID, disableId).subscribe((result: any) => {
                if (result.success) {
                    this.toastrService.success('Disabled User Account Successfully');
                    this.getTableData();
                } else {
                    this.toastrService.error('Error while disabling the User account');
                }
            });
        }
    }
    userEnable(enableId) {
        if (confirm('Please confirm! you want to Enable Account?') === true) {
            this.roasterService.enableAdminUser(this.roasterID, enableId).subscribe((result: any) => {
                if (result.success) {
                    this.toastrService.success('Enabled User Account');
                    this.getTableData();
                } else {
                    this.toastrService.error('Error while enabling the User account');
                }
            });
        }
    }
    makeAdmin(userDetails: any) {
        let findAdmin = false;
        if (userDetails && userDetails.roles && userDetails.roles.length > 0) {
            findAdmin = userDetails.roles.find((ele) => ele.name === 'support-admins');
            this.toastrService.error('Already an Admin.');
        }
        if (!findAdmin) {
            const findAdminRole = this.roleList.find((ele) => ele.name === 'support-admins');
            this.roasterService
                .assignUserBasedUserRoles(this.roasterID, findAdminRole.id, userDetails.id)
                .subscribe((data: any) => {
                    if (data.success) {
                        this.toastrService.success('User has been made Admin Successfully!');
                    }
                });
        }
    }
    deleteRoasterUser(userID: any) {
        this.roasterService.deleteRoasterUser(this.roasterID, userID).subscribe((response: any) => {
            if (response.success) {
                this.toastrService.success('User Deleted successfully!');
                this.getTableData();
            } else {
                this.toastrService.error('Unable to delete the user.');
            }
        });
    }
    filterCall() {
        this.getTableData();
    }
}
