import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { GlobalsService, RoasterserviceService } from '@services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
    roaster_id: any;
    breadCrumbItem: MenuItem[] = [];
    tableColumns: any = [];
    tableValue: any = [];
    tableSelected: any = [];
    totalCount = 0;
    modalRef: BsModalRef;
    deleteRoleID: any;
    constructor(
        public router: Router,
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public sharedService: SharedServiceService,
        private modalService: BsModalService,
    ) {}

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.tableColumns = [
            {
                field: 'user_count',
                header: 'Number of Members',
                sortable: false,
                width: 30,
            },
            {
                field: 'name',
                header: 'Roles',
                sortable: false,
                width: 50,
            },
            {
                field: 'add_user',
                header: '',
                width: 30,
            },
            {
                field: 'actions',
                header: 'Actions',
                sortable: false,
                width: 10,
            },
        ];
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        if (!this.globals.checkItem('acl-management') && !this.globals.checkItem('acl-list')) {
            this.router.navigate(['/people/permission-error']);
        }
        this.supplyBreadCrumb();
        this.roaster_id = this.cookieService.get('roaster_id');
    }
    getTableData(event?): void {
        this.tableValue = [];
        this.roasterService.getRoles(this.roaster_id).subscribe(
            (res) => {
                if (res['success'] == true) {
                    this.tableValue = res['result'];
                    this.totalCount =
                        res['result_info'] && res['result_info']['total_count'] ? res['result_info']['total_count'] : 0;
                }
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
        const obj4: MenuItem = { label: this.globals.languageJson?.manage_roles, disabled: true };
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
        this.router.navigate(['/people/team-members'], navigationExtras);
    }
    openDeleteModal(template1: TemplateRef<any>, deleteId: any): void {
        this.modalRef = this.modalService.show(template1);
        this.deleteRoleID = deleteId;
    }
    deleteRole(id: any) {
        this.roasterService.deleteRoles(this.roaster_id, id).subscribe((data) => {
            if (data['success'] == true) {
                this.toastrService.success('Roles deleted successfully!');
                $('#tr_' + id).hide();
                $('body').trigger('click');
                this.getTableData();
            } else {
                this.toastrService.error('There are Users assigned to this role.');
            }
        });
    }
    updateRole(id: any): void {
        this.router.navigate(['/people/create-role', id]);
    }
}
