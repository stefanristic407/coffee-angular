import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserserviceService } from 'src/services/users/userservice.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { SharedServiceService } from '@app/shared/services/shared-service.service';

@Component({
    selector: 'app-roasting-profiles',
    templateUrl: './roasting-profiles.component.html',
    styleUrls: ['./roasting-profiles.component.scss'],
})
export class RoastingProfilesComponent implements OnInit {
    roleId: any;
    termStatus: any;
    teamRole: any;
    roleID: string;
    roasterId: any;
    appLanguage?: any;
    profileID: any;
    modalRef: BsModalRef;
    deleteProfileId: any;
    roasterLevels = {
        1: 'Light',
        2: 'Light Medium',
        3: 'Medium',
        4: 'Medium Dark',
        5: 'Dark',
    };
    breadItems = [
        { label: 'Home', routerLink: '/roaster-dashboard' },
        { label: 'Inventory' },
        { label: 'Roasted coffee', routerLink: '/features/roasted-coffee-batch' },
        { label: 'Roasting profiles' },
    ];
    searchForm: FormGroup;
    roastLevelArray: any = [];
    roastLevelFilter;
    roasterID: any = '';
    tableColumns = [];
    tableValue = [];
    totalCount = 0;
    termSearch = '';
    selectedProfiles = [];
    popupDisplay = false;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public userService: UserserviceService,
        private fb: FormBuilder,
        public sharedService: SharedServiceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    openDeleteModal(deleteId: any) {
        this.popupDisplay = true;
        this.deleteProfileId = deleteId;
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.appLanguage = this.globals.languageJson;
        this.searchForm = this.fb.group({
            searchField: new FormControl({ value: '' }, Validators.compose([Validators.required])),
        });
        this.searchForm.setValue({ searchField: '' });
        this.searchForm.controls.searchField.valueChanges.subscribe((value) => {
            this.termSearch = value;
            this.getRoastingProfile();
        });
        this.loadFilterValues();
        this.tableColumns = [
            {
                field: 'roast_profile_name',
                header: 'Roast name',
                sortable: false,
                width: 15,
            },
            {
                field: 'roast_level',
                header: 'Roast level',
                sortable: false,
                width: 15,
            },
            {
                field: 'temperature',
                header: 'Temperature',
                width: 15,
            },
            {
                field: 'roast_duration',
                header: 'Duration',
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
        this.roastLevelArray = [
            { label: 'Light', value: 1 },
            { label: 'Light Medium', value: 2 },
            { label: 'Medium', value: 3 },
            { label: 'Medium Dark', value: 4 },
            { label: 'Dark', value: 5 },
        ];
    }

    setTeamRole(term: any, roleId: any) {
        this.teamRole = term;
        this.roleId = roleId;
    }
    getRoastingProfile() {
        const postData: any = {};
        postData.roast_level = this.roastLevelFilter ? this.roastLevelFilter : '';
        postData.search_query = this.termSearch ? this.termSearch : '';
        postData.per_page = 100;
        this.tableValue = [];
        this.roasterService.getRoastingProfile(this.roasterId, postData).subscribe(
            (data: any) => {
                if (data.success) {
                    this.tableValue = data.result;
                } else {
                    this.toastrService.error('Error while getting the roasting profile list!');
                }
            },
            (err) => {
                this.toastrService.error('Error while getting the roasting profile list!');
            },
        );
    }
    getRoastLevel(data: any) {
        if (data) {
            const roastLevelName = this.roasterLevels[data];
            return roastLevelName;
        }
    }

    redirectToEdit(item) {
        this.profileID = item;
        const navigationExtras: NavigationExtras = {
            queryParams: {
                profileID: encodeURIComponent(this.profileID),
            },
        };

        this.router.navigate(['/features/create-roasting-profile'], navigationExtras);
    }

    deleteRoastingProfile() {
        this.userService.deleteRoastingProfile(this.roasterId, this.deleteProfileId).subscribe((data) => {
            if (data.success) {
                this.toastrService.success('Roasting profile deleted successfully');
                this.getRoastingProfile();
            } else {
                this.toastrService.error('Error while deleting roasting profile');
            }
        });
    }
    filterCall() {
        this.getRoastingProfile();
    }
}
