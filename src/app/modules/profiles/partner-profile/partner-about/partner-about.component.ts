import { Component, OnInit, Input } from '@angular/core';
import { OrganizationType } from '@enums';
import { GlobalsService, RoasterserviceService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { PartnerProfileService } from '../partner-profile.service';

@Component({
    selector: 'app-partner-about',
    templateUrl: './partner-about.component.html',
    styleUrls: ['./partner-about.component.scss'],
})
export class PartnerAboutComponent implements OnInit {
    @Input() horecaId;
    partners: any[] = [];
    partnerImageUrl = 'assets/images/default-avatar.png';

    constructor(
        public profileCreationService: PartnerProfileService,
        public userService: UserService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.profileCreationService.getcontactList(this.horecaId);
    }
}
