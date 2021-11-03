import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { TranslateService } from '@ngx-translate/core';
import { ResizeService, RoasterService } from '@services';
import { ConfirmComponent } from '@shared';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent extends ResizeableComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    tableColumns: any = [];
    tableValue: any = [];
    tableSelected: any = [];
    totalCount = 0;
    rows = 10;
    loading = true;

    constructor(
        private dialogSrv: DialogService,
        private roasterService: RoasterService,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
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
        this.supplyBreadCrumb();
    }

    getTableData(event?): void {
        this.tableValue = [];
        this.loading = true;
        const postData: any = {};
        postData.per_page = this.rows;
        if (event) {
            const currentPage = event.first / this.rows;
            postData.page = currentPage + 1;
        }
        this.roasterService.getRoles(postData).subscribe(
            (res: any) => {
                this.loading = false;
                if (res.success === true) {
                    this.tableValue = res.result;
                    this.totalCount = res.result_info && res.result_info.total_count ? res.result_info.total_count : 0;
                }
            },
            (err) => {
                this.loading = false;
                console.error(err);
            },
        );
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('team_management') },
            { label: this.translator.instant('manage_roles') },
        ];
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
                    desp: 'Are you sure you really want to delete this?',
                    type: 'delete',
                    noButton: 'Cancel',
                    yesButton: 'Delete',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.deleteRole(deleteId);
                }
            });
    }

    deleteRole(id: number) {
        this.roasterService.deleteRole(id).subscribe((data: any) => {
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

    getMenuItemsForItem(item) {
        return [
            { label: this.translator.instant('add_members'), command: () => this.teamMembers(item, true) },
            { label: this.translator.instant('view_members'), command: () => this.teamMembers(item) },
            {
                label: this.translator.instant(item.is_system ? 'view' : 'edit'),
                command: () => this.updateRole(item.id),
            },
            { label: this.translator.instant('duplicate_role'), command: () => this.duplicateRole(item.id) },
            {
                label: this.translator.instant('delete_role'),
                command: () => this.openDeleteModal(item.id),
                visible: !item.is_system,
            },
        ];
    }
}
