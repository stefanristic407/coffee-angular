import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { GlobalsService, RoasterserviceService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-team-member-table',
    templateUrl: './team-member-table.component.html',
    styleUrls: ['./team-member-table.component.scss'],
})
export class TeamMemberTableComponent implements OnInit {
    roaster_id: any;
    breadCrumbItem: MenuItem[] = [];
    selectedRole = 'Role';
    termStatus = 'Status';
    termRole = 'Role';
    showVar = true;
    showRole = true;
    termSearch = '';
    tableColumns: any = [];
    tableValue: any = [];
    tableSelected: any = [];
    totalCount = 0;
    currentRoleID = '';
    roleList: any = [];
    selectedUsers: any = [];
    roasterUsers: any = [];
    constructor(
        public router: Router,
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public userService: UserserviceService,
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
                width: 15,
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
        this.currentRoleID = this.route.snapshot.queryParams['roleID'];
        this.supplyBreadCrumb();
        this.roaster_id = this.cookieService.get('roaster_id');
        this.listRoles();
    }
    listRoles(): void {
        this.roasterService.getRoles(this.roaster_id).subscribe(
            (response) => {
                if (response['success']) {
                    const getCurrentRole = response['result'].find((ele) => ele['id'] == this.currentRoleID);
                    this.selectedRole = getCurrentRole ? getCurrentRole['name'] : '';
                }
                this.roleList = response['result'];
                this.getTableData();
            },
            (err) => {
                this.getTableData();
                console.log(err);
            },
        );
    }
    getTableData(event?): void {
        this.roasterUsers = [];
        this.selectedUsers = [];
        this.roasterService.getRoasterUsers(this.roaster_id).subscribe(
            (result) => {
                if (result['success'] == true) {
                    const userData = result['result'];
                    userData.forEach((element, index) => {
                        const tempData = {};
                        tempData['id'] = element.id;
                        tempData['name'] = element.firstname + ' ' + element.lastname;
                        tempData['email'] = element.email;
                        tempData['status'] = element.status;
                        tempData['last_login_at'] = element['last_login_at'];
                        this.roasterService
                            .getUserBasedRoles(this.roaster_id, tempData['id'])
                            .subscribe((roleResponse) => {
                                if (roleResponse['success'] == true) {
                                    tempData['roles'] = roleResponse['result'];
                                } else {
                                    tempData['roles'] = '';
                                }
                                if (index == userData.length - 1) {
                                    this.filterSelectedRoleUser();
                                }
                            });
                        tempData['roles'] = '';
                        this.roasterUsers.push(tempData);
                    });

                    //   this.userActive++;
                } else {
                    this.toastrService.error('Unable to fetch users data');
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    filterSelectedRoleUser(): void {
        this.tableValue = [];
        this.roasterUsers.forEach((ele) => {
            const findCurrentRoleID = ele['roles']
                ? ele['roles'].find((item) => item['id'] == this.currentRoleID)
                : undefined;
            if (!findCurrentRoleID) {
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
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj4);
    }
    setRole(role): void {
        this.termRole = role;
    }
    setStatus(term: any) {
        this.termStatus = term;
    }
    setTeamRole(roleName, roleID): void {
        this.currentRoleID = roleID;
        this.selectedRole = roleName;
        this.filterSelectedRoleUser();
    }
    inviteNewMembers() {
        //console.log(this.roleData);
        const navigationExtras: NavigationExtras = {
            queryParams: {
                //roleData: encodeURIComponent(this.roleData),
                //roleID: encodeURIComponent(this.roleID),
            },
        };
        this.router.navigate(['/people/invite-member'], navigationExtras);
    }
    assignUsersToRole(): void {
        let count = 0;
        this.selectedUsers.forEach((ele) => {
            this.roasterService.assignUserBasedUserRoles(this.roaster_id, this.currentRoleID, ele['id']).subscribe(
                (res) => {
                    count++;
                    if (res['success'] == true) {
                        if (count == this.selectedUsers.length) {
                            this.toastrService.success('Role Assigned Successfully!');
                            this.getTableData();
                        }
                    } else {
                        this.toastrService.error('User Role Already exists.Please select another role');
                    }
                },
                (err) => {
                    count++;
                    console.log(err);
                },
            );
        });
    }
}
