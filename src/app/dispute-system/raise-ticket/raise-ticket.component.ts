import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-raise-ticket',
    templateUrl: './raise-ticket.component.html',
    styleUrls: ['./raise-ticket.component.scss'],
})
export class RaiseTicketComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    orderID: any;
    searchForm: FormGroup;
    termSearch: any;
    helpTextArray = [];
    reasonTextArray = [];
    ticketForm: FormGroup;
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
        this.ticketForm = this.fb.group({
            orderID: ['', Validators.compose([Validators.required])],
            dispute_type: ['', Validators.compose([Validators.required])],
            dispute_reason: [''],
            description: ['', Validators.compose([Validators.required])],
            solution: [''],
            images: [],
        });
        this.helpTextArray = [
            { label: 'Payment', value: 'Payment' },
            { label: 'Order', value: 'Order' },
            { label: 'Test', value: 'Test' },
        ];
        this.reasonTextArray = [
            {
                label: 'Why do I have to pay before the coffee is shipped ?',
                value: 'Why do I have to pay before the coffee is shipped ?',
            },
            { label: 'Order', value: 'Order' },
            { label: 'Test', value: 'Test' },
        ];
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
}
