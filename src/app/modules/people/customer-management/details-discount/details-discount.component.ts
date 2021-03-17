import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-details-discount',
    templateUrl: './details-discount.component.html',
    styleUrls: ['./details-discount.component.scss'],
})
export class DetailsDiscountComponent implements OnInit, AfterViewInit {
    roasterId: any;
    @Input() customerType: string;

    constructor(
        public customerService: CustomerServiceService,
        private userService: UserserviceService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {}

    editHorecaDiscount() {
        document.getElementById('edithoreca-discount').style.display = 'none';
        document.getElementById('savehoreca-discount').style.display = 'block';
    }

    saveHorecaDiscount() {
        const discountData = {
            discount_percentage: parseFloat(this.customerService.discount_percentage),
        };
        if (this.customerType === 'hrc') {
            this.userService
                .updateHorecaDiscount(this.roasterId, this.customerService.horecaId, discountData)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Discount data updated sucessfully');
                    } else {
                        this.toastrService.error('Error while updating discount data');
                    }
                });
            document.getElementById('edithoreca-discount').style.display = 'block';
            document.getElementById('savehoreca-discount').style.display = 'none';
        } else if (this.customerType === 'micro-roasters') {
            this.userService
                .updateMicroDiscount(this.roasterId, this.customerService.microId, discountData)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Discount data updated sucessfully');
                    } else {
                        this.toastrService.error('Error while updating discount data');
                    }
                });
            document.getElementById('edit-discount').style.display = 'block';
            document.getElementById('save-discount').style.display = 'none';
        }
    }

    ngAfterViewInit() {
        document.getElementById('savehoreca-discount').style.display = 'none';
    }
}
