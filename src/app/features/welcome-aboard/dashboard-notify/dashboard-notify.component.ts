import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from 'src/services/globals.service';
import { WelcomeService } from '../welcome.service';

@Component({
    selector: 'app-dashboard-notify',
    templateUrl: './dashboard-notify.component.html',
    styleUrls: ['./dashboard-notify.component.scss'],
})
export class DashboardNotifyComponent implements OnInit, OnDestroy {
    disputes: any;
    disputesSub: Subscription;
    messages: any[] = [
        {
            content: 'See what your contacts have to say!',
        },
    ];

    constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService) {}

    ngOnInit(): void {
        this.disputesSub = this.welcomeSrv.disputes$.subscribe((res: any) => {
            this.disputes = res;
        });
    }

    ngOnDestroy() {
        this.disputesSub.unsubscribe();
    }
}
