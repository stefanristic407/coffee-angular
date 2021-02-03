import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { WSOrganizationType, WSCommunicationType } from './../../../models/message';
import { environment } from './../../../environments/environment.prod';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService implements OnDestroy {
    private ORGANIZATION_TYPE = WSOrganizationType.ROASTER; // Change on each portal
    private ORGANIZATION_ID: number | null = parseInt(this.cookieService.get('roaster_id'), 10) || null;
    private WSSubject: WebSocketSubject<any> | null = null;
    private WSSubscriptionToken: Subscription | null = null;

    public sentMessages = new Subject();
    private sentMessagesSubscription: Subscription | null = null;
    public chatHandler = new Subject();
    constructor(public cookieService: CookieService) {
        this.WSSubject = webSocket(
            `${environment.wsEndpoint}/${this.ORGANIZATION_TYPE}/${this.ORGANIZATION_ID}/messaging`,
        );
        this.WSSubscriptionToken = this.WSSubject.subscribe(this.handleSusbscription);
        this.sentMessagesSubscription = this.sentMessages.subscribe((payload) => {
            this.WSSubject.next(payload);
        });
    }

    handleSusbscription = (WSMessage: any) => {
        const arr = Object.keys(WSCommunicationType);
        if (arr.includes(WSMessage.types)) {
            // Created Handlers for your message types
            this.chatHandler.next(WSMessage);
        }
    };

    ngOnDestroy() {
        if (this.WSSubscriptionToken && this.WSSubscriptionToken.unsubscribe) {
            this.WSSubscriptionToken.unsubscribe();
        }
        if (this.sentMessagesSubscription && this.sentMessagesSubscription.unsubscribe) {
            this.sentMessagesSubscription.unsubscribe();
        }
    }
}
