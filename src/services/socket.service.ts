import { WSResponse, WSRequest, WSOrganizationType, WSChatMessageType } from '@models';
import { environment } from '../environments/environment';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
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
    public activeState = false;

    constructor(public cookieService: CookieService) {
        this.initSocketService();
    }

    initSocketService() {
        if (!this.activeState) {
            this.destorySocket(); // Cleanup
            this.WSSubject = webSocket(
                `${environment.wsEndpoint}/${this.ORGANIZATION_TYPE}/${this.ORGANIZATION_ID}/messaging`,
            );
            this.WSSubscriptionToken = this.WSSubject.subscribe(this.handleSusbscription);
            this.ChatSentSubscription = this.chatSent.subscribe((payload) => {
                this.WSSubject.next(payload);
            });
            this.activeState = true;
        }
    }

    public destorySocket() {
        // NOTE Call this function on logout
        if (this.WSSubject) {
            this.WSSubject.complete();
        }
        this.clearSubscriptions();
        this.activeState = false;
    }

    private handleSusbscription = (WSMessage: WSResponse<unknown>) => {
        const arr = Object.values(WSChatMessageType);
        if (arr.includes(WSMessage.type)) {
            // Created Handlers for your message types
            this.chatReceive.next(WSMessage);
        }
    };

    private clearSubscriptions() {
        if (this.WSSubscriptionToken && this.WSSubscriptionToken.unsubscribe) {
            this.WSSubscriptionToken.unsubscribe();
        }
        if (this.ChatSentSubscription && this.ChatSentSubscription.unsubscribe) {
            this.ChatSentSubscription.unsubscribe();
        }
    }

    public ngOnDestroy() {
        this.WSSubject.complete();
        if (this.WSSubscriptionToken && this.WSSubscriptionToken.unsubscribe) {
            this.WSSubscriptionToken.unsubscribe();
        }
        if (this.ChatSentSubscription && this.ChatSentSubscription.unsubscribe) {
            this.ChatSentSubscription.unsubscribe();
        }
    }
}
