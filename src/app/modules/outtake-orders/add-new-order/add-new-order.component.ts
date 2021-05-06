import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-add-new-order',
    templateUrl: './add-new-order.component.html',
    styleUrls: ['./add-new-order.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddNewOrderComponent implements OnInit {
    roasterId: any;
    breadItems = [
        { label: 'Home', routerLink: '/dashboard' },
        { label: 'Order Management', routerLink: '/outtake-orders' },
        { label: 'Outtake Order', routerLink: '/outtake-orders' },
        { label: 'Add a new order' },
    ];
    date3: any;
    constructor(private roasterService: RoasterserviceService, private cookieService: CookieService) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {}

    getOrderDetails() {
        // this.roasterService.getViewOrderDetails(this.roasterId,);
    }
}
