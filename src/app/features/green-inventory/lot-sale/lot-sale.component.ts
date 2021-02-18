import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-lot-sale',
    templateUrl: './lot-sale.component.html',
    styleUrls: ['./lot-sale.component.css'],
})
export class LotSaleComponent implements OnInit {
    // tslint:disable: variable-name
    appLanguage?: any;
    lotSaleActive: any = 0;
    roaster_id: any = '';
    orderDetails: any;
    orderID: any = '';
    saleInformation: any = {};
    showDropdown = false;
    order_status = 'IN_STOCK';
    status_label = '';
    saleDetailsPresent = false;
    readOnlyMode = false;
    constructor(
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        private toasterService: ToastrService,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId;
        });
    }
    ngOnInit(): void {
        this.language();
        this.saleInformation['name'] = '';
        this.saleInformation['price'] = '';
        this.saleInformation['price_unit'] = 'per kg';
        this.saleInformation['quantity'] = '';
        this.saleInformation['quantity_type'] = 'per kg';
        this.saleInformation['minimum_purchase_quantity'] = '';
        this.saleInformation['vat_rate'] = '';
        this.getProcuredOrderDetails();
        this.getSaleOrderDetails();
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.lotSaleActive++;
    }
    getSaleOrderDetails() {
        this.roasterService.getMarkForSaleDetails(this.roaster_id, this.orderID).subscribe(
            (response) => {
                console.log(response);
                if (response['success'] && response['result']) {
                    this.saleInformation = response['result'];
                    this.saleDetailsPresent = true;
                    this.readOnlyMode = this.saleInformation && this.saleInformation.status === 'SOLD' ? true : false;
                    this.order_status = response['result']['status'];
                    this.status_label = this.formatStatus(response['result']['status']);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    formatStatus(stringVal) {
        let formatVal = '';
        if (stringVal) {
            formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
            formatVal = formatVal.replace('_', ' ');
        }
        return formatVal.replace('-', '');
    }
    getProcuredOrderDetails() {
        this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
            (response) => {
                console.log(response);
                if (response['success'] && response['result']) {
                    this.orderDetails = response['result'];
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    updateMarkForSale() {
        const data = this.saleInformation;
        data['order_id'] = undefined;
        data['initial_quantity'] = undefined;
        data['quantity_count'] = undefined;
        data['roaster_id'] = undefined;
        data['status'] = undefined;
        this.roasterService.updateMarkForSale(this.roaster_id, this.orderID, data).subscribe(
            (response) => {
                if (response && response['success']) {
                    this.toasterService.success('Details updated successfully');
                    this.router.navigate(['/features/green-coffee-inventory']);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    updateStatus() {
        const status = { status: this.order_status };
        this.roasterService.updateMarkForSaleStatus(this.roaster_id, this.orderID, status).subscribe(
            (response) => {
                if (response && response['success']) {
                    this.toasterService.success('Status updated successfully');
                    this.showDropdown = false;
                    this.status_label = this.formatStatus(this.order_status);
                }
            },
            (err) => {
                this.toasterService.error('Error while updating status');
                console.log(err);
            },
        );
    }
}
