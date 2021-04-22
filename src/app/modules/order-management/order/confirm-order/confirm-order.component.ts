import { Component, Input } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { OrganizationType } from '@enums';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent extends DestroyableComponent {
    readonly availability$ = this.orderService.bulkDetails$.pipe(takeUntil(this.unsubscribeAll$));

    rejectMode = false;

    rejectReasonForm: FormGroup = this.fb.group({
        not_serviceable: this.fb.control(false),
        out_of_stock: this.fb.control(false),
        other: this.fb.control(false),
    });

    @Input() orderId = 0;
    @Input() orgType: OrganizationType;

    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        private orderService: OrderManagementService,
    ) {
        super();
    }

    accept(): void {
        this.orderService.confirmOrder(this.orderId).subscribe((response) => {
            if (response.success) {
                this.toastrService.success('Order confirmed');
                this.orderService.loadOrderDetails(this.orderId, this.orgType);
            } else {
                this.toastrService.error('error while accepting order');
            }
        });
    }

    reject(): void {
        this.rejectMode = true;
    }

    submitReason(): void {
        const reasonForm = this.rejectReasonForm.value;
        let reasons = [];

        reasons = this.addReason(reasons, 'not_serviceable', reasonForm.not_serviceable);
        reasons = this.addReason(reasons, 'out_of_stock', reasonForm.out_of_stock);
        reasons = this.addReason(reasons, 'other', reasonForm.other);

        const reason = { notes: reasons.join(', ') };

        this.orderService.rejectOrder(this.orderId, reason).subscribe((response) => {
            if (response.success) {
                this.toastrService.success('Order has been rejected');
            } else {
                this.toastrService.error('Error while rejecting order');
            }
        });
    }

    private addReason(arr: string[], key: string, value: boolean): string[] {
        if (value) {
            arr.push(this.translateService.instant(key));
        }

        return arr;
    }
}
