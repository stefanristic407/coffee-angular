import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionChannel } from '@enums';
import { ApiResponse, Transaction } from '@models';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class TransactionService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // Return the list of transaction details
    getTransaction(transactionId: number): Observable<ApiResponse<Transaction>> {
        return this.postWithOrg(this.orgPostUrl, `transactions/${transactionId}`);
    }

    // Return the list of transaction details
    exportTransaction(transactionId: number): Observable<ApiResponse<Transaction>> {
        return this.postWithOrg(this.orgPostUrl, `transactions/export/${transactionId}`);
    }

    createReferenceNumber(channel: TransactionChannel, orderId: number, refNo: string): Observable<ApiResponse<any>> {
        let endpoint = '';
        let postData: any = {};
        switch (channel) {
            case TransactionChannel.B2B: {
                endpoint = 'hrc-orders';
                postData = { roaster_reference_number: refNo };
                break;
            }
            case TransactionChannel.B2C: {
                endpoint = 'co-orders';
                postData = { roaster_reference_number: refNo };
                break;
            }
            case TransactionChannel.MICRO_ROASTER: {
                endpoint = 'mr-orders';
                postData = { order_reference: refNo };
                break;
            }
            case TransactionChannel.OUTTAKE_ROASTED: {
                endpoint = 'outtake-orders';
                postData = { roaster_ref_no: refNo };
                break;
            }
            case TransactionChannel.OUTTAKE_GREEN: {
                endpoint = 'outtake-orders';
                postData = { roaster_ref_no: refNo };
                break;
            }
        }
        return this.postWithOrg(this.orgPostUrl, `${endpoint}/${orderId}`, 'PUT', postData);
    }
}
