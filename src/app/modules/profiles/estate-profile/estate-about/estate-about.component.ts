import { Component, OnInit, Input } from '@angular/core';
import { OrganizationType } from '@enums';
import { AclService, GlobalsService, RoasterserviceService, UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { EstateProfileService } from '../estate-profile.service';

@Component({
    selector: 'app-estate-about',
    templateUrl: './estate-about.component.html',
    styleUrls: ['./estate-about.component.scss'],
})
export class EstateAboutComponent implements OnInit {
    @Input() estateId;
    certificatesArray: any = [];
    single: any[];
    branches: any[] = [];
    brands = [];
    filteredBrands = [];

    constructor(
        public profileCreationService: EstateProfileService,
        public userService: UserserviceService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        private aclService: AclService,
    ) {}

    ngOnInit(): void {
        this.getCertificates();
        this.profileCreationService.getcontactList(this.estateId);
    }

    getCertificates() {
        this.userService.getGeneralCertificates(this.estateId, OrganizationType.ESTATE).subscribe((result: any) => {
            if (result.success === true) {
                this.certificatesArray = result.result;
            } else {
                this.toastrService.error('Error in loading Estate Profile Certificates');
            }
        });
    }
}
