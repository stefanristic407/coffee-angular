import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-details-customer-status',
    templateUrl: './details-customer-status.component.html',
    styleUrls: ['./details-customer-status.component.scss'],
})
export class DetailsCustomerStatusComponent implements OnInit, OnChanges {
    isStatusOptions: any[] = [
        { label: 'Active', value: true },
        { label: 'Disable', value: false },
    ];
    isStatus: any;
    roasterId: any;
    @Input() customerType: string;
    constructor(public customerService: CustomerServiceService, public cookieService: CookieService) {}

    ngOnChanges(): void {
        this.isStatus = this.isStatusOptions.find((element) => element.value === this.customerService.btnToggle);
    }

    ngOnInit(): void {}

    onBtnAction(): void {
        if (this.customerType === 'hrc') {
            this.customerService.activeStatus('horeca');
        } else if (this.customerType === 'micro-roasters') {
            this.customerService.activeStatus('micro-roaster');
        }
    }
}
