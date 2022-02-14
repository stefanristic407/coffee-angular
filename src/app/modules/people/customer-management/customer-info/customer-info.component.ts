import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { OrganizationType, UserStatus } from '@enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit, OnChanges {
    @Input() data: any;
    customerID: any;
    redirectLinks: any;
    organizationType: any;
    showProfile = false;
    orgType: OrganizationType;
    stateOptions = [
        { label: 'Active', value: true },
        { label: 'Disable', value: false },
    ];
    isStatus: boolean;

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private toastrService: ToastrService,
        private translator: TranslateService,
    ) {}

    ngOnChanges(): void {
        this.isStatus = this.data?.status === UserStatus.ACTIVE;
    }

    ngOnInit(): void {
        this.organizationType = this.route.snapshot.queryParams.type ? this.route.snapshot.queryParams.type : '';
        this.redirectLinks = [
            { type: 'Micro', redirectUrl: 'https://microroaster.sewnstaging.com', code: 'mr' },
            { type: 'Hrc', redirectUrl: 'https://partners.sewnstaging.com', code: 'hrc' },
        ];
        this.route.params.subscribe((params) => {
            this.customerID = params.id;
        });
    }

    updateStatus() {
        if (this.data.status === UserStatus.PENDING) {
            this.toastrService.error(this.translator.instant('pending_customer_status_cannot_change'));
            setTimeout(() => (this.isStatus = false));
            return;
        }
        if (this.isStatus) {
            this.customerService.enableAccount(this.organizationType, this.customerID).subscribe((res) => {
                if (res.success) {
                    this.toastrService.success('Customer enabled');
                } else {
                    this.toastrService.error('Error while enabling');
                }
            });
        } else {
            this.customerService.disableAccount(this.organizationType, this.customerID).subscribe((res) => {
                if (res.success) {
                    this.toastrService.success('Customer Disabled');
                } else {
                    this.toastrService.error('Error while disabling');
                }
            });
        }
    }
}
