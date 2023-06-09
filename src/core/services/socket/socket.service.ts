/* tslint:disable no-string-literal */
import { OrganizationType, ChatMessageType, SocketMessageOrigin } from '@enums';
import { WSResponse, WSRequest } from '@models';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, Observable } from 'rxjs';
import { ChatUtilService } from '../chat/chat-util.service';
import { distinct, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class SocketService implements OnDestroy {
    private SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object
    private WSSubject: WebSocketSubject<any> | null = null;

    public directMessageSent = new Subject<WSRequest<unknown>>();
    public directMessageReceive = new Subject<WSResponse<unknown>>();

    public orderChatSent = new Subject<WSRequest<unknown>>();
    public orderChatEvents = new Subject<WSRequest<unknown>>();
    public orderChatReceive = new Subject<WSResponse<unknown>>();

    public authenticationState = new BehaviorSubject<'INIT' | 'IP' | 'FAIL' | 'SUCCESS'>('INIT');
    public socketState = new BehaviorSubject<'INIT' | 'IP' | 'CONNECTED' | 'FAILED' | 'CLOSED'>('INIT');

    constructor(private cookieService: CookieService, private chatUtil: ChatUtilService) {}

    public initSocketService() {
        console.log('SOCKET SERVICE INT CALLED');
        if (!(this.socketState.value === 'CONNECTED' || this.socketState.value === 'IP') && this.chatUtil.TOKEN) {
            console.log('SOCKET INT IP');
            this.destorySocket(true); // Cleanup
            this.authenticationState.next('IP');
            this.socketState.next('IP');
            let url = '';
            if (
                this.chatUtil.ORGANIZATION_TYPE === OrganizationType.SEWN_ADMIN ||
                this.chatUtil.ORGANIZATION_TYPE === OrganizationType.CONSUMER
            ) {
                url = `${environment.wsEndpoint}/${this.chatUtil.ORGANIZATION_TYPE}/messaging`;
            } else {
                url = `${environment.wsEndpoint}/${this.chatUtil.ORGANIZATION_TYPE}/${this.chatUtil.ORGANIZATION_ID}/messaging`;
            }
            this.WSSubject = webSocket<WSResponse<unknown>>({
                url,
                openObserver: {
                    next: () => {
                        this.socketState.next('CONNECTED');
                        console.log('SOCKET CONNECTED');
                    },
                },
                closeObserver: {
                    next: (err) => {
                        console.log('SOCKET CLOSED', err);
                        this.socketState.next('CLOSED');
                        this.authenticationState.next('INIT');
                    },
                },
                closingObserver: {
                    next: () => {
                        console.log('SOCKET closingObserver');
                    },
                },
                binaryType: 'arraybuffer',
            });

            this.SM.WSSubscriptionToken = this.WSSubject.pipe(
                catchError((err: any, caught: Observable<any>) => {
                    console.log('Error in WebScoket ', err);
                    return caught;
                }),
            ).subscribe((WSMessage: WSResponse<unknown>) => {
                if (WSMessage.type === ChatMessageType.auth && WSMessage.origin === SocketMessageOrigin.UTIL_AUTH) {
                    this.handleAuthResponse(WSMessage as WSResponse<null>);
                }
                const arr = Object.values(ChatMessageType);
                if (arr.includes(WSMessage.type)) {
                    // Created Handlers for your message type
                    if (WSMessage.origin === SocketMessageOrigin.DIRECT_MESSAGING) {
                        this.directMessageReceive.next(WSMessage);
                    } else if (WSMessage.origin === SocketMessageOrigin.ORDER_CHAT) {
                        this.orderChatReceive.next(WSMessage);
                    } else {
                        this.directMessageReceive.next(WSMessage);
                        this.orderChatReceive.next(WSMessage);
                    }
                }
                // console.log('WEBSOCKET::Receiving ...', WSMessage);
            });
            this.SM.chatSentSubscription = this.directMessageSent.subscribe((payload) => {
                payload.origin = SocketMessageOrigin.DIRECT_MESSAGING;
                this.WSSubject.next(payload);
            });
            this.SM.orderChatSentSubscription = this.orderChatSent.subscribe((payload) => {
                // console.log('WEBSOCKET::Sending ...', payload);
                payload.origin = SocketMessageOrigin.ORDER_CHAT;
                this.WSSubject.next(payload);
            });
            this.SM.orderChatEventSubscription = this.orderChatEvents.subscribe((payload) => {
                // console.log('WEBSOCKET::Sending ...', payload);
                payload.origin = SocketMessageOrigin.ORDER_CHAT;
                this.WSSubject.next(payload);
            });
        } else {
            console.log('Can not establish the socket connection');
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

    public destorySocket(cleanup = false) {
        console.log('Error: Destory called');
        if (this.WSSubject) {
            this.WSSubject.complete();
            this.WSSubject = null;
        }
        for (const name in this.SM) {
            if (this.SM[name] && this.SM[name].unsubscribe) {
                this.SM[name].unsubscribe();
            }
        }

        if (!cleanup) {
            this.authenticationState.next('INIT');
            this.socketState.next('INIT');
        }
    }

    authenticate() {
        if (this.authenticationState.value !== 'FAIL') {
            const payload = {
                timestamp: this.chatUtil.getTimeStamp(),
                type: ChatMessageType.auth,
                origin: SocketMessageOrigin.UTIL_AUTH,
                data: {
                    user_token: this.chatUtil.TOKEN,
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
