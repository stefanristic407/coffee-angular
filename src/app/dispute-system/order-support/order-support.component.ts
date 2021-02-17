import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    constructor(public globals: GlobalsService, private fb: FormBuilder, private route: ActivatedRoute) {}
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
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/features/welcome-aboard',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: 'Order Management',
            routerLink: 'ordermanagement/estate-orders',
            disabled: false,
        };
        const obj3: MenuItem = {
            label: 'Estate Orders',
            routerLink: 'ordermanagement/estate-orders',
            disabled: false,
        };
        const obj4: MenuItem = {
            label: 'Order ' + this.orderID,
            routerLink: '/ordermanagement/order-booked',
            disabled: false,
        };
        const obj5: MenuItem = {
            label: 'Order Support',
            disabled: true,
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
        this.breadCrumbItem.push(obj4);
        this.breadCrumbItem.push(obj5);
    }
}
