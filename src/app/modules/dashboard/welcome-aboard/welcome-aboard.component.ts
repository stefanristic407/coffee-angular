import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, GlobalsService } from '@services';
import { UserserviceService } from '@services';
import { RoasterserviceService } from '@services';
@Component({
    selector: 'app-welcome-aboard',
    templateUrl: './welcome-aboard.component.html',
    styleUrls: ['./welcome-aboard.component.scss'],
})
export class WelcomeAboardComponent implements OnInit {
    appLanguage?: any;
    welcomeActive: any = 0;
    roasterId: number;
    welcomeBoardStatus = 0;
    constructor(
        private router: Router,
        private cookieService: CookieService,
        public globals: GlobalsService,
        private userSrv: UserserviceService,
        private toastrService: ToastrService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.roasterId = this.authService.getOrgId();

        this.appLanguage = this.globals.languageJson;
        this.getStats();
    }

    getStats() {
        this.userSrv.getStats(this.roasterId).subscribe((res: any) => {
            console.log('get stats: ', res);
            if (res && res.success) {
                if (!res.result.added_details && res.result.added_team_members) {
                    this.welcomeBoardStatus = 1;
                }
            } else {
                this.toastrService.error('Error while getting stats');
            }
        });
    }

    skip(value: string) {
        localStorage.setItem(value, 'true');
    }
}
