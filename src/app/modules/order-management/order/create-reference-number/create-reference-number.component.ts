import { Component, Input } from '@angular/core';
import { OrderManagementService } from '../../order-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-reference-number',
    templateUrl: './create-reference-number.component.html',
    styleUrls: ['./create-reference-number.component.scss'],
})
export class CreateReferenceNumberComponent {
    @Input() refNumber: string;
    @Input() orderId: number;

    editMode = false;

    constructor(private toasterSrv: ToastrService, private orderService: OrderManagementService) {}

    save(val: string): void {
        const trimmedVal = (val || '').trim();
        if (trimmedVal) {
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
