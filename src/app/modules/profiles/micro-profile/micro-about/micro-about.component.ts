import { Component, OnInit, Input } from '@angular/core';
import { UserserviceService, ChatHandlerService } from '@services';
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
        private chatHandler: ChatHandlerService,
    ) {}

    ngOnInit(): void {
        this.getCertificates();
        this.profileCreationService.getcontactList(this.microRoasterId);
        this.getBranches();
    }

    getCertificates() {
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

    getBranches() {
        // this.userService.getBranches(this.microRoasterId).subscribe((res: any) => {
        //     console.log('branches: ', res);
        //     if (res.success) {
        //         this.branches = res.result;
        //     }
        // });
    }

    openChat(contactData): void {
        this.userService.getUserDetail(contactData.user_id, OrganizationType.MICRO_ROASTER).subscribe((res) => {
            if (res.success) {
                this.chatHandler.openChatThread({
                    user_id: contactData.user_id,
                    org_type: OrganizationType.MICRO_ROASTER,
                    org_id: res.result.organization_id,
                });
            }
        });
    }
}
