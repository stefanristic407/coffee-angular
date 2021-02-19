import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardserviceService } from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedServiceService } from '@app/shared/services/shared-service.service';

@Component({
    selector: 'app-roasted-coffee-batches',
    templateUrl: './roasted-coffee-batches.component.html',
    styleUrls: ['./roasted-coffee-batches.component.css'],
})
export class RoastedCoffeeBatchesComponent implements OnInit {
    termRole: any;
    roles: any;
    role_id: any;
    termStatus: any;
    teamRole: any;
    showVar: boolean = true;
    showRole: boolean = true;
    term: any;
    odd: boolean = false;
    appLanguage?: any;

    mainData: any[] = [];
    roleData: string;
    roleID: string;
    roasterId: any;
    batchId: string | number | boolean;
    modalRef: BsModalRef;
    deleteBatchId: '';
    searchForm: FormGroup;
    profileArray: any = [];
    profileFilter;
    roasterID: any = '';
    tableColumns = [];
    tableValue = [];
    totalCount = 0;
    termSearch = '';
    selectedProfiles = [];
    popupDisplay = false;

    breadItems = [
        { label: 'Home', routerLink: '/roaster-dashboard' },
        { label: 'Inventory' },
        { label: 'New roasted coffee batch' },
    ];
    ordId: any;
    constructor(
        public router: Router,
        public cookieService: CookieService,
        public dashboard: DashboardserviceService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        private userService: UserserviceService,
        private modalService: BsModalService,
        public globals: GlobalsService,
        private fb: FormBuilder,
        public sharedService: SharedServiceService,
    ) {
        this.termStatus = '';
        this.termRole = '';
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.appLanguage = this.globals.languageJson;
        this.searchForm = this.fb.group({
            searchField: new FormControl({ value: '' }, Validators.compose([Validators.required])),
        });
        this.searchForm.setValue({ searchField: '' });
        this.searchForm.controls.searchField.valueChanges.subscribe((value) => {
            //   this.termSearch = value;
            this.roasterCoffeeBatchsData();
        });
        this.loadFilterValues();
        this.tableColumns = [
            {
                field: 'roast_batch_name',
                header: 'Batch name',
                sortable: false,
                width: 12,
            },
            {
                field: 'order_id',
                header: 'Order ID',
                sortable: false,
                width: 8,
            },
            {
                field: 'estate_name',
                header: 'Estate name',
                width: 15,
            },
            {
                field: 'roaster_ref_no',
                header: 'Roaster Ref. No.',
                sortable: false,
                width: 15,
            },
            {
                field: 'created_at',
                header: 'Created on',
                sortable: false,
                width: 10,
            },
            {
                field: 'roasting_profile_quantity',
                header: 'Quantity',
                sortable: false,
                width: 8,
            },
            {
                field: 'roasting_profile_name',
                header: 'Roasting profile',
                sortable: false,
                width: 15,
            },
            {
                field: 'actions',
                header: 'Actions',
                sortable: false,
                width: 15,
            },
        ];
    }

    loadFilterValues() {
        this.profileArray = [
            { label: 'Light', value: 'Light' },
            { label: 'Light Medium', value: 'Light Medium' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Medium Dark', value: 'Medium Dark' },
            { label: 'Dark', value: 'Dark' },
        ];
    }

    setTeamRole(term: any, roleId: any) {
        this.teamRole = term;
        this.role_id = roleId;
    }
    // Function Name : Status Filiter
    // Description: This function helps to filiter the users based on the selected status fiiter.

    setStatus(term: any) {
        this.termStatus = term;
        console.log(this.termStatus);
    }
    // Function Name : Roles Filiter
    // Description: This function helps to filiter the users based on the selected roles fiiter.

    setRole(term: any) {
        this.termRole = term;
    }
    toggleRole() {
        this.showRole = !this.showRole;
        if (this.showRole == false) {
            document.getElementById('role_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('role_id').style.border = '1px solid #d6d6d6';
        }
    }

    toggleStatus() {
        this.showVar = !this.showVar;
        if (this.showVar == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }

    // Table data
    roasterCoffeeBatchsData() {
        const postData: any = {};

        postData.status = this.profileFilter ? this.profileFilter : '';
        postData.name = this.termSearch ? this.termSearch : '';
        postData.per_page = 100;
        this.tableValue = [];
        this.roasterService.getRoasterCoffeeBatchs(this.roasterId, postData).subscribe(
            (data: any) => {
                if (data.success) {
                    this.tableValue = data.result;
                } else {
                    this.toastrService.error('Error while getting the roasted coffee batch list!');
                }
            },
            (err) => {
                this.toastrService.error('Error while getting the roasted coffee batch list!');
            },
        );
    }

    redirectToEdit(item) {
        this.batchId = item.id;
        this.globals.selected_order_id = item.order_id;
        this.ordId = item.order_id;

        let navigationExtras: NavigationExtras = {
            queryParams: {
                batchId: this.batchId ? this.batchId : undefined,
                ordId: this.ordId ? this.ordId : undefined,
            },
        };
        this.router.navigate(['/features/new-roasted-batch'], navigationExtras);
    }

    deleteRoastedBatch() {
        this.roasterService.deleteRoastedCoffeeBatch(this.roasterId, this.deleteBatchId).subscribe(
            (res) => {
                if (res.success) {
                    this.toastrService.success('Roasted Coffee Batch deleted successfully');
                    this.roasterCoffeeBatchsData();
                } else {
                    this.toastrService.error('Error while deletign the roasting profile');
                }
                this.popupDisplay = false;
            },
            (err) => {
                this.popupDisplay = false;
                this.toastrService.error('Error while deletign the roasting profile');
            },
        );
    }
    filterCall() {
        this.roasterCoffeeBatchsData();
    }

    openDeleteModal(deleteId: any) {
        this.popupDisplay = true;
        this.deleteBatchId = deleteId;
    }
}
