import { Component, OnInit } from '@angular/core';
import { FACILITATOR_SERVICES, QUANTIRY_UNIT_LIST } from '@constants';
import { OrganizationType, ServiceType } from '@enums';
import { ChatHandlerService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    readonly OrgType = OrganizationType;
    readonly QUANTIRY_UNIT_LIST = QUANTIRY_UNIT_LIST;
    readonly ServiceType = ServiceType;

    certificates: any = [];
    brands = [];
    branches: any[] = [];
    partners: any[] = [];
    partnerImageUrl = 'assets/images/default-avatar.png';

    serviceOptions = [];
    selectedService: ServiceType;
    serviceDescription = '';
    millingContent: any;

    constructor(
        private chatHandler: ChatHandlerService,
        private toastrService: ToastrService,
        private userService: UserService,
        public profileService: ProfileService,
    ) {}

    ngOnInit(): void {
        this.getCertificates();
        this.profileService.getContactList();
        if (this.profileService.orgType === OrganizationType.ROASTER) {
            this.getBrands();
        }
        if (this.profileService.orgType === OrganizationType.MICRO_ROASTER) {
            this.getBranches();
        }
        if (this.profileService.orgType === OrganizationType.FACILITATOR) {
            this.getFcServices();
        }
        if (this.profileService.orgType === OrganizationType.HORECA) {
            this.getPartners();
        }
    }

    getCertificates() {
        this.userService
            .getGeneralCertificates(this.profileService.orgId, this.profileService.orgType)
            .subscribe((result: any) => {
                if (result.success) {
                    this.certificates = result.result || [];
                } else {
                    this.toastrService.error('Error while loading certificates');
                }
            });
    }

    getBrands() {
        this.userService.getPublicBrands(this.profileService.orgId).subscribe((res) => {
            if (res.success) {
                this.brands = res.result || [];
            }
        });
    }

    getBranches() {
        this.userService.getPublicBranches(this.profileService.orgId).subscribe((res: any) => {
            if (res.success) {
                this.branches = res.result || [];
            }
        });
    }

    getFcServices() {
        this.userService.getPublicServices(this.profileService.orgId).subscribe((res: any) => {
            if (res.success) {
                this.serviceOptions = [];
                (res.result || []).map((item: any) => {
                    if (item.is_approved) {
                        this.serviceOptions.push({
                            name: this.getServiceName(item.slug),
                            code: item.slug,
                        });
                    }
                });
                this.selectedService = this.serviceOptions.length > 0 ? this.serviceOptions[0].code : null;
                this.viewService(this.selectedService);
            }
        });
    }

    getServiceName(slug) {
        return FACILITATOR_SERVICES.find((item) => item.slug === slug)?.name;
    }

    onChangeService() {
        this.viewService(this.selectedService);
    }

    viewService(slug: ServiceType) {
        this.userService.getPublicService(this.profileService.orgId, slug).subscribe((res: any) => {
            if (res.success) {
                if (slug === ServiceType.MILLING) {
                    this.millingContent = res.result;
                } else {
                    this.serviceDescription = res.result.description;
                }
            }
        });
    }

    getPartners() {
        this.userService.getPublicPartners(this.profileService.orgId).subscribe((res: any) => {
            if (res.success) {
                this.partners = res.result;
            }
        });
    }

    openChat(contactData): void {
        this.userService.getUserDetail(contactData.user_id, this.profileService.orgType).subscribe((res: any) => {
            if (res.success) {
                this.chatHandler.openChatThread({
                    user_id: contactData.user_id,
                    org_type: this.profileService.orgType,
                    org_id: res.result.organization_id,
                });
            }
        });
    }
}
