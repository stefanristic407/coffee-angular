import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-order-support',
    templateUrl: './order-support.component.html',
    styleUrls: ['./order-support.component.scss'],
})
export class OrderSupportComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    orderID: any;
    searchForm: FormGroup;
    termSearch: any;
    buttonArray = [];
    orderType: any;
    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId ? params.orderId : '';
        });
        this.supplyBreadCrumb();
        this.searchForm = this.fb.group({
            searchField: new FormControl({ value: '' }, Validators.compose([Validators.required])),
        });
        this.searchForm.setValue({ searchField: '' });
        this.searchForm.controls.searchField.valueChanges.subscribe((value) => {
            this.termSearch = value;
        });
        this.loadButtons();
    }
    loadButtons() {
        this.buttonArray = [
            { label: 'Buying Coffee', logo: 'assets/images/coffee-bean.png', field: 'buyingCoffee' },
            { label: 'Requesting Samples', logo: 'assets/images/request.png', field: 'requestSample' },
            { label: 'Payment', logo: 'assets/images/payment.png', field: 'payment' },
            { label: 'Coffee Bulks', logo: 'assets/images/coffee-plant.png', field: 'coffeeBulks' },
            { label: 'Shipping', logo: 'assets/images/shipping.png', field: 'shipping' },
            { label: 'Others', logo: 'assets/images/others.png', field: 'others' },
        ];
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
        };
        const obj2: MenuItem = {
            label: 'Order Management',
            routerLink: 'ordermanagement/estate-orders',
        };
        const obj3: MenuItem = {
            label: 'Estate Orders',
            routerLink: 'ordermanagement/estate-orders',
        };
        const obj4: MenuItem = {
            label: 'Order ' + this.orderID,
            routerLink: '/ordermanagement/order-booked',
        };
        const obj5: MenuItem = {
            label: 'Order Support',
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
        this.breadCrumbItem.push(obj4);
        this.breadCrumbItem.push(obj5);
    }
    selectCard(cardType) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                orderType: this.orderType ? this.orderType : undefined,
                buttonValue: encodeURIComponent(cardType),
            },
        };

        this.router.navigate(['/dispute-system/order-support-faq', this.orderID], navigationExtras);
    }
}
