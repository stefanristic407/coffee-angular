import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { AuthService, CommonService, GlobalsService, RoasterserviceService, UserService } from '@services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { ChatHandlerService } from '@services';
import { UserStatus } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { UserManagementSearchService } from '../user-management-service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    readonly UserStatus = UserStatus;
    roasterID: any;
    breadCrumbItem: MenuItem[] = [];
    termStatus;
    termRole;
    termRoleName;
    termSearch = '';
    tableColumns: any = [];
    currentRoleID;
    roleList: any = [];
    statusFilterArray: any = [];
    isAddMember = false;
    modalRef: BsModalRef;
    loginId: any;
    tableRows;
    @ViewChild('input') input: ElementRef;
    menuItems = [
        {
            label: 'user_management',
            routerLink: 'accepted',
        },
        {
            label: 'pending_invitations',
            routerLink: 'pending-invitations',
        },
    ];

    constructor(
        public router: Router,
        private roasterService: RoasterserviceService,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public userService: UserService,
        public sharedService: SharedServiceService,
        public dialogSrv: DialogService,
        private authService: AuthService,
        private userManagementSearchService: UserManagementSearchService,
    ) {}

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.tableRows = 10;
        this.statusFilterArray = [
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'Inactive' },
        ];
        this.loginId = this.authService.userId;
        this.roasterID = this.authService.getOrgId();
        this.route.queryParams.subscribe((params) => {
            this.currentRoleID = Number(params.roleID);
            this.isAddMember = params.isAddMember && params.isAddMember === 'true' ? true : false;
            this.supplyBreadCrumb();
            this.listRoles();
        });
    }

    onSearch(search) {
        this.userManagementSearchService.setSearch(this.termSearch);
    }

    onRole() {
        this.userManagementSearchService.setRole(this.termRole);
    }

    onAllRole() {
        this.userManagementSearchService.setAllRole(this.currentRoleID);
    }

    onStatus() {
        this.userManagementSearchService.setStatus(this.termStatus);
    }

    listRoles(): void {
        this.roasterService.getRoles(this.roasterID).subscribe(
            (response: any) => {
                if (response.success) {
                    const getCurrentRole: any = response.result.find((ele) => ele.id === this.currentRoleID);
                    if (!this.isAddMember) {
                        this.termRole = this.currentRoleID;
                        this.termRoleName = getCurrentRole ? getCurrentRole.name : '';
                    }
                }
                this.roleList = response.result;
            },
            (err) => {
                console.error(err);
            },
        );
    }

    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.team_management,
            disabled: false,
        };
        const obj4: MenuItem = { label: this.globals.languageJson?.manage_roles };
        if (!this.isAddMember) {
            obj4.label = this.globals.languageJson?.user_management;
        }
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj4);
    }

    inviteNewMembers() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                roleID: encodeURIComponent(this.currentRoleID),
            },
        };
        this.router.navigate(['/team-management/invite-member'], navigationExtras);
    }
}
