import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, GlobalsService, PrimeTableService, ResizeService, UserService } from '@services';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-public-invite',
    templateUrl: './public-invite.component.html',
    styleUrls: ['./public-invite.component.scss'],
})
export class PublicInviteComponent extends ResizeableComponent implements OnInit {
    readonly env = environment;
    searchTerm = '';
    statusItems;
    microRoasterLink: any;
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('micro_roaster_invite') },
    ];
    appLanguage?: any;
    originArray: any = [];
    roasterId: any;
    status = [
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Pending', value: 'pending' },
    ];
    forms: FormGroup;
    termStatus: any;
    customerStatus: any;
    termOrigin: any;
    display: number;
    currentDate = new Date();
    queryParams: any = {};

    get form() {
        return this.forms;
    }
    readonly searchForm = this.fb.group({
        dates: this.fb.control(''),
    });
    constructor(
        private fb: FormBuilder,
        public globals: GlobalsService,
        public primeTableService: PrimeTableService,
        protected resizeService: ResizeService,
        private authService: AuthService,
        private translator: TranslateService,
        public dialogSrv: DialogService,
        private userService: UserService,
        private toastrService: ToastrService,
    ) {
        super(resizeService);
        this.roasterId = this.authService.getOrgId();
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
        this.primeTableService.sortOrder = 'desc';
    }

    @ViewChild('markedTable', { static: true }) table: Table;
    public isMobile = false;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    initializeTable() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.primeTableService.windowWidth <= this.primeTableService.responsiveStartsAt) {
            this.primeTableService.isMobileView = true;
            this.primeTableService.allColumns = [
                {
                    field: 'id',
                    header: this.globals.languageJson?.order_id,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'name',
                    header: this.globals.languageJson?.company_name,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'user_first_name',
                    header: this.globals.languageJson?.customer_name,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'email',
                    header: this.globals.languageJson?.email,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'country',
                    header: this.globals.languageJson?.country_name,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'created_at',
                    header: this.globals.languageJson?.created_on,
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'status',
                    header: this.globals.languageJson?.status,
                    sortable: false,
                    width: 50,
                },
            ];
        } else {
            this.primeTableService.isMobileView = false;
            this.primeTableService.allColumns = [
                {
                    field: 'name',
                    header: this.globals.languageJson?.company_name,
                    sortable: false,
                    width: 15,
                },
                {
                    field: 'user_first_name',
                    header: this.globals.languageJson?.customer_name,
                    sortable: false,
                    width: 10,
                },
                {
                    field: 'email',
                    header: this.globals.languageJson?.email,
                    sortable: false,
                    width: 25,
                },
                {
                    field: 'created_at',
                    header: this.globals.languageJson?.created_on,
                    sortable: false,
                    width: 10,
                },
                {
                    field: 'country',
                    header: this.globals.languageJson?.country_name,
                    sortable: false,
                    width: 13,
                },
                {
                    field: 'status',
                    header: this.globals.languageJson?.status,
                    sortable: false,
                    width: 8,
                },
                {
                    field: 'actions',
                    header: this.globals.languageJson?.action,
                    sortable: false,
                    width: 8,
                },
            ];
        }
    }

    ngOnInit(): void {
        this.primeTableService.url = '';
        this.primeTableService.url = `/ro/${this.roasterId}/public-onboard/requests`;

        this.initializeTable();
        this.originArray = COUNTRY_LIST;
        this.primeTableService.form = this.form;

        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );

        this.appLanguage = this.globals.languageJson;
        this.searchForm.valueChanges.pipe(takeUntil(this.unsubscribeAll$)).subscribe((value) => {
            this.primeTableService.date = this.searchForm.get('dates').value
                ? this.searchForm.get('dates').value.getFullYear() +
                  '-' +
                  ('0' + (this.searchForm.get('dates').value.getMonth() + 1)).slice(-2) +
                  '-' +
                  ('0' + this.searchForm.get('dates').value.getDate()).slice(-2)
                : '';
            delete this.queryParams.dates;

            this.searchForm.patchValue({ page: 1 }, { emitEvent: false });
            setTimeout(() => {
                this.table.reset();
            }, 0);
        });
        this.userService.getOrgDetail().subscribe((result: any) => {
            if (result.success) {
                this.microRoasterLink = {
                    invite_url: `${this.env.ssoWeb}/setup/micro-roaster/${result.result.referral_code}`,
                };
            }
        });
    }
    setStatus() {
        this.primeTableService.status = this.customerStatus;
        this.table.reset();
    }
    setOrigin() {
        this.primeTableService.origin = this.termOrigin;
        this.table.reset();
    }
    search() {
        this.primeTableService.query = this.searchTerm;
        this.table.reset();
    }

    onView(item) {
        let link = [];
        link = [`/mr-public-invite/${item.id}`];
        return link;
    }

    onCopy(): void {
        this.toastrService.success('Successfully copied');
    }
}
