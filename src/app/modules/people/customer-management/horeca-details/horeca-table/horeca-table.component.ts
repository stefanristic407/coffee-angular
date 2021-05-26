import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService, RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerServiceService } from '../../customer-service.service';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-horeca-table',
    templateUrl: './horeca-table.component.html',
    styleUrls: ['./horeca-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HorecaTableComponent implements OnInit {
    public mainData: any[] = [];
    folderId: any;
    estateId: any;
    roasterId: any;
    itemId: any;
    estatetermOrigin: string;
    @Output() changeCustomerType = new EventEmitter();
    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public modalService: BsModalService,
        public globals: GlobalsService,
        public customerService: CustomerServiceService,
    ) {
        this.estateId = this.cookieService.get('estate_id');
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.estatetermOrigin = '';
        this.getHorecaTableData();
    }

    shareDetails(size: any) {
        if (size.id > 0) {
            this.itemId = size.id;
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    itemId: encodeURIComponent(this.itemId),
                },
            };
            this.roasterService.getHorecaTableDetails(this.roasterId, this.itemId).subscribe((res: any) => {
                this.customerService.company_image_url = res.result.company_image_url;
                this.customerService.company_name = res.result.company_name;
                this.customerService.owner_name = res.result.owner_name;
                this.customerService.admin_name = res.result.admin_name;
                this.customerService.horecaId = res.result.id;
                this.customerService.discount_percentage = res.result.discount_percentage;
                this.customerService.status = res.result.status;
                this.customerService.company_image_url = res.result.company_image_url;
                this.changeCustomerType.emit('hrc');
                this.router.navigate(['/people/horeca-details'], navigationExtras);
            });
        }
    }

    getHorecaTableData() {
        this.roasterService
            .getHorecaTable(this.roasterId, this.customerService.horecaId)
            .subscribe((tableData: any) => {
                if (tableData.success) {
                    this.mainData = tableData.result || [];
                } else {
                    this.toastrService.error('Error while getting the agreement list!');
                }
            });
    }

    simulatedLogin(orgId) {
        this.customerService.customerSimulatedLogin(OrganizationType.HORECA, orgId);
    }
}
