import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
    selector: 'app-generated-keys',
    templateUrl: './generated-keys.component.html',
    styleUrls: ['./generated-keys.component.css'],
})
export class GeneratedKeysComponent implements OnInit {
    @Input() searchRequestId;
    @Input() filterData;
    @Input() dateRange;
    @Input() perPage;
    termStatus: any;
    showStatus: boolean = true;
    modalRef: BsModalRef;
    resumeTemplate: boolean = false;

    display: any;
    showDisplay: boolean = true;
    appLanguage?: any;
    roasterID: string = '';
    loader: boolean = false;

    mainData: any[] = [
        {
            customer: 'Third wave coffee roasters',
            customer_type: 'Micro-Roaster',
            date_requested: '24 Jan 2020',
            key_generated_on: '24 Jan 2020',
            key_status: 'Active',
        },
        {
            customer: 'Home brew coffee',
            customer_type: 'HoReCa',
            date_requested: '12 Jan 2020',
            key_generated_on: '12 Jan 2020',
            key_status: 'Active',
        },
        {
            customer: 'La Barista',
            customer_type: 'Micro-Roaster',
            date_requested: '13 Oct 2018',
            key_generated_on: '13 Oct 2018',
            key_status: 'Paused',
        },
        {
            customer: 'BRU coffee roastes',
            customer_type: 'HoReCa',
            date_requested: '02 Dec 2019',
            key_generated_on: '02 Dec 2019',
            key_status: 'Paused',
        },
        {
            customer: 'Blue Tokai roasters',
            customer_type: 'Micro-Roaster',
            date_requested: '02 Oct 2019',
            key_generated_on: '02 Oct 2019',
            key_status: 'Active',
        },
        {
            customer: 'La Barista',
            customer_type: 'HoReCa',
            date_requested: ' 19 Sep 2019',
            key_generated_on: '19 Sep 2019',
            key_status: 'Active',
        },
    ];
    constructor(
        public globals: GlobalsService,
        private toastrService: ToastrService,
        private modalService: BsModalService,
        private roasterserviceService: RoasterserviceService,
        public cookieService: CookieService,
    ) {
        this.termStatus = '';
        this.display = '10';
        this.roasterID = this.cookieService.get('roaster_id');
    }
    @ViewChild('deletetemplate') private deletetemplate: any;

    ngOnChanges(): void {
        console.log('filterData', this.filterData);
        console.log('this.date range--.', this.dateRange);
        console.log('per page===>>>', this.perPage);
    }

    ngOnInit(): void {
        console.log('searchRequestId----->>>', this.searchRequestId);
        console.log('filterData------', this.filterData);
        this.appLanguage = this.globals.languageJson;
        console.log('this.date range--.', this.dateRange);
        this.appLanguage = this.globals.languageJson;
        this.getGeneratedRoKeys();
    }

    getGeneratedRoKeys() {
        const data = { roaster_id: this.roasterID, page: 1, per_page: 25 };
        this.roasterserviceService.getGeneratedRoKeys(data).subscribe((res) => {
            console.log('res------->>>>>>', res);
            setTimeout(() => {
                this.loader = false;
            }, 1000);
        });
    }

    setStatus(term: any) {
        this.termStatus = term;
        console.log(this.termStatus);
    }
    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }

    setDisplay(displayData: any) {
        this.display = displayData;
    }
    toggleDisplay() {
        this.showDisplay = !this.showDisplay;
        if (this.showDisplay == false) {
            document.getElementById('display_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('display_id').style.border = '1px solid #d6d6d6';
        }
    }
    // Function Name : CheckAll
    // Description: This function helps to check all roles of the role list.
    checkAll(ev: any) {
        this.mainData.forEach((x) => (x.state = ev.target.checked));
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    // Function Name : IsAllchecked
    // Description: This function helps to check single role.
    isAllChecked() {
        return this.mainData.every((_) => _.state);
    }

    resumeKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: 2,
        };
        this.roasterserviceService.enableRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.toastrService.success('Key has been reactivated!');
        this.resumeTemplate = false;
    }

    sort(event) {
        console.log('sort-------', event);
    }

    pauseKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: 2,
        };
        this.roasterserviceService.disableRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.toastrService.success('Key access has been paused');
        this.resumeTemplate = true;
    }
    deleteKey() {
        this.openModal(this.deletetemplate);
    }

    onConfirm() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: 2,
        };
        this.roasterserviceService.deleteRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.toastrService.error('Key has been delete');
        this, this.modalRef.hide();
    }

    notifyCustomer() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: 2,
        };
        this.roasterserviceService.notifyRoCustomer(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.toastrService.success('Key has been reactivated!');
    }
}
