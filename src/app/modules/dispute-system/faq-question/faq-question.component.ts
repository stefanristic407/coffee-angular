import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserserviceService } from '@services';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-faq-question',
    templateUrl: './faq-question.component.html',
    styleUrls: ['./faq-question.component.scss'],
})
export class FaqQuestionComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    orderID: any;
    buttonValue: any;
    questionDetails: any = [];
    roasterID: any;
    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public router: Router,
        public userService: UserserviceService,
        public cookieService: CookieService,
    ) {}

    ngOnInit(): void {
        this.roasterID = this.cookieService.get('roaster_id');
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId ? params.orderId : '';
        });
        if (this.route.snapshot.queryParams.buttonValue) {
            this.buttonValue = decodeURIComponent(this.route.snapshot.queryParams.buttonValue);
        }
        this.supplyBreadCrumb();
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
        };
        const obj2: MenuItem = {
            label: 'Order Management',
        };
        const obj3: MenuItem = {
            label: 'Purchased order of estate',
            routerLink: '/orders/es',
        };
        const obj4: MenuItem = {
            label: 'Order ' + this.orderID,
            routerLink: [`/orders/ro/${this.orderID}`],
        };
        const obj5: MenuItem = {
            label: 'Order Support',
            routerLink: [`/dispute-system/order-support${this.orderID}`],
        };
        const obj6: MenuItem = {
            label: this.buttonValue,
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
        this.breadCrumbItem.push(obj4);
        this.breadCrumbItem.push(obj5);
        this.breadCrumbItem.push(obj6);
        this.getFAQList();
    }
    navigateAssignTicket() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                supportValue: this.buttonValue,
            },
        };
        this.router.navigate(['/dispute-system/raise-ticket', this.orderID], navigationExtras);
    }
    getFAQList() {
        this.userService.getDisputeFAQList(this.roasterID).subscribe(
            (res: any) => {
                if (res.success && res.result) {
                    this.questionDetails = res.result.filter((item) => item.status === 'enabled');
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
}
