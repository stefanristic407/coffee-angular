import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, DashboardService } from '@services';
import { GeneralService } from '@services';
import { UserService } from '@services';
import { DestroyableComponent } from '@base-components';
import { UserStatus } from '@enums';

@Component({
    selector: 'app-gate',
    templateUrl: './gate.component.html',
    styleUrls: ['./gate.component.scss'],
})
export class GateComponent extends DestroyableComponent implements OnInit {
    userTermsAccepted: boolean;
    orgTermsAccepted: boolean;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dashboardSrv: DashboardService,
        private generalSrv: GeneralService,
        private userSrv: UserService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.checkToken();
    }

    private checkToken() {
        this.route.queryParamMap.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            if (params.has('orgId')) {
                const orgId = +params.get('orgId');
                if (params.has('loginType') && params.get('loginType') === 'sim') {
                    this.authService.isSimulated = true;
                }
                if (!this.authService.isAuthenticated) {
                    this.authService.goToLogin();
                }

                const cookies = this.cookieService.getAll();
                let keys = Object.keys(cookies);
                keys = keys.filter((k) => !(k === 'version' || k === 'Authorization' || k === 'Sim-Authorization'));

                keys.forEach((key) => {
                    this.cookieService.delete(key);
                });

                this.authService.setOrgId(orgId);
                this.getData();
            } else {
                this.authService.goToLogin();
            }
        });
    }

    private getData() {
        const promises = [];
        promises.push(
            new Promise((resolve, reject) => {
                this.getProfile(resolve, reject);
            }),
        );
        promises.push(
            new Promise((resolve, reject) => {
                this.getUserDetail(resolve, reject);
            }),
        );
        Promise.all(promises)
            .then(() => {
                this.checkTermsAccepted();
            })
            .catch(() => {
                this.authService.goToLogin();
            });
    }

    private getProfile(resolve, reject) {
        this.generalSrv.getProfile().subscribe(
            (res: any) => {
                if (res.success) {
                    this.orgTermsAccepted = res.result.terms_accepted || !('terms_accepted' in res.result);
                    if (res.result.status === UserStatus.ACTIVE || res.result.status === UserStatus.PENDING) {
                        resolve();
                    } else if (res.result.status === UserStatus.INACTIVE) {
                        this.toastrService.error('Your Account has been disabled , Contact your Admin');
                        setTimeout(() => reject(), 4000);
                    }
                } else {
                    reject();
                }
            },
            (err) => {
                reject();
            },
        );
    }

    private getUserDetail(resolve, reject) {
        this.userSrv.getUserDetail().subscribe(
            (res: any) => {
                if (res.success) {
                    this.userTermsAccepted = res.result.terms_accepted;
                    resolve();
                } else {
                    reject();
                }
            },
            (err) => {
                reject();
            },
        );
    }

    private checkTermsAccepted() {
        if (this.orgTermsAccepted && this.userTermsAccepted) {
            this.getStats();
        } else {
            this.router.navigate(['/auth/privacy-policy'], {
                queryParams: {
                    type: encodeURIComponent(this.orgTermsAccepted ? 'user' : 'org'),
                },
            });
        }
    }

    private getStats() {
        this.dashboardSrv.getStats().subscribe(
            (res: any) => {
                if (res.success) {
                    this.toastrService.success('Logged in Successfully');
                    const isAddedMembers = !!localStorage.getItem('isAddedMembers') || res.result.added_team_members;
                    const isAddedDetails = !!localStorage.getItem('isAddedDetails') || res.result.added_details;
                    if (isAddedMembers && isAddedDetails) {
                        this.router.navigate([this.route.snapshot.queryParams.redirect_to || '/dashboard']);
                    } else {
                        if (res.result.added_team_members) {
                            localStorage.setItem('isAddedMembers', 'true');
                        }
                        if (res.result.added_details) {
                            localStorage.setItem('isAddedDetails', 'true');
                        }
                        this.router.navigate(['/welcome']);
                    }
                } else {
                    this.router.navigate(['/welcome']);
                }
            },
            (err) => {
                this.router.navigate(['/welcome']);
            },
        );
    }
}
