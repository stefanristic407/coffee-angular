import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AclService } from '@services';
import { DashboardService } from '@services';
import { GeneralService } from '@services';
import { UserService } from '@services';
import { DestroyableComponent } from '@base-components';
import { environment } from '@env/environment';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-gate',
    templateUrl: './gate.component.html',
    styleUrls: ['./gate.component.scss'],
})
export class GateComponent extends DestroyableComponent implements OnInit {
    userTermsAccepted: boolean;
    orgTermsAccepted: boolean;
    isAddedDetails: string;
    isAddedTeamMembers: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private aclSrv: AclService,
        private dashboardSrv: DashboardService,
        private generalSrv: GeneralService,
        private userSrv: UserService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.checkToken();
    }

    private checkToken() {
        this.route.queryParamMap.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params) => {
            if (params.has('orgId')) {
                const orgId = params.get('orgId');
                // Either from url, or from API cookie
                let token = '';
                if (params.has('token')) {
                    token = params.get('token');
                } else {
                    if (params.has('loginType') && params.get('loginType') === 'sim') {
                        const simToken = this.cookieService.get('Sim-Authorization');
                        if (simToken) {
                            token = JSON.parse(atob(simToken)).Authorization;
                        }
                    } else {
                        token = this.cookieService.get('Authorization');
                    }
                }
                if (!token) {
                    this.goToLogin();
                }

                this.cookieService.deleteAll();
                this.cookieService.set('roaster_id', orgId);
                this.cookieService.set('Auth', token);
                this.getData();
            } else {
                this.goToLogin();
            }
        });
    }

    private getData() {
        const promises = [];
        promises.push(
            new Promise((resolve, reject) => {
                this.getUserPermissions(resolve, reject);
            }),
        );
        promises.push(
            new Promise((resolve, reject) => {
                this.getProfile(resolve, reject);
            }),
        );
        promises.push(
            new Promise((resolve, reject) => {
                this.getUserProfile(resolve, reject);
            }),
        );
        Promise.all(promises)
            .then(() => {
                this.checkTermsAccepted();
            })
            .catch(() => {
                this.goToLogin();
            });
    }

    private getUserPermissions(resolve, reject) {
        this.aclSrv.getUserPermissions().subscribe(
            (res: any) => {
                if (res.success) {
                    const permissionList = res.result;
                    this.cookieService.set('permissionSlug', JSON.stringify(permissionList));
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

    private getProfile(resolve, reject) {
        this.generalSrv.getProfile().subscribe(
            (res: any) => {
                if (res.success) {
                    this.cookieService.set('name', res.result.name);
                    this.cookieService.set('roasterSlug', res.result.slug);
                    this.orgTermsAccepted = res.result.terms_accepted || !('terms_accepted' in res.result);
                    if (res.result.status === 'ACTIVE') {
                        resolve();
                    } else if (res.result.status === 'INACTIVE') {
                        this.toastrService.error('Your Account has been disabled , Contact your Admin');
                        reject();
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

    private getUserProfile(resolve, reject) {
        this.userSrv.getUserProfile().subscribe(
            (res: any) => {
                if (res.success) {
                    this.userTermsAccepted = res.result.terms_accepted;
                    this.cookieService.set('user_id', res.result.id);
                    this.cookieService.set('userName', res.result.firstname + ' ' + res.result.lastname);
                    this.cookieService.set('referral_code', res.result.referral_code);
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
                    this.isAddedDetails = localStorage.getItem('isAddedDetails')
                        ? localStorage.getItem('isAddedDetails')
                        : 'false';
                    this.isAddedTeamMembers = localStorage.getItem('isAddedTeamMembers')
                        ? localStorage.getItem('isAddedTeamMembers')
                        : 'false';
                    if (
                        (res.result.added_details && res.result.added_team_members) ||
                        (this.isAddedDetails === 'true' && this.isAddedTeamMembers === 'true')
                    ) {
                        if (localStorage.getItem('redirectUrl')) {
                            const url = localStorage.getItem('redirectUrl');
                            localStorage.removeItem('redirectUrl');
                            this.router.navigate([url]);
                        } else {
                            this.router.navigate(['/roaster-dashboard']);
                        }
                    } else {
                        this.router.navigate(['/welcome-aboard']);
                    }
                } else {
                    this.router.navigate(['/welcome-aboard']);
                }
            },
            (err) => {
                this.router.navigate(['/welcome-aboard']);
            },
        );
    }

    goToLogin() {
        window.open(`${environment.ssoWeb}/login?orgType=${OrganizationType.ROASTER}`, '_self');
    }
}
