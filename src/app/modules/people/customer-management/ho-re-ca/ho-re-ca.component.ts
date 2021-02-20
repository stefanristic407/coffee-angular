import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalsService } from 'src/services/globals.service';
import { environment } from 'src/environments/environment';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-ho-re-ca',
    templateUrl: './ho-re-ca.component.html',
    styleUrls: ['./ho-re-ca.component.css'],
})
export class HoReCaComponent implements OnInit {
    public mainData: any[] = [];
    estateId: any;
    roasterId: any;
    odd: boolean = false;
    appLanguage?: any;
    horecaActive: any = 0;
    itemId: any;

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
        //Auth checking
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        this.MicroRoastersHoreca();
        this.language();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.horecaActive++;
    }
    // Function Name : CheckAll
    // Description: This function helps to check all roles of the role list.
    checkAll(ev: any) {
        if (this.odd!) {
            this.mainData.forEach((x) => (x.state = ev.target.checked));
        }
    }

    // Function Name : IsAllchecked
    // Description: This function helps to check single role.
    isAllChecked() {
        if (this.odd!) {
            // return this.mainData.every(_ => _.state);
        }
    }

    shareDetails(size: any) {
        if (size.status == 'PENDING') {
            this.customerService.emailId = size.email;
            // this.customerService.headerValue="HoReCa";
            this.customerService.pendingHorecaDetails();
            this.router.navigate(['/people/pending-details']);
        } else {
            this.itemId = size.id;
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    itemId: encodeURIComponent(this.itemId),
                },
            };
            this.router.navigate(['/people/horeca-details'], navigationExtras);
        }
    }

    MicroRoastersHoreca() {
        this.roasterService.getMicroRoastersHoreca(this.roasterId).subscribe((data) => {
            if (data['success'] == true) {
                if (data['result'] == null || data['result'].length == 0) {
                    this.odd = true;
                    this.toastrService.error('Table Data is empty');
                } else {
                    this.odd = false;
                    this.mainData = data['result'];
                }
                this.horecaActive++;
            } else {
                this.odd = true;
                this.toastrService.error('Error while getting the table list!');
            }
            // this.horecaActive++;
        });
    }
}
