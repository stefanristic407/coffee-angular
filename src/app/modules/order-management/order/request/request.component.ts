import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { AvailabilityRequestStatus } from '@enums';
import { AvailabilityRequest } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AvailabilityRequestService, CommonService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api/menuitem';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
})
export class RequestComponent extends DestroyableComponent implements OnInit {
    readonly RequestStatus = AvailabilityRequestStatus;
    readonly breadcrumbs: MenuItem[] = [
        { label: 'Home', routerLink: '/' },
        { label: 'Order management', routerLink: '/orders/mr' },
    ];

    readonly rejectReasonForm: FormGroup = this.fb.group({
        not_serviceable: this.fb.control(false),
        out_of_stock: this.fb.control(false),
        poor_quality: this.fb.control(false),
        other: this.fb.control(false),
    });

    isRejectMode = false;
    requestId: number;
    request: AvailabilityRequest;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        private requestSrv: AvailabilityRequestService,
        public commonService: CommonService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribeAll$)).subscribe({
            next: (params) => {
                this.requestId = +params.id;
                this.loadRequest();
            },
        });
    }

    notify(): void {
        this.requestSrv.updateStatus(this.requestId, 'approve', { reason: 'Approved' }).subscribe((response) => {
            if (response.success) {
                this.toastrService.success('Request has been approved');
                this.loadRequest();
            } else {
                this.toastrService.error('Error while approving order');
            }
        });
    }

    cancelRequest(): void {
        const reasonForm = this.rejectReasonForm.value;
        let reasons = [];

        reasons = this.addReason(reasons, 'not_serviceable', reasonForm.not_serviceable);
        reasons = this.addReason(reasons, 'out_of_stock', reasonForm.out_of_stock);
        reasons = this.addReason(reasons, 'poor_quality', reasonForm.poor_quality);
        reasons = this.addReason(reasons, 'other', reasonForm.other);

        const reason = { reason: reasons.join(', ') };

        this.requestSrv.updateStatus(this.requestId, 'reject', reason).subscribe((response) => {
            if (response.success) {
                this.toastrService.success('Request has been rejected');
                this.loadRequest();
            } else {
                this.toastrService.error('Error while rejecting order');
            }
        });
    }

    setRejectMode(val: boolean): void {
        this.isRejectMode = val;
    }

    private loadRequest(): void {
        this.requestSrv.getRequestDetails(this.requestId).subscribe({
            next: (response) => {
                if (response) {
                    this.request = response;
                }
            },
        });
    }

    private addReason(arr: string[], key: string, value: boolean): string[] {
        if (value) {
            arr.push(this.translateService.instant(key));
        }

        return arr;
    }
}
