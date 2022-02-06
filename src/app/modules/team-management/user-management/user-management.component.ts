import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserStatus } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { RoasterService } from '@services';
import { MenuItem } from 'primeng/api';
import { UserManagementSearchService } from '../user-management-service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    readonly UserStatus = UserStatus;
    breadCrumbItem: MenuItem[] = [];
    menuItems: MenuItem[];
    termStatus;
    termRole;
    termSearch = '';
    currentRoleID;
    roleList: any[] = [];
    statusFilterArray: any = [];
    isAddMember = false;
    get showAddbutton() {
        return this.router.routerState.snapshot.url === '/team-management/team-members/accepted' ? true : false;
    }

    constructor(
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private translator: TranslateService,
        private userManagementSearchService: UserManagementSearchService,
    ) {}

    ngOnInit(): void {
        this.menuItems = [
            { label: this.translator.instant('user_management'), routerLink: 'accepted' },
            { label: this.translator.instant('pending_invitations'), routerLink: 'pending-invitations' },
        ];
        this.statusFilterArray = [
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'Inactive' },
        ];
        this.route.queryParams.subscribe((params) => {
            this.currentRoleID = +params.roleID || null;
            this.isAddMember = params.isAddMember && params.isAddMember === 'true' ? true : false;
            this.supplyBreadCrumb();
            this.listRoles();
        });
    }

    onSearch() {
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
        this.roasterService.getRoles().subscribe(
            (response: any) => {
                if (response.success) {
                    if (!this.isAddMember) {
                        this.termRole = this.currentRoleID;
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
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('team_management') },
        ];
        if (this.isAddMember) {
            this.breadCrumbItem = this.breadCrumbItem.concat([
                { label: this.translator.instant('manage_roles'), routerLink: '/team-management/manage-role' },
                { label: this.translator.instant('add_member') },
            ]);
        } else if (this.currentRoleID) {
            this.breadCrumbItem = this.breadCrumbItem.concat([
                { label: this.translator.instant('manage_roles'), routerLink: '/team-management/manage-role' },
                { label: this.translator.instant('view_members') },
            ]);
        } else {
            this.breadCrumbItem = this.breadCrumbItem.concat([{ label: this.translator.instant('user_management') }]);
        }
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
