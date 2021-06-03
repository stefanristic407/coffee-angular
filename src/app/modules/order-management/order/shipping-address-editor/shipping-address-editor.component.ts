import { OrderStatus } from '@enums';
import { Component, OnInit } from '@angular/core';
import { OrganizationType } from '@enums';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { takeUntil } from 'rxjs/operators';
import { MenuItem } from 'primeng/api/menuitem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderManagementService } from '../../order-management.service';
import { CommonService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-shipping-address-editor',
    templateUrl: './shipping-address-editor.component.html',
    styleUrls: ['./shipping-address-editor.component.scss'],
})
export class ShippingAddressEditorComponent extends DestroyableComponent implements OnInit {
    readonly countries = this.commonSrv.getCountryList();
    readonly editorForm: FormGroup = this.fb.group({
        country: this.fb.control('', [Validators.required]),
        state: this.fb.control('', [Validators.required]),
        address_line1: this.fb.control('', [Validators.required]),
        address_line2: this.fb.control(''),
        city: this.fb.control('', [Validators.required]),
        zipcode: this.fb.control(''),
    });

    orderId: number;
    orgType: OrganizationType;
    breadcrumbs: MenuItem[];
    status: string;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private toastrSrv: ToastrService,
        private orderSrv: OrderManagementService,
        private commonSrv: CommonService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe({
            next: (params) => {
                this.orderId = +params.id;
                this.orgType = params.orgType;

                this.orderSrv.loadOrderDetails(this.orderId, this.orgType, true);

                this.orderSrv.orderDetails$.pipe(takeUntil(this.unsubscribeAll$)).subscribe({
                    next: (details) => {
                        if (details && details.shipping_address) {
                            this.status = details.status;
                            this.editorForm.patchValue({
                                ...details.shipping_address,
                                country: details.shipping_address.country.toUpperCase(),
                            });
                        }
                    },
                });

                this.breadcrumbs = [
                    { label: 'Home', routerLink: '/' },
                    { label: 'Order Management', routerLink: `/orders/${this.orgType}` },
                    { label: `Order #${this.orderId}`, routerLink: `/orders/${this.orgType}/${this.orderId}` },
                    { label: 'Edit' },
                ];
            },
        });
    }

    save(): void {
        if (this.editorForm.invalid) {
            this.toastrSrv.error('Please fill in all required fields.');
            return;
        } else if (
            this.status == OrderStatus.Placed ||
            this.status == OrderStatus.Confirmed ||
            this.status == OrderStatus.Rejected
        ) {
            this.orderSrv.updateShippingAddress(this.orderId, this.editorForm.value).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.toastrSrv.success('Shipping address has been updated.');
                        this.orderSrv.loadOrderDetails(this.orderId, this.orgType);
                        this.router.navigate(['/orders', this.orgType, this.orderId]);
                    } else {
                        if (response.messages?.delivery_address[0] === 'cannot_change') {
                            this.toastrSrv.error('Shipping details cannot be updated as the order has been shipped.');
                        } else {
                            this.toastrSrv.error('Error while updating shipping address.');
                        }
                    }
                },
            });
        } else {
            this.toastrSrv.error('Order is already shipped and you can not edit the shipping address now.');
            return;
        }
    }
}
