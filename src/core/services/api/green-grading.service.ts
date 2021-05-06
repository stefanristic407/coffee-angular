import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class GreenGradingService extends ApiService {
    constructor(protected http: HttpClient, protected cookieService: CookieService) {
        super(cookieService, http);
    }

    getCuppingInviteList(options = null): Observable<any> {
        const roasterId = this.cookieService.get('roaster_id');
        const params = this.serializeParams(options);
        return this.post(this.orgPostUrl, `ro/${roasterId}/cupping-invite-list?${params}`, 'GET');
    }

    getPhysicalDefectsList(roasterId: any, cuppingReportId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/cupping-process/${cuppingReportId}/physical-defects`, 'GET');
    }

    addPhysicalDefects(roasterId: any, cuppingReportId: any, body: any) {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/physical-defects`,
            'POST',
            body,
        );
    }

    getEvaluatorsList(roasterId: any, cuppingReportId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/cupping-process/${cuppingReportId}/evaluators`, 'GET');
    }

    listCuppingRequest(roasterId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/external-cupping-invite-list`, 'GET');
    }

    getSingleCuppingDetails(roasterId: any, cuppingReportId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/cupping-process/${cuppingReportId}`, 'GET');
    }

    updateStatus(roasterId: any, cuppingReportId: any, body: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/cupping-process/${cuppingReportId}/status`, 'PUT', body);
    }

    downloadReport(roasterId: any, cuppingReportId: any, evaluatorIds: any = null) {
        let params = new HttpParams();
        if (evaluatorIds) {
            params = params.append('evaluator_ids_in', evaluatorIds);
        }
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/download?${params}`,
            'GET',
        );
    }

    getCuppingScore(roasterId: any, cuppingReportId: any, evaluatorIds: any = null) {
        let params = new HttpParams();
        if (evaluatorIds) {
            params = params.append('evaluator_ids', evaluatorIds);
        }
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/cupping-score${params}`,
            'GET',
        );
    }

    addCuppingScore(roasterId: any, cuppingReportId: any, body: any): Observable<any> {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/cupping-score`,
            'POST',
            body,
        );
    }

    addEvaluators(cuppingReportId: any, body: any) {
        const roasterId = Number(this.cookieService.get('roaster_id'));
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/evaluators`,
            'POST',
            body,
        );
    }

    deleteEvaluator(roasterId: any, cuppingReportId: any, evaluatorId: any) {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/evaluators/${evaluatorId}`,
            'DELETE',
        );
    }

    updateCuppingType(cuppingReportId: any, body: any): Observable<any> {
        const roasterId = Number(this.cookieService.get('roaster_id'));
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/cupping-type`,
            'PUT',
            body,
        );
    }

    addExternalCuppingReport(roasterId: any, body: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/cupping-process/external-samples`, 'POST', body);
    }

    updateExternalSample(roasterId: any, cuppingReportId: any, body: any) {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/external-samples`,
            'PUT',
            body,
        );
    }

    deleteExternalSample(roasterId: any, cuppingReportId: any) {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/${cuppingReportId}/external-samples`,
            'DELETE',
        );
    }

    listCuppingReports(roasterId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/my-cupping-reports?status_in=GENERATED,COMPLETED`, 'GET');
    }

    recupSample(roasterId: any, orderId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/orders/${orderId}/re-cup`, 'POST');
    }

    recupSampleRequest(roasterId: any, externalSampleId: any) {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/external-samples/${externalSampleId}/re-cup`,
            'POST',
        );
    }

    externalCuppingReportsList(roasterId: any) {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/external-cupping-reports?status_in=GENERATED,COMPLETED`,
            'GET',
        );
    }

    listServiceCuppingReports(roasterId: any, gcOrderId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/orders/${gcOrderId}/cupping-reports`, 'GET');
    }

    listSampleCuppingReports(roasterId: any, externalSampleId: any) {
        return this.post(
            this.orgPostUrl,
            `ro/${roasterId}/cupping-process/external-samples/${externalSampleId}/cupping-reports`,
            'GET',
        );
    }

    getProcessDetails(roasterId: any, harvestId: any) {
        return this.post(this.orgPostUrl, `ro/${roasterId}/harvests/${harvestId}/milling`, 'GET');
    }

    assignUser(orderId: string, userId: string) {
        const roasterId = this.cookieService.get('roaster_id');
        return this.post(this.orgPostUrl, `ro/${roasterId}/orders/${orderId}/users/${userId}/assign-evaluator`, 'PUT');
    }

    getAssignOrder(options: any) {
        const params = this.serializeParams(options);
        return this.post(this.orgPostUrl, `ro/${this.getOrgId()}/cupping-process/orders?${params}`, 'GET');
    }
}
