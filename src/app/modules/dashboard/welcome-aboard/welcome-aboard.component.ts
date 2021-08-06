import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-welcome-aboard',
    templateUrl: './welcome-aboard.component.html',
    styleUrls: ['./welcome-aboard.component.scss'],
})
export class WelcomeAboardComponent implements OnInit {
    welcomeBoardStatus = 0;
    cards: any[] = [
        {
            routerLink: '/sourcing',
            img: 'assets/images/welcome_source_green_coffee.png',
            title: 'source_green_coffee',
            description: 'welcome_source_green_coffee_description',
        },
        {
            routerLink: '/e-commerce',
            img: 'assets/images/welcome_ecommer.png',
            title: 'ecommerce',
            description: 'welcome_ecommerce_description',
        },
        {
            routerLink: '/people/customer-management',
            img: 'assets/images/welcome_onboard_customers.png',
            title: 'onboard_customers',
            description: 'welcome_onboard_customers_description',
        },
    ];

    constructor() {}

    ngOnInit(): void {
        const isAddedMembers = !!localStorage.getItem('isAddedMembers');
        const isAddedDetails = !!localStorage.getItem('isAddedDetails');
        if (isAddedMembers && !isAddedDetails) {
            this.welcomeBoardStatus = 1;
        }
    }

    skip(value: 'isAddedMembers' | 'isAddedDetails') {
        localStorage.setItem(value, 'true');
    }
}
