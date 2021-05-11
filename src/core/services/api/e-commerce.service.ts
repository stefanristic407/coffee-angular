import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, UserProfile } from '@models';

@Injectable({
    providedIn: 'root',
})
export class ECommerceService extends ApiService {
    constructor(protected cookieService: CookieService, protected http: HttpClient) {
        super(cookieService, http);
    }

    // ------------ USER ------------

    // View user profile
    getUserProfile(): Observable<ApiResponse<UserProfile>> {
        return this.postWithOrg(this.orgPostUrl, `users/profile`, 'GET');
    }
    getSelectProductDetails(type: any, postData?) {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(this.orgPostUrl, `${suffix}products?${this.serializeParams(postData)}`, 'GET');
    }
    getProductDetails(productId: any, type: any): Observable<any> {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(this.orgPostUrl, `${suffix}products/${productId}`, 'GET');
    }
    getVatSettings(): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `vat-settings`, 'GET');
    }
    getRoastedBatches(params: any = {}): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches?${this.serializeParams(params)}`, 'GET');
    }
    getCoffeeBatchDetails(batchId: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches/${batchId}`, 'GET').pipe(
            map((res) => (res.result ? res.result : {})),
        );
    }
    addProductDetails(body: any, type: any): Observable<any> {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(this.orgPostUrl, `${suffix}products`, 'POST', body);
    }
    deleteProductDetails(productId: any, type: any): Observable<any> {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(this.orgPostUrl, `${suffix}products/${productId}`, 'DELETE');
    }
    updateProductDetails(productId: any, body: any, type: any): Observable<any> {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(this.orgPostUrl, `${suffix}products/${productId}`, 'PUT', body);
    }
    addProductWeightVariants(productId: any, body: any, type: any): Observable<any> {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(this.orgPostUrl, `${suffix}products/${productId}/weight-variants`, 'POST', body);
    }
    updateProductWeightVariants(productId: any, body: any, weightVariantId: any, type: any): Observable<any> {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(
            this.orgPostUrl,
            `${suffix}products/${productId}/weight-variants/${weightVariantId}`,
            'PUT',
            body,
        );
    }
    deleteProductWeightVariants(productId: any, weightVariantId: any, type: any): Observable<any> {
        const suffix = type === 'b2b' ? '' : `${type}-`;
        return this.postWithOrg(
            this.orgPostUrl,
            `${suffix}products/${productId}/weight-variants/${weightVariantId}`,
            'DELETE',
        );
    }
    uploadProductImage(file: any): Observable<any> {
        const data = new FormData();
        data.append('api_call', `/ro/${this.getOrgId()}/file-manager/files`);
        data.append('token', this.cookieService.get('Auth'));
        data.append('file', file);
        data.append('file_module', 'Product');
        data.append('name', file.name);
        return this.http.post(this.fileUploadUrl, data).pipe(map((res) => res));
    }
    deleteProductImage(fileId: any): Observable<any> {
        return this.postWithOrg(this.orgDeleteUrl, `file-manager/files/${fileId}`, 'DELETE');
    }
}
