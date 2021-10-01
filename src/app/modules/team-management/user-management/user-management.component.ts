import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { RoasterserviceService } from '@services';
import { UserStatus } from '@enums';
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
    showAddbutton = true;

    constructor(
        private roasterService: RoasterserviceService,
        private route: ActivatedRoute,
        private router: Router,
        private translator: TranslateService,
        private userManagementSearchService: UserManagementSearchService,
    ) {}

    ngOnInit(): void {
        this.menuItems = [
            {
                label: this.translator.instant('user_management'),
                routerLink: 'accepted',
                command: () => (this.showAddbutton = true),
            },
            {
                label: this.translator.instant('pending_invitations'),
                routerLink: 'pending-invitations',
                command: () => (this.showAddbutton = false),
            },
        ];
        this.statusFilterArray = [
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'Inactive' },
        ];
        this.route.queryParams.subscribe((params) => {
            this.currentRoleID = Number(params.roleID);
            this.isAddMember = params.isAddMember && params.isAddMember === 'true' ? true : false;
            this.supplyBreadCrumb();
            this.listRoles();
        });
        this.showAddbutton =
            this.router.routerState.snapshot.url === '/team-management/team-members/accepted' ? true : false;
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
