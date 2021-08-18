import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
