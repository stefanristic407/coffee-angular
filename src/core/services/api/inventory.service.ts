import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from '@enums';
import { ApiResponse, RoastedBatch, RoastingProfile } from '@models';
import { Observable } from 'rxjs';
import { VatSetting } from 'src/core/models/inventory/vat-setting.model';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class InventoryService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ RO - Roasting Profile ------------
    // Add roasting profile details for roaster
    createRoastingProfile(body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles`, 'POST', body);
    }
    // Return the roasting profile list of a roaster
    getRoastingProfiles(postData?: object): Observable<ApiResponse<RoastingProfile[]>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles?${this.serializeParams(postData)}`);
    }
    // View the roasting profile details by roasting profile ID
    getRoastingProfileDetail(id: number): Observable<ApiResponse<RoastingProfile>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`);
    }
    // Update the roasting profile details of a roaster
    updateRoastingProfileDetail(id: number, body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`, 'PUT', body);
    }
    // Delete the roasting profile details
    deleteRoastingProfile(id: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`, 'DELETE');
    }

    // ------------ RO - RC Batches ------------
    // Add roasted batch details for roaster
    createRoastedBatch(body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches`, 'POST', body);
    }
    // Return the list roasted batches of roaster
    getRoastedBatches(postData?: object): Observable<ApiResponse<RoastedBatch[]>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches?${this.serializeParams(postData)}`);
    }
    // View the roasted batch details by batch ID
    getRoastedBatch(id: number): Observable<ApiResponse<RoastedBatch>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches/${id}`);
    }
    // Update roasted batch details for roaster
    updateRoastedBatch(id: number, body: object): Observable<ApiResponse<any>> {
        return this.putWithOrg(this.orgPutUrl, `roasted-batches/${id}`, 'PUT', body);
    }
    // Delete the roasting profile details
    deleteRoastedBatch(id: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches/${id}`, 'DELETE');
    }

    // ------------ RO - Products ------------
    // Add Coffee product (B2B & B2C) details from RO
    createProduct(body: object): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `products`, 'POST', body);
    }
    // Get product details for RO
    getProduct(productId: number, type: ProductType): Observable<any> {
        const suffix = type === ProductType.b2b ? '' : `${type}-`;
        return this.postWithOrg(this.orgPostUrl, `${suffix}products/${productId}`);
    }
    // Update product details from RO
    updateProduct(productId: number, body: object, type: ProductType): Observable<any> {
        const suffix = type === ProductType.b2b ? '' : `${type}-`;
        return this.putWithOrg(this.orgPutUrl, `${suffix}products/${productId}`, 'PUT', body);
    }
    // Add product weight variants details from RO
    createWeightVariant(productId: number, body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `products/${productId}/weight-variants`, 'POST', body);
    }
    // Update product weight variants details from RO
    updateWeightVariant(productId: number, variantId: number, body: object): Observable<ApiResponse<any>> {
        return this.putWithOrg(this.orgPutUrl, `products/${productId}/weight-variants/${variantId}`, 'PUT', body);
    }
    // Delete product weight variants details from RO
    deleteWeightVariant(productId: number, variantId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `products/${productId}/weight-variants/${variantId}`, 'DELETE');
    }
    // Add product weight variants details from RO
    createGrindVariant(productId: number, weightId: number, body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(
            this.orgPostUrl,
            `products/${productId}/weight-variants/${weightId}/grind-variants`,
            'POST',
            body,
        );
    }
    // Update product weight variants details from RO
    updateGrindVariant(
        productId: number,
        weightId: number,
        grindId: number,
        body: object,
    ): Observable<ApiResponse<any>> {
        return this.putWithOrg(
            this.orgPutUrl,
            `products/${productId}/weight-variants/${weightId}/grind-variants/${grindId}`,
            'PUT',
            body,
        );
    }
    // Delete product grind variants details from RO
    deleteGrindVariant(productId: number, weightId: number, grindId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(
            this.orgPostUrl,
            `products/${productId}/weight-variants/${weightId}/grind-variants/${grindId}`,
            'DELETE',
        );
    }

    // ------------ RO - VAT Management ------------
    // List MR/B2B-Ecommerce products VAT details for roaster
    getVatSettings(): Observable<ApiResponse<VatSetting[]>> {
        return this.postWithOrg(this.orgPostUrl, `vat-settings`, 'GET');
    }
}
