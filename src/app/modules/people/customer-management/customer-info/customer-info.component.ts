import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { OrganizationType } from '@enums';

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
    status: boolean;

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private toastrService: ToastrService,
    ) {}

    ngOnChanges(): void {
        this.status = this.data?.status === 'ACTIVE';
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

    updateForm() {
        if (this.organizationType === 'mr') {
            this.updateStatus('micro-roasters');
        } else if (this.organizationType === 'hrc') {
            this.updateStatus('hrc');
        }
    }

    updateStatus(type: any) {
        if (this.status) {
            this.customerService.enableAccount(type, this.customerID).subscribe((res) => {
                if (res.success) {
                    this.toastrService.success('Customer Enabled');
                } else {
                    this.toastrService.error('Error while enabling');
                }
            });
        } else {
            this.customerService.disableAccount(type, this.customerID).subscribe((res) => {
                if (res.success) {
                    this.toastrService.success('Customer Disabled');
                } else {
                    this.toastrService.error('Error while disabling');
                }
            });
        }
    }
}
