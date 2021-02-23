import { WSResponse, WSRequest, WSOrganizationType, WSChatMessageType } from '@models';
import { environment } from '../environments/environment';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { ChatUtil } from './chat/chat-util.service';
import { delay, distinct, retryWhen, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SocketService implements OnDestroy {
    private ORGANIZATION_TYPE = WSOrganizationType.ROASTER; // Change on each portal
    private ORGANIZATION_ID: number | null = parseInt(this.cookieService.get('roaster_id'), 10) || null;
    private WSSubject: WebSocketSubject<any> | null = null;
    private WSSubscriptionToken: Subscription | null = null;

    public chatSent = new Subject<WSRequest<unknown>>();
    public chatReceive = new Subject<WSResponse<unknown>>();
    public orderChatSent = new Subject<WSRequest<unknown>>();
    public orderChatReceive = new Subject<WSResponse<unknown>>();
    private chatSentSubscription: Subscription | null = null;
    private orderChatSentSubscription: Subscription | null = null;
    public authenticationState = new BehaviorSubject<'IP' | 'FAIL' | 'SUCCESS'>('IP');

    public activeState = false;

    constructor(private cookieService: CookieService, private chatUtil: ChatUtil) {
        this.initSocketService();
    }

    public initSocketService() {
        if (!this.activeState) {
            this.authenticationState.next('IP');
            this.destorySocket(); // Cleanup
            this.WSSubject = webSocket<WSResponse<unknown>>({
                url: `${environment.wsEndpoint}/${this.ORGANIZATION_TYPE}/${this.ORGANIZATION_ID}/messaging`,
                openObserver: {
                    next: () => {
                        console.log('SOCKET OPENED');
                    },
                },
                closeObserver: {
                    next: () => {
                        console.log('SOCKET CLOSED');
                    },
                },
                closingObserver: {
                    next: () => {
                        console.log('SOCKET closingObserver');
                    },
                },
                binaryType: 'arraybuffer',
            });

            this.WSSubscriptionToken = this.WSSubject.subscribe((WSMessage: WSResponse<unknown>) => {
                if (WSMessage.type === WSChatMessageType.auth) {
                    this.handleAuthResponse(WSMessage as WSResponse<null>);
                }
                const arr = Object.values(WSChatMessageType);
                if (arr.includes(WSMessage.type)) {
                    // Created Handlers for your message type
                    this.chatReceive.next(WSMessage);
                    this.orderChatReceive.next(WSMessage);
                }
                // console.log('WEBSOCKET::Receiving ...', WSMessage);
            });
            this.chatSentSubscription = this.chatSent.subscribe((payload) => {
                this.WSSubject.next(payload);
            });
            this.orderChatSentSubscription = this.orderChatSent.subscribe((payload) => {
                // console.log('WEBSOCKET::Sending ...', payload);
                this.WSSubject.next(payload);
            });
            this.activeState = true;
        }
    }

    private handleAuthResponse(WSmsg: WSResponse<null>) {
        this.authenticationState.next(WSmsg.code === 200 || WSmsg.code === 409 ? 'SUCCESS' : 'FAIL');
        if (WSmsg.code === 400) {
            console.log('Websocket:Auth: Invalid Input Data Format ');
            this.authenticationState.next('FAIL');
        } else if (WSmsg.code === 401) {
            console.log('Websocket:Auth: Authentication Error');
            this.authenticationState.next('FAIL');
        } else if (WSmsg.code === 409) {
            console.log('Websocket:Auth: Already Authenticated Error');
            this.authenticationState.next('SUCCESS');
        } else if (WSmsg.code === 422) {
            console.log('Websocket:Auth: Validation Error');
            this.authenticationState.next('FAIL');
        } else if (WSmsg.code === 200) {
            this.authenticationState.next('SUCCESS');
            console.log('Websocket:Auth: Success');
        }
    }

    public destorySocket() {
        // NOTE Call this function on logout
        console.log('Error: Destory called');
        if (this.WSSubject) {
            this.WSSubject.complete();
            this.WSSubject = null;
        }
        this.clearSubscriptions();
        this.activeState = false;
    }

    private clearSubscriptions() {
        if (this.WSSubscriptionToken && this.WSSubscriptionToken.unsubscribe) {
            this.WSSubscriptionToken.unsubscribe();
        }
        if (this.chatSentSubscription && this.chatSentSubscription.unsubscribe) {
            this.chatSentSubscription.unsubscribe();
        }
        if (this.orderChatSentSubscription && this.orderChatSentSubscription.unsubscribe) {
            this.orderChatSentSubscription.unsubscribe();
        }
    }

    authenticate() {
        if (this.authenticationState.value !== 'FAIL') {
            let userToken = this.cookieService.get('Auth')?.replace(/\r/g, '')?.split(/\n/)[0];
            if (!userToken) {
                console.error('User token parese error');
                userToken = '';
            }
            const payload = {
                timestamp: this.chatUtil.getTimeStamp(),
                type: WSChatMessageType.auth,
                data: {
                    user_token: userToken,
                },
            };
            this.WSSubject.next(payload);
        }
        return this.authenticationState.pipe(distinct());
    }

    ngOnDestroy() {
        this.destorySocket();
    }
}
