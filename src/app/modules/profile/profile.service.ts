import { Injectable } from '@angular/core';
import { ContactGroup, OrganizationType } from '@enums';
import { OrganizationProfile } from '@models';
import { OrganizationService, UserService } from '@services';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    orgType: OrganizationType;
    orgId: number;

    isLoading = true;

    organizationProfile: OrganizationProfile;
    topContacts: any = [];
    parentTopContacts: any = [];
    myTopContacts: any = [];
    employeeChartData: { name: string; value: any }[];

    constructor(private newUserService: UserService, private organizationService: OrganizationService) {}

    clearData() {
        this.organizationProfile = null;
        this.topContacts = [];
        this.parentTopContacts = [];
        this.myTopContacts = [];
    }

    getProfile() {
        this.isLoading = true;
        this.clearData();
        this.organizationService.getGeneralProfile(this.orgId, this.orgType).subscribe((result) => {
            if (result) {
                this.organizationProfile = result;

                if (this.orgType === OrganizationType.ESTATE) {
                    this.employeeChartData = [
                        { name: 'Full time', value: this.organizationProfile.full_time_employee_count || 0 },
                        { name: 'Part time', value: this.organizationProfile.part_time_employee_count || 0 },
                    ];
                } else {
                    this.employeeChartData = [
                        { name: 'Female', value: this.organizationProfile.female_employee_count || 0 },
                        { name: 'Male', value: this.organizationProfile.male_employee_count || 0 },
                    ];
                }
                if (this.orgType === OrganizationType.HORECA && result.partner_id) {
                    this.getParentContacts(result.partner_id);
                }
            }
            this.isLoading = false;
        });
    }

    getContactList() {
        this.newUserService.getGeneralContactList(this.orgId, this.orgType).subscribe((res: any) => {
            if (res.success) {
                this.myTopContacts = res.result || [];
                this.topContacts = this.myTopContacts.concat(this.parentTopContacts);
            }
        });
    }

    getParentContacts(parentId) {
        this.newUserService.getGeneralContactList(parentId, this.orgType).subscribe((res: any) => {
            if (res.success) {
                this.parentTopContacts = res.result || [];
                this.topContacts = this.myTopContacts.concat(this.parentTopContacts);
            }
        });
    }
}
