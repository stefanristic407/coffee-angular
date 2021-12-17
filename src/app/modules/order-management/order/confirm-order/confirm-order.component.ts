import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyableComponent } from '@base-components';
import { OrganizationType } from '@enums';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent extends DestroyableComponent {
    readonly availability$ = this.orderService.bulkDetails$.pipe(takeUntil(this.unsubscribeAll$));

    rejectMode = false;

    rejectReasonForm: FormGroup = this.fb.group({ notes: [null, Validators.required] });
    isSubmitted = false;

    @Input() orderId = 0;
    @Input() orgType: OrganizationType;

    constructor(
        private fb: FormBuilder,
        private orderService: OrderManagementService,
        private toastrService: ToastrService,
        private translator: TranslateService,
    ) {
        super();
    }

    accept(): void {
        this.orderService.confirmOrder(this.orderId).subscribe((response) => {
            if (response.success) {
                this.toastrService.success('Order confirmed');
                this.orderService.loadOrderDetails(this.orderId, this.orgType);
            } else {
                this.toastrService.error('Error while accepting order');
            }
        });
    }

    reject(): void {
        this.rejectMode = true;
    }

    submitReason(): void {
        if (!this.rejectReasonForm.valid) {
            this.toastrService.error(this.translator.instant('please_select_the_reason_for_rejecting_order'));
            return;
        }
        const reason = {
            notes: (this.rejectReasonForm.value.notes || []).map((ele) => this.translator.instant(ele)).join(', '),
        };
        this.isSubmitted = true;
        this.orderService.rejectOrder(this.orderId, reason).subscribe((response) => {
            if (response.success) {
                this.orderService.loadOrderDetails(this.orderId, this.orgType);
                this.toastrService.success('Order has been rejected');
            } else {
                this.toastrService.error('Error while rejecting order');
            }
            this.isSubmitted = false;
        });
    }
}
