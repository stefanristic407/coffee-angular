import { WSResponse, WSRequest } from './../models/message';
import { environment } from '../environments/environment';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { WSOrganizationType, WSChatMessageType } from '../models/message';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService implements OnDestroy {
    private ORGANIZATION_TYPE = WSOrganizationType.ROASTER; // Change on each portal
    private ORGANIZATION_ID: number | null = parseInt(this.cookieService.get('roaster_id'), 10) || null;
    public WSSubject: WebSocketSubject<any> | null = null;
    private WSSubscriptionToken: Subscription | null = null;

    public chatSent = new Subject<WSRequest<unknown>>();
    public chatReceive = new Subject<WSResponse<unknown>>();
    public ChatSentSubscription: Subscription | null = null;

    constructor(public cookieService: CookieService) {
        this.WSSubject = webSocket(
            `${environment.wsEndpoint}/${this.ORGANIZATION_TYPE}/${this.ORGANIZATION_ID}/messaging`,
        );
        this.WSSubscriptionToken = this.WSSubject.subscribe(this.handleSusbscription);
        this.ChatSentSubscription = this.chatSent.subscribe((payload) => {
            this.WSSubject.next(payload);
        });
    }

    handleSusbscription = (WSMessage: WSResponse<unknown>) => {
        const arr = Object.keys(WSChatMessageType);
        if (arr.includes(WSMessage.type)) {
            // Created Handlers for your message types
            this.chatReceive.next(WSMessage);
        }
    };

    ngOnDestroy() {
        if (this.WSSubscriptionToken && this.WSSubscriptionToken.unsubscribe) {
            this.WSSubscriptionToken.unsubscribe();
        }
        if (this.ChatSentSubscription && this.ChatSentSubscription.unsubscribe) {
            this.ChatSentSubscription.unsubscribe();
        }
    }
}
