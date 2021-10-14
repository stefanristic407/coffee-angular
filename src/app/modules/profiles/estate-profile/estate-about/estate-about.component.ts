import { Component, OnInit, Input } from '@angular/core';
import { OrganizationType } from '@enums';
import { AclService, GlobalsService, RoasterService, ChatHandlerService, UserService } from '@services';
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
        public userService: UserService,
        public globals: GlobalsService,
        public roasterService: RoasterService,
        private toastrService: ToastrService,
        private aclService: AclService,
        private chatHandler: ChatHandlerService,
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

    openChat(contactData): void {
        this.userService.getUserDetail(contactData.user_id, OrganizationType.ESTATE).subscribe((res) => {
            if (res.success) {
                console.log(res.result);
                this.chatHandler.openChatThread({
                    user_id: contactData.user_id,
                    org_type: OrganizationType.ESTATE,
                    org_id: res.result.organization_id,
                });
            }
        });
    }

    certificateClicked(certificate) {
        window.open(certificate.public_url, '_blank');
    }
}
