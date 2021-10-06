import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, RoasterService, GreenGradingService, AuthService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { LazyLoadEvent } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
    selector: 'app-assign-user',
    templateUrl: './assign-user.component.html',
    styleUrls: ['./assign-user.component.scss'],
})
export class AssignUserComponent implements OnInit {
    tableData: any[] = [];
    tableColumns: any[] = [];
    isMobileView = false;
    loading = false;
    selectedUser: any;

    selectedRole: any;
    selectedStatus: any;
    keywords: string;
    totalCount = 0;

    roasterId: number;
    orderId: any;

    statusList: any[] = [
        {
            title: 'Active',
            value: 'ACTIVE',
        },
        {
            title: 'Inactive',
            value: 'INACTIVE',
        },
    ];
    roleList: any[];

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        public globals: GlobalsService,
        private cookieService: CookieService,
        private roasterService: RoasterService,
        private greenGradingService: GreenGradingService,
        private toaster: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        public location: Location,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(async (params) => {
            this.orderId = params.order_id;
        });
        this.roasterId = this.authService.getOrgId();
        this.initializeTable();
        this.loading = true;
        this.getRoleList();
        this.loadData();
    }

    getRoleList() {
        this.roasterService.getRoles().subscribe((res: any) => {
            if (res.success === true) {
                this.roleList = res.result;
            }
        });
    }

    loadData(event?: LazyLoadEvent): void {
        console.log(event);
        let page = 1;
        if (event) {
            page = event.first / event.rows + 1;
        }
        setTimeout(() => (this.loading = true), 0); // To prevent expression has been checked error
        const options = {
            page,
            per_page: 10,
            name: this.keywords ?? '',
            status: this.selectedStatus ?? '',
            role_id: this.selectedRole ?? '',
            sort_by: event?.sortField === 'name' ? 'firstname' : event?.sortField,
            sort_order: event?.sortOrder === 1 ? 'asc' : 'desc',
        };
        this.roasterService.getOrgUsers(options).subscribe((requestData: any) => {
            if (requestData.success === true) {
                this.tableData = requestData.result;
                this.totalCount = requestData.result_info.total_count;
            }
            this.loading = false;
        });
    }

    initializeTable() {
        this.isMobileView = window.innerWidth <= 767;
        if (this.isMobileView) {
            this.tableColumns = [
                {
                    field: 'name',
                    header: this.globals.languageJson?.name,
                    sortable: true,
                },
                {
                    field: 'last_login_at',
                    header: this.globals.languageJson?.last_login,
                    sortable: true,
                },
                {
                    field: 'roles',
                    header: 'Roll',
                    sortable: false,
                },
            ];
        } else {
            this.tableColumns = [
                {
                    field: 'name',
                    header: this.globals.languageJson?.name,
                    sortable: true,
                },
                {
                    field: 'last_login_at',
                    header: this.globals.languageJson?.last_login,
                    sortable: true,
                },
                {
                    field: 'email',
                    header: this.globals.languageJson?.email,
                    sortable: false,
                },
                {
                    field: 'status',
                    header: this.globals.languageJson?.status,
                    sortable: false,
                },
                {
                    field: 'roles',
                    header: this.globals.languageJson?.all_roles,
                    sortable: true,
                },
            ];
        }
    }

    onClickAssign() {
        this.greenGradingService.assignUser(this.orderId, this.selectedUser.id).subscribe((res) => {
            if (res.success === true) {
                this.toaster.success('Successfully assigned');
                this.location.back();
            } else {
                this.toaster.error('This user cannot be assigned to request');
            }
        });
    }
}
