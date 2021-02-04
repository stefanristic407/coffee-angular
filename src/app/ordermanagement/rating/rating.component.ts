import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { UserserviceService } from '@services';
import { OrderBookedService } from '../order-booked/order-booked.service';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
    roasterId: any;
    submitted = false;

    infoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private formSrv: FormService,
        public globals: GlobalsService,
        public userService: UserserviceService,
        public cookieService: CookieService,
        public bookedService: OrderBookedService,
        private toastrService: ToastrService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            overall_experience: [null, Validators.compose([Validators.required])],
            communication: [null, Validators.compose([Validators.required])],
            green_coffee: [null, Validators.compose([Validators.required])],
            review: ['', Validators.compose([Validators.required])],
        });
    }

    submitRating() {
        if (this.infoForm.valid) {
            this.submitted = true;
            this.userService
                .addReviewOrder(this.roasterId, this.bookedService.oId, this.infoForm.value)
                .subscribe((res: any) => {
                    this.submitted = false;
                    if (res.success) {
                        this.toastrService.success('Rate and Review of order submitted successfully');
                    } else if (!res.success) {
                        if (res.messages.order_id === 'not_found') {
                            this.toastrService.error('Order Id not found.');
                        } else if (res.messages.review.find((element) => element === 'already_exists')) {
                            this.toastrService.error('Review already exists.');
                        }
                    } else {
                        this.toastrService.error('Error while submitting details');
                    }
                });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }
}
