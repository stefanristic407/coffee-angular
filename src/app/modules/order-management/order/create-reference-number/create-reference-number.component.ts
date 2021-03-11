import { Component, Input } from '@angular/core';
import { OrderManagementService } from '../../order-management.service';

@Component({
    selector: 'app-create-reference-number',
    templateUrl: './create-reference-number.component.html',
    styleUrls: ['./create-reference-number.component.scss'],
})
export class CreateReferenceNumberComponent {
    @Input() refNumber: string;
    @Input() orderId: number;

    constructor(private orderService: OrderManagementService) {}

    save(val: string): void {
        const trimmedVal = (val || '').trim();
        if (trimmedVal) {
            this.orderService.createReferenceNumber(this.orderId, trimmedVal).subscribe((res) => {
                if (res.success) {
                    this.refNumber = trimmedVal;
                }
            });
        }
    }
}
