import { Component, OnInit, ViewChild } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { EstateComponent } from '../estate/estate.component';

@Component({
    selector: 'app-select-an-order',
    templateUrl: './select-an-order.component.html',
    styleUrls: ['./select-an-order.component.css'],
})
export class SelectAnOrderComponent implements OnInit {
    roasterId: any;
    estateOrderData: any = [];
    orderType: string = '';
    @ViewChild(EstateComponent, { static: false }) estateTable;
    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public route: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        this.roasterId = this.cookieService.get('roaster_id');
        this.orderType = this.route.snapshot.queryParams['orderType']
            ? decodeURIComponent(this.route.snapshot.queryParams['orderType'])
            : '';
        if (this.orderType && this.orderType == 'MR') {
            this.getMROrders();
        } else {
            this.estateSelectAnOrderTableData();
        }
    }
    //select order table data
    estateSelectAnOrderTableData() {
        this.roasterService.getEstateOrders(this.roasterId).subscribe((data) => {
            if (data['success'] == true) {
                if (data['result'] == null || data['result'].length == 0) {
                    this.toastrService.error('Table Data is empty');
                } else {
                    this.estateOrderData = data['result'];
                }
            } else {
                this.toastrService.error('Error while getting the agreement list!');
            }
        });
    }
    getMROrders() {
        this.roasterService.getMrOrders(this.roasterId).subscribe((data) => {
            if (data['success'] == true) {
                if (data['result'] == null || data['result'].length == 0) {
                    this.toastrService.error('Table Data is empty');
                } else {
                    this.estateOrderData = data['result'];
                }
            } else {
                this.toastrService.error('Error while getting the agreement list!');
            }
        });
    }
}
