import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { GlobalsService, RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerServiceService } from '../../customer-service.service';

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
    odd = false;
    itemId: any;
    estatetermOrigin: string;

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
        // Auth checking
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
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
                this.customerService.discount_percentage = res.result.discount_percentage;
                this.customerService.status = res.result.status;
                this.customerService.company_image_url = res.result.company_image_url;
                this.router.navigate(['/people/horeca-details'], navigationExtras);
            });
        }
    }

    getHorecaTableData() {
        this.roasterService
            .getHorecaTable(this.roasterId, this.customerService.horecaId)
            .subscribe((tableData: any) => {
                if (tableData.success) {
                    if (tableData.result == null || tableData.result.length === 0) {
                        this.odd = true;
                        this.toastrService.error('Table Data is empty');
                    } else {
                        this.odd = false;
                        this.mainData = tableData.result;
                    }
                } else {
                    this.odd = true;
                    this.toastrService.error('Error while getting the agreement list!');
                }
            });
    }
}
