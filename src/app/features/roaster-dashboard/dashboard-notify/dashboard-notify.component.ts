import { ChatHandlerService } from '../../../../services/chat/chat-handler.service';
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
    isNewMessage = false;
    isNewDispute = false;
    newMessageCount = 0;
    newDisputeCount = 0;
    messages: any[] = [
        {
            content: 'See what your contacts have to say!',
        },
    ];

    constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService, public chat: ChatHandlerService) {}

    ngOnInit(): void {
        this.disputesSub = this.welcomeSrv.disputes$.subscribe((res: any) => {
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

    openMessages() {
        this.chat.showChatPanel();
    }
}
