import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { ProcuredCoffeeStatus } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, PrimeTableService, ResizeService, RoasterService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-marked-sale',
    templateUrl: './marked-sale.component.html',
    styleUrls: ['./marked-sale.component.scss'],
})
export class MarkedSaleComponent extends ResizeableComponent implements OnInit {
    termStatus: any;
    display: any;
    termOrigin: any;
    mainData: any[] = [];
    roasterID: number;
    originArray: any = [];
    statusItems = [
        { label: 'In stock', value: 'IN_STOCK' },
        { label: 'Hidden', value: 'HIDDEN' },
        { label: 'Sold', value: 'SOLD' },
    ];
    displayItems = [
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    @Input('form')
    set form(value: FormGroup) {
        this._form = value;
    }

    get form() {
        return this._form;
    }

    constructor(
        private authService: AuthService,
        private dialogService: DialogService,
        private roasterService: RoasterService,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public primeTableService: PrimeTableService,
    ) {
        super(resizeService);
        this.display = 10;
        this.roasterID = this.authService.getOrgId();
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
        this.primeTableService.origin = null;
        this.primeTableService.searchQuery = null;
    }

    // tslint:disable: variable-name
    public _form: FormGroup;

    @ViewChild('markedTable', { static: true }) table: Table;
    public isMobile = false;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    initializeTable() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.resizeService.isMobile()) {
            this.primeTableService.allColumns = [
                { field: 'status', header: 'status' },
                { field: 'product_name', header: 'product_name' },
                { field: 'estate_name', header: 'estate_name' },
                { field: 'origin', header: 'origin' },
                {
                    field: 'varieties',
                    header: 'variety',
                },
                {
                    field: 'quantity',
                    header: 'availability',
                },
                {
                    field: 'cup_score',
                    header: 'cup_score',
                },
            ];
        } else {
            this.primeTableService.allColumns = [
                {
                    field: 'product_name',
                    header: 'product_name',
                    width: 17,
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                    width: 14,
                },
                {
                    field: 'origin',
                    header: 'origin',
                    width: 12,
                },
                {
                    field: 'varieties',
                    header: 'variety',
                    width: 12,
                },
                {
                    field: 'quantity',
                    header: 'availability',
                    width: 11,
                },
                {
                    field: 'cup_score',
                    header: 'cup_score',
                    width: 11,
                },
                {
                    field: 'status',
                    header: 'status',
                    width: 11,
                },
                {
                    field: 'actions',
                    header: 'actions',
                    width: 12,
                },
            ];
        }
    }

    ngOnInit(): void {
        this.primeTableService.isMarkedForSale = false;
        this.primeTableService.url = '';
        this.primeTableService.url = `/ro/${this.roasterID}/marked-sale-coffees`;

        this.initializeTable();
        this.primeTableService.form = this.form;

        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );

        this.roasterService.getCoffeeSaleList(this.roasterID).subscribe((res) => {
            res.result.map((org) => {
                COUNTRY_LIST.find((item) => {
                    if (org.origin.toUpperCase() === item.isoCode) {
                        this.originArray.push(item);
                    }
                });
            });
            this.originArray = this.originArray.filter((v, i, a) => a.findIndex((t) => t.isoCode === v.isoCode) === i);
        });
    }
    setStatus() {
        this.primeTableService.status = this.termStatus;
        this.table.reset();
    }
    setOrigin() {
        this.primeTableService.origin = this.termOrigin;
        this.table.reset();
    }
    search(item) {
        console.log();
        this.primeTableService.searchQuery = item;
        this.table.reset();
    }
    setDisplay() {
        if (this.display) {
            this.primeTableService.rows = this.display;
        } else {
            this.primeTableService.rows = 10;
        }

        this.table.reset();
    }

    onView(item) {
        this.router.navigateByUrl('/green-coffee-management/green-coffee-for-sale-details/' + item.order_id);
    }

    onEdit(item) {
        if (item.status !== ProcuredCoffeeStatus.SOLD) {
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    orderId: encodeURIComponent(item.order_id),
                },
            };
            this.router.navigate(['/green-coffee-management/lot-sale'], navigationExtras);
        } else {
            this.toastrService.error('Cannot Edit! ,The item is already been sold');
        }
    }

    deleteProductFromList(deleteId) {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.deleteProcuredCoffee(deleteId).subscribe(
                        (response) => {
                            if (response && response.success) {
                                this.toastrService.success('Product deleted successfully');
                                this.primeTableService.url = `/ro/${this.roasterID}/marked-sale-coffees`;
                                const event = {
                                    sortOrder: this.primeTableService.sortOrder,
                                    first: this.primeTableService.currentPage,
                                };
                                this.primeTableService.getData(event);
                            }
                        },
                        (err) => {
                            this.toastrService.error('Error while deleting the ');
                            console.log(err);
                        },
                    );
                }
            });
    }

    getMenuItems(item) {
        return [
            { label: this.translator.instant('edit'), command: () => this.onEdit(item) },
            { label: this.translator.instant('delete'), command: () => this.deleteProductFromList(item.order_id) },
        ];
    }
}
