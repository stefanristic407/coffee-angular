import { Component, OnInit } from '@angular/core';
import { GlobalsService, ResizeService, OrderTransactionPrimeTableService, AuthService } from '@services';
import { ResizeableComponent } from '@base-components';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '@models';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent extends ResizeableComponent implements OnInit {
    transactionId: number;
    transaction: Transaction;

    constructor(
        public globals: GlobalsService,
        public primeTableService: OrderTransactionPrimeTableService,
        protected resizeService: ResizeService,
        private route: ActivatedRoute,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('transactionId')) {
                this.transactionId = +params.get('transactionId');
                this.getTransaction();
            }
        });
    }

    getTransaction() {
        console.log('getTransaction');
    }

    export() {
        console.log('export');
    }
}
