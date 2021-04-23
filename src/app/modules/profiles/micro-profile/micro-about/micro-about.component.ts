import { AfterViewInit, Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { maxWordCountValidator } from '@utils';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { COUNTRY_LIST } from '@constants';
import { Country } from '@models';
import { MicroProfileService } from '../micro-profile.service';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-micro-about',
    templateUrl: './micro-about.component.html',
    styleUrls: ['./micro-about.component.scss'],
})
export class MicroAboutComponent implements OnInit, AfterViewInit {
    ownerName?: string;
    foundedIn?: any;
    summary: string;
    kgs: any = '';
    capacity: string;
    capabilities: string;
    maleNum: string;
    femaleNum: string;
    employeeAvg: any;
    employeeNos: any;
    brandName: string;
    shortFescr: string;
    empName = '';
    certificatesArray: any = [];
    userId: any;
    single: any[];
    view: any[] = [300, 200];
    // options
    gradient = true;
    showLegend = false;
    showLabels = false;
    isDoughnut = false;
    legendPosition = 'below';

    colorScheme = {
        domain: ['#747588', '#f8f8f8'],
    };
    contacts = [
        {
            contactid: '',
        },
    ];
    addBtn = true;
    assignRow = false;
    assignButtonValue = 'Add Contact';
    filteredBrands = [];
    chartData: any;
    @ViewChild('brandImageInput', { static: true }) brandImageInput: ElementRef;

    kgsOptions = [
        { name: 'kg', value: 'kg' },
        { name: 'lb', value: 'lb' },
    ];

    roasterUsersOptions?: any[];
    aboutForm: FormGroup;
    branchForm: FormGroup;

    isSaveMode: boolean;
    isEditMode: boolean;
    employeeId: any;

    brandImageUrl = 'assets/images/default-brand.png';

    // brand cropped image relative values
    branches: any[] = [];
    countryList = COUNTRY_LIST;
    cityList: any[];

    @Input() microRoasterId;

    constructor(
        public profileCreationService: MicroProfileService,
        public userService: UserserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
    ) {
        this.userId = this.cookieService.get('user_id');
    }

    ngOnInit(): void {
        this.getCertificates();
        this.profileCreationService.getcontactList(this.microRoasterId);
        this.getBranches();
    }

    getCertificates() {
        if (this.globals.checkItem('certificate-list') || this.globals.checkItem('certificate-management')) {
            this.userService
                .getGeneralCertificates(this.microRoasterId, OrganizationType.MICRO_ROASTER)
                .subscribe((result: any) => {
                    if (result.success === true) {
                        this.certificatesArray = result.result;
                    } else {
                        this.toastrService.error('Error in loading Roaster Certificates');
                    }
                });
        }
    }

    getBranches() {
        // this.userService.getBranches(this.microRoasterId).subscribe((res: any) => {
        //     console.log('branches: ', res);
        //     if (res.success) {
        //         this.branches = res.result;
        //     }
        // });
    }
    ngAfterViewInit(): void {
        console.log('this.brandImageInput: ', this.brandImageInput);
    }
}
