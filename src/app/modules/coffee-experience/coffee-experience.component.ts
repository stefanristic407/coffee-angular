import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-coffee-experience',
    templateUrl: './coffee-experience.component.html',
    styleUrls: ['./coffee-experience.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CoffeeExperienceComponent implements OnInit {
    items = [
        { label: 'Home', routerLink: '/features/welcome-aboard' },
        { label: 'Farm link' },
        { label: 'The Coffee Experience' },
    ];
    searchTerm: any;
    customerType = 'estate';
    coffeeExperienceData: any;
    roasterId: string;

    constructor(
        public globals: GlobalsService,
        public cookieService: CookieService,
        private coffeeExperienceOrders: RoasterserviceService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
        this.getEstateOrders();
    }

    onTabChange(event) {
        if (event.index === 0) {
            this.customerType = 'estate';
            this.getEstateOrders();
        } else if (event.index === 1) {
            this.customerType = 'micro-roasters';
            this.getEstateOrders();
        } else if (event.index === 2) {
            this.customerType = 'hrc';
            this.getEstateOrders();
        }
    }

    getEstateOrders() {
        this.coffeeExperienceOrders
            .getCoffeeExperienceOrders(this.roasterId, this.customerType)
            .subscribe((res: any) => {
                console.log(res);
                if (res.success) {
                    this.coffeeExperienceData = res.result;
                } else {
                    this.toastrService.error('Error while getting orders');
                }
            });
    }
}
