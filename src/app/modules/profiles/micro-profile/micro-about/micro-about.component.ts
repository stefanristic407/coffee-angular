import { Component, OnInit, Input } from '@angular/core';
import { AclService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { MicroProfileService } from '../micro-profile.service';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-micro-about',
    templateUrl: './micro-about.component.html',
    styleUrls: ['./micro-about.component.scss'],
})
export class MicroAboutComponent implements OnInit {
    @Input() microRoasterId;
    certificatesArray: any = [];
    single: any[];
    branches: any[] = [];

    constructor(
        public profileCreationService: MicroProfileService,
        public userService: UserserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private aclService: AclService,
    ) {}

    ngOnInit(): void {
        this.getCertificates();
        this.profileCreationService.getcontactList(this.microRoasterId);
        this.getBranches();
    }

    getCertificates() {
        if (this.aclService.checkItem('certificate-list') || this.aclService.checkItem('certificate-management')) {
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
}
