import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService, ChatHandlerService } from '@services';
import { MDashboardService } from '../m-dashboard.service';

@Component({
    selector: 'app-dashboard-notify',
    templateUrl: './dashboard-notify.component.html',
    styleUrls: ['./dashboard-notify.component.scss'],
})
export class DashboardNotifyComponent implements OnInit, OnDestroy {
    disputes: any;
    disputesSub: Subscription;
    isNewMessage = false;
    isNewDispute = false;
    newMessageCount = 0;
    newDisputeCount = 0;
    messages: any[] = [
        {
            content: 'See what your contacts have to say!',
        },
    ];

    constructor(
        public globals: GlobalsService,
        private mDashboardSrv: MDashboardService,
        public chat: ChatHandlerService,
    ) {}

    ngOnInit(): void {
        this.disputesSub = this.mDashboardSrv.disputes$.subscribe((res: any) => {
            console.log('dispute observable: ', res);
            if (res) {
                this.disputes = res;
                this.isNewDispute = true;
            }
        });
    }

    ngOnDestroy() {
        this.disputesSub.unsubscribe();
    }

    openMessagePanel() {
        this.chat.showChatPanel();
    }
}
