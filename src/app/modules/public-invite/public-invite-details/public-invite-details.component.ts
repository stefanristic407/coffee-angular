import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-public-invite-details',
    templateUrl: './public-invite-details.component.html',
    styleUrls: ['./public-invite-details.component.scss'],
})
export class PublicInviteDetailsComponent implements OnInit {
    data: any;
    userDetails: any;
    requestId: any;
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private dialogSrv: DialogService,
        private translator: TranslateService,
    ) {
        this.requestId = this.route.snapshot.params.id;
    }

    ngOnInit(): void {
        this.getMrPublicOnboardDetails();
    }

    getMrPublicOnboardDetails() {
        this.userService
            .getMrPublicOnboardDetails(this.authService.getOrgId(), this.requestId)
            .subscribe((res: any) => {
                if (res.success) {
                    this.userDetails = res.result;
                }
            });
    }

    onApprove() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Are you sure you want to accept the request?',
                    desp: 'Once the roaster is accepted, they will be added as a partner',
                    noButton: this.translator.instant('cancel'),
                    yesButton: this.translator.instant('accept'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.userService
                        .approveMrPublicOnboard(this.authService.getOrgId(), this.requestId)
                        .subscribe((res: any) => {
                            if (res.success) {
                                this.getMrPublicOnboardDetails();
                                this.toastr.success(
                                    'The roaster has been approved. A confirmation email has been sent to the roaster',
                                );
                            }
                        });
                }
            });
    }

    onReject() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Are you sure you want to reject the roaster?',
                    desp: 'Once the roaster is rejected, they cannot be added back to the platform',
                    noButton: this.translator.instant('cancel'),
                    yesButton: this.translator.instant('reject'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.userService
                        .rejectMrPublicOnboard(this.authService.getOrgId(), this.requestId)
                        .subscribe((res: any) => {
                            if (res.success) {
                                this.getMrPublicOnboardDetails();
                                this.toastr.error(
                                    'The roaster has been rejected. A confirmation email has been sent to the roaster',
                                );
                            }
                        });
                }
            });
    }
}
