import { Component, Input } from '@angular/core';
import { OrderManagementService } from '../../order-management.service';
import { ToastrService } from 'ngx-toastr';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-create-reference-number',
    templateUrl: './create-reference-number.component.html',
    styleUrls: ['./create-reference-number.component.scss'],
})
export class CreateReferenceNumberComponent {
    @Input() refNumber: string;
    @Input() orderId: number;
    @Input() orgType: OrganizationType;

    readonly OrgType = OrganizationType;

    editMode = false;

    constructor(private toasterSrv: ToastrService, private orderService: OrderManagementService) {}

    save(val: string): void {
        const trimmedVal = (val || '').trim();
        if (trimmedVal) {
            if (this.orgType === this.OrgType.MICRO_ROASTER) {
                this.orderService.createReferenceNumberForMrOrder(this.orderId, trimmedVal).subscribe((res) => {
                    if (res.success) {
                        this.editMode = false;
                        this.refNumber = trimmedVal;
                        this.toasterSrv.success('Order reference number has been updated.');
                    }
                });
            } else {
                this.orderService.createReferenceNumber(this.orderId, trimmedVal).subscribe((res) => {
                    if (res.success) {
                        this.editMode = false;
                        this.refNumber = trimmedVal;
                        this.toasterSrv.success('Order reference number has been updated.');
                    }
                });
            }
        }
    }
}
