import { Injectable } from '@angular/core';
import { AuthService, CommonService, RoasterserviceService, SimulatedLoginService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiResponse } from '@models';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class CustomerServiceService {
    roasterId: number;
    microId: any;
    horecaId: any;
    name: any;
    customerDetail: any;
    company_name: any;
    owner_name: any;
    company_image_url: any;
    country: any;
    description: any;
    company_type: any;
    status: any;
    founded_on: any;
    discount_percentage: any;
    admin_id: any;
    website: any;
    email: any;
    btnToggle = true;
    statusChange: string;
    total_employees: any;
    capacity: any;
    capacity_unit: any;
    emailId: any;
    pendingList: any;
    pendingHorecaList: any;
    admin_name: any;
    pendingCompany: any;
    pendingEmail: any;
    pendingStatus: any;
    headerValue: any;
    pendingType: any;

    constructor(
        private roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private userService: UserserviceService,
        private simulatedLoginService: SimulatedLoginService,
        private commonService: CommonService,
        private toastrService: ToastrService,
        private router: Router,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    mrCustomerDetails() {
        this.userService.getMicroDetails(this.roasterId, this.microId).subscribe((res: ApiResponse<any>) => {
            if (res.success) {
                const result = res.result;
                this.customerDetail = res.result;
                this.name = result.name;
                this.company_name = result.company_name;
                this.admin_name = result.admin_name;
                this.owner_name = result.owner_name;
                this.company_image_url = result.company_image_url;
                this.country = result.country;
                this.description = result.description;
                this.status = result.status;
                this.btnToggle = this.status === 'ACTIVE' ? true : false;
                this.company_type = result.company_type;
                this.founded_on = result.founded_on;
                this.admin_id = result.admin_id;
                this.discount_percentage = result.discount_percentage;
                this.email = result.email;
                this.website = result.website;
                this.total_employees = result.total_employees;
                this.capacity = result.capacity;
                this.capacity_unit = result.capacity_unit;
            } else {
                this.toastrService.error(' Error while getting the details');
                this.router.navigate(['/features/customer-management']);
            }
        });
    }

    hrcCustomerDetails() {
        this.userService.getHorecaDetails(this.roasterId, this.horecaId).subscribe((res: ApiResponse<any>) => {
            if (res.success) {
                const result = res.result;
                this.customerDetail = res.result;
                this.name = result.name;
                this.company_name = result.company_name;
                this.owner_name = result.owner_name;
                this.admin_name = result.admin_name;
                this.company_image_url = result.company_image_url;
                this.country = result.country;
                this.description = result.description;
                this.status = result.status;
                this.btnToggle = this.status === 'ACTIVE' ? true : false;
                this.company_type = result.company_type;
                this.founded_on = result.founded_on;
                this.admin_id = result.admin_id;
                this.discount_percentage = result.discount_percentage;
                this.email = result.email;
                this.website = result.website;
            } else {
                this.toastrService.error(' Error while getting the details');
                this.router.navigate(['/features/customer-management']);
            }
        });
    }

    activeStatus(value: any) {
        if (value === 'horeca') {
            this.btnToggle = !this.btnToggle;
            if (this.btnToggle) {
                this.statusChange = 'ACTIVE';
                this.userService
                    .updateHorecaEnable(this.roasterId, this.horecaId)
                    .subscribe((res: ApiResponse<any>) => {
                        if (res.success) {
                            this.hrcCustomerDetails();
                            this.toastrService.success('Company Account has been Enabled');
                        } else {
                            this.toastrService.error('Error while enabling the company account');
                        }
                    });
            } else {
                this.statusChange = 'INACTIVE';
                this.userService
                    .updateHorecaDisable(this.roasterId, this.horecaId)
                    .subscribe((res: ApiResponse<any>) => {
                        if (res.success) {
                            this.hrcCustomerDetails();
                            this.toastrService.success('Company Account has been Disabled');
                        } else {
                            this.toastrService.error('Error while disabling the company account');
                        }
                    });
            }
        } else {
            this.btnToggle = !this.btnToggle;
            if (this.btnToggle) {
                this.statusChange = 'ACTIVE';
                this.userService
                    .updateMicroRoasterEnable(this.roasterId, this.microId)
                    .subscribe((res: ApiResponse<any>) => {
                        if (res.success) {
                            this.mrCustomerDetails();
                            this.toastrService.success('Company Account has been Enabled');
                        } else {
                            this.toastrService.error('Error while enabling the company account');
                        }
                    });
            } else {
                this.statusChange = 'INACTIVE';
                this.userService
                    .updateMicroRoasterDisable(this.roasterId, this.microId)
                    .subscribe((res: ApiResponse<any>) => {
                        if (res.success) {
                            this.mrCustomerDetails();
                            this.toastrService.success('Company Account has been Disabled');
                        } else {
                            this.toastrService.error('Error while disabling the company account');
                        }
                    });
            }
        }
    }

    pendingMrDetails() {
        this.userService
            .getMrCustomerPendingDetails(this.roasterId, this.emailId)
            .subscribe((res: ApiResponse<any>) => {
                if (res.success) {
                    this.pendingList = res.result[0];
                    this.pendingCompany = this.pendingList.name;
                    this.pendingEmail = this.pendingList.email;
                    this.pendingStatus = this.pendingList.status;
                    this.headerValue = 'Micro-Roaster';
                    console.log(this.pendingList);
                }
            });
    }

    pendingHorecaDetails() {
        this.userService.getCustomerPendingDetails(this.roasterId, this.emailId).subscribe((res: ApiResponse<any>) => {
            if (res.success) {
                this.pendingHorecaList = res.result[0];
                this.pendingCompany = this.pendingHorecaList.name;
                this.pendingEmail = this.pendingHorecaList.email;
                this.pendingStatus = this.pendingHorecaList.status;
                this.pendingType = this.pendingHorecaList.type;
                this.headerValue = 'HoReCa';
                console.log(this.pendingHorecaList);
            }
        });
    }

    customerSimulatedLogin(orgType: OrganizationType, orgId: number) {
        this.simulatedLoginService.customerSimulatedLogin(orgType, orgId).subscribe((res: any) => {
            if (res.success) {
                this.commonService.goSimulatedPortal(orgType, res.result.token, orgId);
            }
        });
    }
}
