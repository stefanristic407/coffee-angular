import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserserviceService } from '@services';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-important-contacts',
    templateUrl: './important-contacts.component.html',
    styleUrls: ['./important-contacts.component.scss'],
})
export class ImportantContactsComponent implements OnInit, OnChanges {
    @Input() customerType: any;
    hrContacts: any;
    constructor(public customerService: CustomerServiceService, private userService: UserserviceService) {}
    ngOnChanges(): void {
        this.horecaEmployees();
        console.log(this.customerType);
    }

    ngOnInit(): void {}

    horecaEmployees() {
        console.log(this.customerType);
        if (this.customerType === 'hrc') {
            this.userService.getHorecaContacts(this.customerService.horecaId).subscribe((res: any) => {
                if (res.success) {
                    this.hrContacts = res.result;
                    console.log(this.hrContacts + 'micro-roasters');
                }
            });
        } else if (this.customerType === 'micro-roasters') {
            this.userService.getMicroroasterContacts(this.customerService.microId).subscribe((res: any) => {
                if (res.success) {
                    this.hrContacts = res.result;
                    console.log(this.hrContacts + 'hrc');
                }
            });
        }
    }
}
