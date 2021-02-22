import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
@Component({
    selector: 'app-welcome-aboard',
    templateUrl: './welcome-aboard.component.html',
    styleUrls: ['./welcome-aboard.component.scss'],
})
export class WelcomeAboardComponent implements OnInit {
    appLanguage?: any;
    welcomeActive: any = 0;
    userName = '';
    roasterId: string;
    welcomeBoardStatus = 0;
    constructor(
        private router: Router,
        private cookieService: CookieService,
        public globals: GlobalsService,
        private userSrv: UserserviceService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.userName = this.cookieService.get('userName');
        this.roasterId = this.cookieService.get('roaster_id');

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
}
