import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { AclService, GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
    roasterId: any;
    breadCrumbItem: MenuItem[] = [];
    tableColumns: any = [];
    tableValue: any = [];
    tableSelected: any = [];
    totalCount = 0;
    loader = true;
    constructor(
        public router: Router,
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public sharedService: SharedServiceService,
        public dialogSrv: DialogService,
        private aclService: AclService,
    ) {}

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.tableColumns = [
            {
                field: 'user_count',
                header: 'number_of_members',
                sortable: false,
                width: 30,
            },
            {
                field: 'name',
                header: 'roles',
                sortable: false,
                width: 50,
            },
            {
                field: 'add_user',
                header: '',
                width: 40,
            },
            {
                field: 'actions',
                header: 'actions',
                sortable: false,
                width: 10,
            },
        ];
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        if (!this.aclService.checkPermission('acl-management')) {
            this.router.navigate(['/error/permission-error']);
        }
        this.supplyBreadCrumb();
        this.roasterId = this.cookieService.get('roaster_id');
    }
    getTableData(event?): void {
        this.tableValue = [];
        this.loader = true;
        const postData: any = {};
        postData.per_page = 10;
        if (event) {
            const currentPage = event.first / 10;
            postData.page = currentPage + 1;
        }
        this.roasterService.getRoles(this.roasterId, postData).subscribe(
            (res: any) => {
                this.loader = false;
                if (res.success === true) {
                    this.tableValue = res.result;
                    this.totalCount = res.result_info && res.result_info.total_count ? res.result_info.total_count : 0;
                }
            },
            (err) => {
                this.loader = false;
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
            routerLink: '//team-management/manage-role',
            disabled: false,
        };
        const obj4: MenuItem = { label: this.globals.languageJson?.manage_roles };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj4);
    }
    teamMembers(rowData, isAdd = false): void {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                roleID: encodeURIComponent(rowData.id),
                isAddMember: isAdd,
            },
        };
        this.router.navigate(['/team-management/team-members'], navigationExtras);
    }
    openDeleteModal(deleteId: any): void {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Oh noh :(',
                    desp: 'You sure you really want to delete this?',
                    type: 'delete',
                    noButton: 'Cancel',
                    yesButton: 'Delete',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.deleteRole(deleteId);
                }
            });
    }
    deleteRole(id: any) {
        this.roasterService.deleteRoles(this.roasterId, id).subscribe((data: any) => {
            if (data.success === true) {
                this.toastrService.success('Roles deleted successfully!');
                this.getTableData();
            } else {
                this.toastrService.error('There are Users assigned to this role.');
            }
        });
    }
    updateRole(id: any): void {
        this.router.navigate(['/team-management/create-role', id]);
    }
    duplicateRole(id: any): void {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                duplicate: true,
            },
        };
        this.router.navigate(['/team-management/create-role', id], navigationExtras);
    }
}
