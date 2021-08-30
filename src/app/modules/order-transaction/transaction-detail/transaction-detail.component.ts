import { Component, OnInit } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService, DownloadService, ResizeService, TransactionService } from '@services';
import { ResizeableComponent } from '@base-components';
import { ApiResponse, Download, Transaction } from '@models';
import { SelectItem } from 'primeng/api';
import { getOrgName, noWhitespaceValidator, trackFileName } from '@utils';
import { OrganizationType } from '@enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss'],
    providers: [DecimalPipe, TitleCasePipe],
})
export class TransactionDetailComponent extends ResizeableComponent implements OnInit {
    transactionId: number;
    transaction: Transaction;
    orderDetails: SelectItem[];
    paymentDetails: SelectItem[];
    customerDetails: SelectItem[];
    addressDetails: SelectItem[];
    orderTableColumns: any[] = [];
    referenceForm: FormGroup;
    orderItems: any[];
    orderSummary: SelectItem[];
    isDownloading = false;

    constructor(
        private commonService: CommonService,
        private decimalPipe: DecimalPipe,
        private downloadService: DownloadService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private titleCasePipe: TitleCasePipe,
        private toastr: ToastrService,
        private transactionService: TransactionService,
        private translateService: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.initializeTable();
        this.makeData();
        this.referenceForm = this.fb.group({
            roaster_reference_number: ['', [Validators.required, noWhitespaceValidator()]],
        });
        this.route.paramMap.subscribe((params) => {
            if (params.has('transactionId')) {
                this.transactionId = +params.get('transactionId');
                this.getTransaction();
            }
        });
    }

    initializeTable() {
        this.orderTableColumns = [
            {
                field: 'item_system_id',
                header: 'sr_no',
                width: 6,
                hasSummary: true,
            },
            {
                field: 'item_name',
                header: 'item_name',
                width: 20,
            },
            {
                field: 'quantity',
                header: 'quantity',
                width: 8,
            },
            {
                field: 'unit_price_excl_vat',
                header: 'price_exclu_vat',
                width: 13,
                left: true,
            },
            {
                field: 'unit_price_incl_vat',
                header: 'price_incl_vat',
                width: 12,
                left: true,
            },
            {
                field: 'amount_excl_vat',
                header: 'amount_excl_vat',
                width: 14,
                left: true,
                hasSummary: true,
            },
            {
                field: 'vat_amount',
                header: 'vat',
                width: 9,
                left: true,
                hasSummary: true,
            },
            {
                field: 'vat_percent',
                header: 'VAT%',
                width: 9,
                left: true,
            },
            {
                field: 'total',
                header: 'net_price',
                width: 9,
                left: true,
                hasSummary: true,
            },
        ];
    }

    getTransaction() {
        this.transactionService.getTransaction(this.transactionId).subscribe((res: ApiResponse<Transaction>) => {
            if (res.success) {
                this.transaction = res.result;
                this.referenceForm.patchValue(this.transaction);
                this.makeData();
                this.orderItems = this.transaction.order_items;
                const sum = this.orderItems.reduce((x, accum) => {
                    return {
                        amount_excl_vat: +x.amount_excl_vat + accum.amount_excl_vat,
                        vat_amount: +x.vat_amount + accum.vat_amount,
                        total: +x.total + accum.total,
                    };
                });

                this.orderItems.push({
                    ...sum,
                    item_system_id: this.translateService.instant('total'),
                    summary: true,
                });
                this.orderItems = this.orderItems.map((item) => {
                    return {
                        ...item,
                        unit_price_excl_vat: this.decimalPipe.transform(item.unit_price_excl_vat, '1.2-2'),
                        unit_price_incl_vat: this.decimalPipe.transform(item.unit_price_incl_vat, '1.2-2'),
                        amount_excl_vat: this.decimalPipe.transform(item.amount_excl_vat, '1.2-2'),
                        vat_amount: this.decimalPipe.transform(item.vat_amount, '1.2-2'),
                        total: this.decimalPipe.transform(item.total, '1.2-2'),
                        vat_percent: item.vat_percent !== undefined ? item.vat_percent + '%' : null,
                    };
                });
            }
        });
    }

    makeData() {
        this.orderDetails = [
            { label: 'document_no', value: this.transaction?.document_number },
            { label: 'document_date', value: this.transaction?.document_date },
            { label: 'type_of_order', value: this.transaction?.order_type },
            { label: 'channel', value: getOrgName(OrganizationType[this.transaction?.channel]) },
        ];
        this.paymentDetails = [
            { label: 'payment_date', value: this.transaction?.payment_date },
            { label: 'payment_type', value: this.transaction?.payment_type },
            { label: 'payment_status', value: this.titleCasePipe.transform(this.transaction?.status) },
            { label: 'amount_excl_vat', value: this.transaction?.vat_amount },
        ];
        this.customerDetails = [
            { label: 'account_number', value: this.transaction?.account_number },
            { label: 'account_name', value: this.transaction?.account_name },
            { label: 'organization_number', value: this.transaction?.org_number },
            { label: 'contact_person', value: this.transaction?.contact_person },
            { label: 'address', value: this.transaction?.address_line1 },
            { label: 'zip_code', value: this.transaction?.zipode },
            { label: 'city', value: this.transaction?.city },
            { label: 'country', value: this.commonService.getCountryName(this.transaction?.city) },
            { label: 'phone_number', value: this.transaction?.phone_number },
        ];
        this.addressDetails = [
            { label: 'address', value: this.transaction?.delivery_address_line1 },
            { label: 'zipcode', value: this.transaction?.delivery_zipcode },
            { label: 'city', value: this.transaction?.delivery_city },
            { label: 'country', value: this.commonService.getCountryName(this.transaction?.delivery_country) },
            { label: 'phone_number', value: this.transaction?.phone_number },
        ];
    }

    export() {
        this.isDownloading = true;
        this.transactionService.exportTransaction(this.transactionId).subscribe((res) => {
            if (res.success && res.result.url) {
                const fileName = trackFileName(res.result.url);
                this.downloadService.download(res.result.url, fileName, 'application/pdf').subscribe(
                    (response: Download) => {
                        if (response.state === 'DONE') {
                            this.toastr.success('Downloaded successfully');
                            this.isDownloading = false;
                        }
                    },
                    (error) => {
                        this.toastr.error('Download failed');
                        this.isDownloading = false;
                    },
                );
            } else {
                this.isDownloading = false;
            }
        });
    }

    saveReference() {
        if (this.referenceForm.invalid) {
            this.referenceForm.markAllAsTouched();
            this.toastr.error('Please enter reference number.');
            return;
        }
        const refNo = this.referenceForm.value.roaster_reference_number.trim();
        this.transactionService
            .createReferenceNumber(this.transaction.channel, this.transaction.document_number, refNo)
            .subscribe((res) => {
                if (res.success) {
                    this.toastr.success('Order reference number has been updated.');
                }
            });
    }
}
